import { FC, PropsWithChildren } from "react";
import { Flex, VStack, Link, useColorModeValue } from "@chakra-ui/react";
import { Header, Footer } from ".";
import NoSSR from './NoSSR';

type Props = {
  [key: string]: any;
};

const Layout: FC<PropsWithChildren<Props>> = ({ children, ...props }) => (
  <>
      <Link
        href="#main"
        userSelect="none"
        position="absolute"
        top="-100px"
        left="0"
        _focus={{
          top: "0",
        }}
      >
        Skip to content
      </Link>

      <VStack minH="100%" spacing={7}>
        {/* Ensure consistent rendering for both server and client */}
        <Header bgColor={useColorModeValue("lingva.100", "lingva.900")} />

        {/* Change main layout to ensure it doesn't introduce mismatches */}
        <Flex as="main" id="main" flexGrow={1} w="full" {...props}>
          {children}
        </Flex>

        <Footer
          bgColor={useColorModeValue("lingva.100", "lingva.900")}
          color={useColorModeValue("lingva.900", "lingva.100")}
        />
      </VStack>
  </>
);

export default Layout;
