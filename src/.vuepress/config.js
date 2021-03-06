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
        link: '/guides',
        children: [
          '/guides/syntax',
          '/guides/types',
          '/guides/functions-and-labels',
          '/guides/control-flow'
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
