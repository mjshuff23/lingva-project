const NoSSR = ({ children }: { children: React.ReactNode }) => (
  <>{typeof window === "undefined" ? null : children}</>
);

export default NoSSR;
