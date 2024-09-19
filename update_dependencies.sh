# Update or replace deprecated dependencies in the project

# Replace deprecated packages with alternatives
npm install lru-cache@latest       # Replaces inflight
npm install rimraf@4               # Updates rimraf to v4
npm install @rollup/plugin-terser  # Replaces rollup-plugin-terser
npm install glob@9                 # Updates glob to v9
npm install @eslint/config-array    # Replaces @humanwhocodes/config-array
npm install @eslint/object-schema   # Replaces @humanwhocodes/object-schema
npm install @jridgewell/sourcemap-codec # Replaces sourcemap-codec
npm install uuid@7                 # Updates uuid to version 7 or higher

# Replace deprecated Babel plugins with corresponding transform versions
npm install @babel/plugin-transform-unicode-property-regex
npm install @babel/plugin-transform-private-property-in-object
npm install @babel/plugin-transform-optional-chaining
npm install @babel/plugin-transform-private-methods
npm install @babel/plugin-transform-numeric-separator
npm install @babel/plugin-transform-object-rest-spread
npm install @babel/plugin-transform-optional-catch-binding
npm install @babel/plugin-transform-logical-assignment-operators
npm install @babel/plugin-transform-nullish-coalescing-operator
npm install @babel/plugin-transform-dynamic-import
npm install @babel/plugin-transform-json-strings
npm install @babel/plugin-transform-class-static-block
npm install @babel/plugin-transform-export-namespace-from
npm install @babel/plugin-transform-async-generator-functions
npm install @babel/plugin-transform-class-properties

# Replace deprecated Apollo packages
npm install @apollo/server         # Replaces all apollo-server-* packages
npm install graphql-ws             # Replaces subscriptions-transport-ws
npm install @apollo/usage-reporting-protobuf # Replaces apollo-reporting-protobuf

# Replace Hapi.js packages
npm install @hapi/boom             # Replaces boom
npm install @hapi/hoek             # Replaces hoek
npm install @hapi/accept           # Replaces accept

# Other updates
npm install core-js-pure@latest    # Updates core-js-pure to latest version
npm install graphql-tools@latest   # Updates graphql-tools and migrate as necessary

# Remove deprecated packages that should use platform native functionality
npm uninstall w3c-hr-time          # Use native performance.now() and performance.timeOrigin
npm uninstall abab                 # Use native atob() and btoa()
npm uninstall domexception         # Use native DOMException

# Final cleanup
npm audit fix                      # Fix remaining vulnerabilities automatically

echo "Dependency updates completed!"