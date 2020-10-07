const blacklist = require("metro-config/src/defaults/blacklist")

module.exports = {
  ...require("./node_modules/kiwi-bundle/configs/metro/react.js"),
  /*resolver: {
    blacklistRE: blacklist([
      /kiwi-bundle-react\/node_modules\/react-native\/.*$/,
    ]),
  },*/
}
