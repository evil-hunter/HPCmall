module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      //设计时宽高
      viewportWidth: 375,
      viewportHeight: 812,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bat-item'],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/TabBar/]
    },
  }
}