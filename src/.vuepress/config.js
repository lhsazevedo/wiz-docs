const shiki  = require('shiki')


module.exports = {
  title: 'Wiz',
  description: 'A high-level assembly language for retro console platforms.',

  themeConfig: {
    repo: 'wiz-lang/wiz',
    // logo: '/logo2.png',
    // search: true,

    sidebar: [
      '/introduction',
      '/building-source',
      '/usage',
      // '/quick-guide',
      {
        title: 'Guides',
        children: [
          '/guides/syntax',
          '/guides/types',
          '/guides/functions-and-labels',
          '/guides/control-flow'
        ]
      }, {
        title: 'Platforms',
        children: [
          '/platforms/mos-6502.md',
          '/platforms/mos-65c02.md',
          '/platforms/rockwell-65c02.md',
          '/platforms/wdc-65c02.md',
          '/platforms/huc-6280.md',
          '/platforms/zilog-z80.md',
          '/platforms/game-boy.md',
          '/platforms/wdc-65816.md',
          '/platforms/spc-700.md',
        ]
      }
    ]
  },

  plugins: {
    shiki: {
      theme: shiki.loadTheme('./dracula.json'),
      langs: [
        {
          id: 'wiz',
          scopeName: 'source.wiz',
          path: './wiz.tmLanguage' // or `plist`
        }
      ]
    } // theme: TTheme
  }
}
