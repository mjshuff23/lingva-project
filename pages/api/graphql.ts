import { ApolloServer, gql } from "@apollo/server";
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import NextCors from "nextjs-cors";
import {
    getTranslationInfo,
    getTranslationText,
    getAudio,
    replaceExceptedCode,
    isValidCode,
    LanguageType,
    languageList,
    LangCode,
    TranslationInfo,
    AudioEntry,
} from "lingva-scraper-update";
import { GraphQLError } from 'graphql';

export const typeDefs = gql`
    enum LangType {
        SOURCE
        TARGET
    }
    type Query {
        translation(
            source: String = "auto"
            target: String = "en"
            query: String!
        ): Translation!
        audio(lang: String!, query: String!): AudioEntry!
        languages(type: LangType): [Language]!
    }
    type Translation {
        source: SourceEntry!
        target: TargetEntry!
    }
    type SourceEntry {
        lang: Language!
        text: String!
        audio: [Int]!
        detected: Language
        typo: String
        pronunciation: String
        definitions: [DefinitionsGroup]
        examples: [String]
        similar: [String]
    }
    type TargetEntry {
        lang: Language!
        text: String!
        audio: [Int]!
        pronunciation: String
        extraTranslations: [ExtraTranslationsGroup]
    }
    type AudioEntry {
        lang: Language!
        text: String!
        audio: [Int]!
    }
    type Language {
        code: String!
        name: String!
    }
    type DefinitionsGroup {
        type: String!
        list: [DefinitionList]!
    }
    type DefinitionList {
        definition: String!
        example: String!
        field: String
        synonyms: [String]
    }
    type ExtraTranslationsGroup {
        type: String!
        list: [ExtraTranslationList]!
    }
    type ExtraTranslationList {
        word: String!
        article: String
        frequency: Int!
        meanings: [String]
    }
`;

type Resolvers = {
    Query: {
        translation: (
            _parent: unknown,
            args: { source: string; target: string; query: string }
        ) => Promise<TranslationInfo>;
        audio: (
            _parent: unknown,
            args: { lang: string; query: string }
        ) => Promise<AudioEntry>;
        languages: (
            _parent: unknown,
            args: { type: string }
        ) => Array<{ code: string; name: string }>;
    };
    SourceEntry: {
        audio: (parent: {
            lang: { code: string };
            text: string;
        }) => Promise<number[]>;
    };
    TargetEntry: {
        audio: (parent: {
            lang: { code: string };
            text: string;
        }) => Promise<number[]>;
    };
    AudioEntry: {
        audio: (parent: {
            lang: { code: string };
            text: string;
        }) => Promise<number[]>;
    };
    Language: {
        name: (parent: { code: string; name?: string }) => string;
    };
};

export const resolvers: Resolvers = {
    Query: {
        async translation(_, { source, target, query }) {
            if (
                !isValidCode(source, LanguageType.SOURCE) ||
                !isValidCode(target, LanguageType.TARGET)
            ) {
                throw new UserInputError("Invalid language code");
            }

            const translation = await getTranslationText(source, target, query);
            if (!translation) {
                throw new ApolloError(
                    "An error occurred while retrieving the translation"
                );
            }

            const info = await getTranslationInfo(source, target, query);

            // Ensure all required fields are included in the return object
            return {
                detectedSource: info?.detectedSource, // Assuming TranslationInfo has this field
                typo: info?.typo,
                pronunciation: {
                    query: info?.pronunciation?.query,
                    translation: info?.pronunciation?.translation,
                },
                definitions: info?.definitions || [], // Provide a fallback for missing data
                examples: info?.examples || [],
                similar: info?.similar || [],
                extraTranslations: info?.extraTranslations || [], // Ensure this is included
            };
        },

        async audio(_, { lang, query }) {
            // If lang is 'auto', first detect the actual language
            if (lang === "auto") {
                const detectedInfo = await getTranslationInfo("auto", "en", query);
                if (detectedInfo?.detectedSource) {
                    lang = detectedInfo.detectedSource;  // Use detected language
                } else {
                    throw new UserInputError("Could not detect language.");
                }
            }
        
            if (!isValidCode(lang)) {
                throw new UserInputError("Invalid language code");
            }
        
            // Fetch audio data
            const audio = await getAudio(lang, query);
            if (!audio) {
                throw new ApolloError("An error occurred while retrieving the audio");
            }
            return { lang: { code: lang }, text: query };
        },
        languages(_, { type }) {
            const lowerType = type?.toLowerCase() as
                | keyof typeof LanguageType
                | undefined;
            const langEntries = Object.entries(
                languageList[lowerType ?? "all"]
            );

            // Explicitly cast 'name' to string
            return langEntries.map(([code, name]) => ({
                code,
                name: name as string, // Cast name to string
            }));
        },
    },

    SourceEntry: {
        async audio({ lang, text }) {
            const parsedLang = replaceExceptedCode(
                LanguageType.TARGET,
                lang.code
            );
            const audio = await getAudio(parsedLang, text);
            if (!audio) {
                throw new ApolloError(
                    "An error occurred while retrieving the audio"
                );
            }
            return audio;
        },
    },

    TargetEntry: {
        async audio({ lang, text }) {
            const parsedLang = replaceExceptedCode(
                LanguageType.TARGET,
                lang.code
            );
            const audio = await getAudio(parsedLang, text);
            if (!audio) {
                throw new ApolloError(
                    "An error occurred while retrieving the audio"
                );
            }
            return audio;
        },
    },

    AudioEntry: {
        async audio({ lang, text }) {
            const parsedLang = replaceExceptedCode(
                LanguageType.TARGET,
                lang.code
            );
            const audio = await getAudio(parsedLang, text);
            if (!audio) {
                throw new ApolloError(
                    "An error occurred while retrieving the audio"
                );
            }
            return audio;
        },
    },

    Language: {
        name({ code, name }) {
            return name || languageList.all[code as LangCode];
        },
    },
};

// Apollo Server initialization
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,  // Still enable introspection
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });
  
export const config = {
    api: {
        bodyParser: false,
    },
};

const apolloHandler = new ApolloServer({ typeDefs, resolvers }).createHandler({
    path: "/api/graphql",
});

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await NextCors(req, res, {
        methods: ["GET", "POST"],
        origin: "*",
    });

    if (req.method !== "OPTIONS") return apolloHandler(req, res);
    res.end();
};

export default handler;
