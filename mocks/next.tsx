import { useRouter } from "next/router";

// Mock the router
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Provide the mock router values
const routerMock = {
  basePath: "",
  pathname: "/",
  route: "/",
  asPath: "/",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
};

(useRouter as jest.Mock).mockReturnValue(routerMock);

export { routerMock };