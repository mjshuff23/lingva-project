import { ColorModeScript } from "@chakra-ui/react"; // Use from "@chakra-ui/react" instead of "@chakra-ui/color-mode"
import Document, { Html, Head, Main, NextScript } from "next/document";
import theme from "@theme";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    {/* Color mode script ensures that initial color mode is set based on the theme */}
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}