import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";
import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
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
import gql from "graphql-tag";

async function resolveLangCode(
    lang: string,
    query: string
): Promise<LangCode | "auto"> {
    if (lang === "auto") {
        const detectedInfo = await getTranslationInfo("auto", "en", query);

        if (detectedInfo?.detectedSource) {
            return detectedInfo.detectedSource;
        } else {
            throw new GraphQLError("Could not detect language.", {
                extensions: {
                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                },
            });
        }
    }
    if (!isValidCode(lang)) {
        throw new GraphQLError("Invalid language code", {
            extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
    }

    return lang as LangCode;
}

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
                throw new GraphQLError("Invalid language code", {
                    extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
                });
            }

            const translation = await getTranslationText(source, target, query);
            if (!translation) {
                throw new GraphQLError(
                    "An error occurred while retrieving the translation",
                    {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    }
                );
            }

            const info = await getTranslationInfo(source, target, query);

            return {
                detectedSource: info?.detectedSource,
                typo: info?.typo,
                pronunciation: {
                    query: info?.pronunciation?.query,
                    translation: info?.pronunciation?.translation,
                },
                definitions: info?.definitions || [],
                examples: info?.examples || [],
                similar: info?.similar || [],
                extraTranslations: info?.extraTranslations || [],
            };
        },
        async audio(_, { lang, query }) {
            const resolvedLang = await resolveLangCode(lang, query);

            try {
                const audioData = await getAudio(resolvedLang, query); // query as 'text'

                return {
                    lang: { code: resolvedLang }, // Return the resolved language code
                    text: query,
                    audio: audioData, // Return the audio data
                };
            } catch (error) {
                throw new GraphQLError(
                    "An error occurred while retrieving the audio",
                    {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    }
                );
            }
        },
        languages(_, { type }) {
            const lowerType = type?.toLowerCase() as
                | keyof typeof languageList
                | undefined;
            const langEntries = Object.entries(
                languageList[lowerType ?? "all"]
            );

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
                lang.code as LangCode
            );
            const audio = await getAudio(parsedLang, text);
            if (!audio) {
                throw new GraphQLError(
                    "An error occurred while retrieving the audio",
                    {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    }
                );
            }
            return audio;
        },
    },

    TargetEntry: {
        async audio({ lang, text }) {
            const parsedLang = replaceExceptedCode(
                LanguageType.TARGET,
                lang.code as LangCode
            );
            const audio = await getAudio(parsedLang, text);
            if (!audio) {
                throw new GraphQLError(
                    "An error occurred while retrieving the audio",
                    {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    }
                );
            }
            return audio;
        },
    },

    AudioEntry: {
        async audio({ lang, text }) {
            const parsedLang = replaceExceptedCode(
                LanguageType.TARGET,
                lang.code as LangCode
            );
            const audio = await getAudio(parsedLang, text);
            if (!audio) {
                throw new GraphQLError(
                    "An error occurred while retrieving the audio",
                    {
                        extensions: {
                            code: ApolloServerErrorCode.INTERNAL_SERVER_ERROR,
                        },
                    }
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

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Allow introspection in development
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
});

export const config = {
    api: {
        bodyParser: false,
    },
};

// Custom Next.js handler
const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    // Start Apollo server if it hasn’t started yet
    await server.start();

    // Use Next.js CORS middleware
    await NextCors(req, res, {
        methods: ["GET", "POST"],
        origin: "*",
    });

    // Convert the request to an Apollo HTTP request
    if (req.method === "POST" || req.method === "GET") {
        // Pass the request to Apollo server for handling
        await server
            .executeOperation({
                query: req.body.query, // GraphQL query
                variables: req.body.variables, // GraphQL variables if any
            })
            .then((response) => {
                res.status(200).json(response);
            })
            .catch((error) => {
                res.status(500).json({
                    error: "Internal server error" + error,
                });
            });
    } else {
        res.setHeader("Allow", ["GET", "POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
