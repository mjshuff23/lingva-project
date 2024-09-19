const npmWarnings = [
  {
    reason: "deprecated",
    package: "inflight",
    version: "1.0.6",
    message: "This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful."
  },
  {
    reason: "deprecated",
    package: "rimraf",
    version: "3.0.2",
    message: "Rimraf versions prior to v4 are no longer supported."
  },
  {
    reason: "deprecated",
    package: "rollup-plugin-terser",
    version: "7.0.2",
    message: "This package has been deprecated and is no longer maintained. Please use @rollup/plugin-terser."
  },
  {
    reason: "deprecated",
    package: "glob",
    version: "7.2.3",
    message: "Glob versions prior to v9 are no longer supported."
  },
  {
    reason: "deprecated",
    package: "@humanwhocodes/config-array",
    version: "0.9.5",
    message: "Use @eslint/config-array instead."
  },
  {
    reason: "deprecated",
    package: "glob",
    version: "7.1.7",
    message: "Glob versions prior to v9 are no longer supported."
  },
  {
    reason: "deprecated",
    package: "@humanwhocodes/object-schema",
    version: "1.2.1",
    message: "Use @eslint/object-schema instead."
  },
  {
    reason: "deprecated",
    package: "sourcemap-codec",
    version: "1.4.8",
    message: "Please use @jridgewell/sourcemap-codec instead."
  },
  {
    reason: "deprecated",
    package: "uuid",
    version: "3.4.0",
    message: "Please upgrade to version 7 or higher. Older versions may use Math.random() in certain circumstances, which is known to be problematic. See https://v8.dev/blog/math-random for details."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-unicode-property-regex",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-unicode-property-regex instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-private-property-in-object",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-property-in-object instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-optional-chaining",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-optional-chaining instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-private-methods",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-methods instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-numeric-separator",
    version: "7.16.7",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-numeric-separator instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-object-rest-spread",
    version: "7.18.0",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-object-rest-spread instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-optional-catch-binding",
    version: "7.16.7",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-optional-catch-binding instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-logical-assignment-operators",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-logical-assignment-operators instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-nullish-coalescing-operator",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-nullish-coalescing-operator instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-dynamic-import",
    version: "7.16.7",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-dynamic-import instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-json-strings",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-json-strings instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-class-static-block",
    version: "7.18.0",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-static-block instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-export-namespace-from",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-export-namespace-from instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-async-generator-functions",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-async-generator-functions instead."
  },
  {
    reason: "deprecated",
    package: "@babel/plugin-proposal-class-properties",
    version: "7.17.12",
    message: "This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead."
  },
  {
    reason: "deprecated",
    package: "workbox-google-analytics",
    version: "6.5.3",
    message: "It is not compatible with newer versions of GA starting with v4, as long as you are using GAv3 it should be ok, but the package is not longer being maintained."
  },
  {
    reason: "deprecated",
    package: "w3c-hr-time",
    version: "1.0.2",
    message: "Use your platform's native performance.now() and performance.timeOrigin."
  },
  {
    reason: "deprecated",
    package: "abab",
    version: "2.0.6",
    message: "Use your platform's native atob() and btoa() methods instead."
  },
  {
    reason: "deprecated",
    package: "domexception",
    version: "4.0.0",
    message: "Use your platform's native DOMException instead."
  },
  {
    reason: "deprecated",
    package: "user-agents",
    version: "1.0.1048",
    message: "The v1.0.x releases no longer receive updates, please upgrade to v1.1.x to use recent user agent data."
  },
  {
    reason: "deprecated",
    package: "source-map-resolve",
    version: "0.6.0",
    message: "See https://github.com/lydell/source-map-resolve#deprecated."
  },
  {
    reason: "deprecated",
    package: "graphql-extensions",
    version: "0.15.0",
    message: "The `graphql-extensions` API has been removed from Apollo Server 3. Use the plugin API instead: https://www.apollographql.com/docs/apollo-server/integrations/plugins/."
  },
  {
    reason: "deprecated",
    package: "apollo-tracing",
    version: "0.15.0",
    message: "The `apollo-tracing` package is no longer part of Apollo Server 3. See https://www.apollographql.com/docs/apollo-server/migration/#tracing for details."
  },
  {
    reason: "deprecated",
    package: "apollo-server-plugin-base",
    version: "0.13.0",
    message: "The `apollo-server-plugin-base` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). This package's functionality is now found in the `@apollo/server` package. See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "apollo-server-errors",
    version: "2.5.0",
    message: "The `apollo-server-errors` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). This package's functionality is now found in the `@apollo/server` package. See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "apollo-datasource",
    version: "0.9.0",
    message: "The `apollo-datasource` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "apollo-server-caching",
    version: "0.7.0",
    message: "This package is part of the legacy caching implementation used by Apollo Server v2 and v3, and is no longer maintained. We recommend you switch to the newer Keyv-based implementation (which is compatible with all versions of Apollo Server). See https://www.apollographql.com/docs/apollo-server/v3/performance/cache-backends#legacy-caching-implementation for more details."
  },
  {
    reason: "deprecated",
    package: "boom",
    version: "7.3.0",
    message: "This module has moved and is now available at @hapi/boom. Please update your dependencies as this version is no longer maintained and may contain bugs and security issues."
  },
  {
    reason: "deprecated",
    package: "hoek",
    version: "6.1.3",
    message: "This module has moved and is now available at @hapi/hoek. Please update your dependencies as this version is no longer maintained and may contain bugs and security issues."
  },
  {
    reason: "deprecated",
    package: "subscriptions-transport-ws",
    version: "0.9.19",
    message: "The `subscriptions-transport-ws` package is no longer maintained. We recommend you use `graphql-ws` instead. For help migrating Apollo software to `graphql-ws`, see https://www.apollographql.com/docs/apollo-server/data/subscriptions/#switching-from-subscriptions-transport-ws. For general help using `graphql-ws`, see https://github.com/enisdenjo/graphql-ws/blob/master/README.md."
  },
  {
    reason: "deprecated",
    package: "apollo-cache-control",
    version: "0.14.0",
    message: "The functionality provided by the `apollo-cache-control` package is built in to `apollo-server-core` starting with Apollo Server 3. See https://www.apollographql.com/docs/apollo-server/migration/#cachecontrol for details."
  },
  {
    reason: "deprecated",
    package: "apollo-reporting-protobuf",
    version: "0.8.0",
    message: "The `apollo-reporting-protobuf` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). This package's functionality is now found in the `@apollo/usage-reporting-protobuf` package. See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "apollo-server-env",
    version: "3.1.0",
    message: "The `apollo-server-env` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). This package's functionality is now found in the `@apollo/utils.fetcher` package. See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "accept",
    version: "3.1.3",
    message: "This module has moved and is now available at @hapi/accept. Please update your dependencies as this version is no longer maintained and may contain bugs and security issues."
  },
  {
    reason: "deprecated",
    package: "apollo-server-types",
    version: "0.9.0",
    message: "The `apollo-server-types` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). This package's functionality is now found in the `@apollo/server` package. See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "graphql-tools",
    version: "4.0.8",
    message: "This package has been deprecated and now it only exports makeExecutableSchema. It will no longer receive updates. We recommend you migrate to scoped packages such as @graphql-tools/schema, @graphql-tools/utils, etc. Check out https://www.graphql-tools.com to learn what package you should use instead."
  },
  {
    reason: "deprecated",
    package: "babel-eslint",
    version: "10.1.0",
    message: "babel-eslint is now @babel/eslint-parser. This package will no longer receive updates."
  },
  {
    reason: "deprecated",
    package: "apollo-server-micro",
    version: "2.25.4",
    message: "The `apollo-server-micro` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). This package's functionality is now found in the `@apollo/server` package. See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "apollo-server-core",
    version: "2.25.4",
    message: "The `apollo-server-core` package is part of Apollo Server v2 and v3, which are now deprecated (end-of-life October 22nd 2023 and October 22nd 2024, respectively). This package's functionality is now found in the `@apollo/server` package. See https://www.apollographql.com/docs/apollo-server/previous-versions/ for more details."
  },
  {
    reason: "deprecated",
    package: "rimraf",
    version: "2.7.1",
    message: "Rimraf versions prior to v4 are no longer supported."
  },
  {
    reason: "deprecated",
    package: "core-js-pure",
    version: "3.23.1",
    message: "core-js-pure@<3.23.3 is no longer maintained and not recommended for usage due to the number of issues. Because of the V8 engine whims, feature detection in old core-js versions could cause a slowdown up to 100x even if nothing is polyfilled. Some versions have web compatibility issues. Please, upgrade your dependencies to the actual version of core-js-pure."
  }
];