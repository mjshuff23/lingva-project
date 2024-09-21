const path = require("path");

module.exports = {
    swcMinify: true,
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Permissions-Policy",
                        value: "interest-cohort=()",
                    },
                ],
            },
        ];
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    webpack: (config) => {
        config.resolve.alias["@components"] = path.join(
            __dirname,
            "components"
        );
        config.resolve.alias["@hooks"] = path.resolve(__dirname, "hooks");
        config.resolve.alias["@utils"] = path.join(__dirname, "utils");
        config.resolve.alias["@theme"] = path.join(__dirname, "theme.ts");
        return config;
    },
};
