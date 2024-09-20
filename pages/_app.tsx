import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@theme";
import { Layout } from "@components";

const App = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme} resetCSS={true}>
      <Component {...pageProps} />
  </ChakraProvider>
);

export default App;