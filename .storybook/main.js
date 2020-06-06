const cesiumPlugin = require.resolve("./cesium.config.js");

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    cesiumPlugin,
  ],
};
