const withPlugins = require('next-compose-plugins');
const withSourceMaps = require("@zeit/next-source-maps");

const config = {};

module.exports = withPlugins([
	withSourceMaps(),
], config);
