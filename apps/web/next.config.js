module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      "react-native$": "react-native-web",
    };
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ...config.resolve.extensions,
    ];

    return config;
  },
  transpilePackages: ["@mynance/shared-ui"],
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match any route starting with /api/
        destination: "http://localhost:8000/api/:path*", // Your target server URL
      },
    ];
  },
};
