const shiki  = require('shiki')


module.exports = {
  title: 'Wiz',
  description: 'A high-level assembly language for retro console platforms.',

  themeConfig: {
    repo: 'wiz-lang/wiz',
    searchPlaceholder: 'Search',
    
    nav: [
      {
        text: 'Discord',
        link: 'https://discord.gg/BKnTg7N'
      },
    ],

    sidebar: [
      {
        title: 'Getting Started',
        children: [
          '/introduction',
          '/building-from-source',
          '/using-wiz',
        ]
      }, {
        title: 'Language Guide',
        children: [
          '/guides/syntax',
          '/guides/types',
          '/guides/functions-and-labels',
          '/guides/control-flow'
        ]
      }, {
        title: 'Platforms',
        children: [
          '/platforms/mos-6502',
          '/platforms/mos-65c02',
          '/platforms/rockwell-65c02',
          '/platforms/wdc-65c02',
          '/platforms/huc-6280',
          '/platforms/zilog-z80',
          '/platforms/game-boy',
          '/platforms/wdc-65816',
          '/platforms/spc-700',
        ]
      },
      '/formats',
      '/contact',
    ]
  },

  plugins: {
    shiki: {
      theme: shiki.loadTheme('./dracula.json'),
      langs: [
        {
          id: 'wiz',
          scopeName: 'source.wiz',
          path: './wiz.tmLanguage'
        }
      ]
    }
  }
}
