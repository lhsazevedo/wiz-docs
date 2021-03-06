module.exports = {
    title: 'Wiz',
    description: 'A high-level assembly language for retro console platforms.',

    themeConfig: {
        repo: 'wiz-lang/wiz',
        // logo: '/logo2.png',
        search: true,

        sidebar: {
            '/': [
                {
                    text: 'Introduction',
                    link: '/introduction'
                }, {
                    text: 'Building Source',
                    link: '/building-source'
                },
                // {
                //     text: 'Getting Started',
                //     children: [
                //         {
                //             text: 'Introduction',
                //             link: '/introduction'
                //         }, {
                //             text: 'Installation',
                //             link: '/installation'
                //         }
                //     ],
                // },
                {
                    text: 'Using Wiz',
                    link: '/usage'
                }, {
                    text: 'Quick Guide',
                    link: '/quick-guide'
                }, {
                    text: 'Guides',
                    link: '/guides',
                    children: [
                        {
                            text: 'Syntax',
                            link: '/guides/syntax'
                        }, {
                            text: 'Types',
                            link: '/guides/types'
                        }, {
                            text: 'Functions and Labels',
                            link: '/guides/functions-and-labels'
                        }, {
                            text: 'Control Flow',
                            link: '/guides/control-flow'
                        }
                    ]
                }
            ]
        }
    }
}
