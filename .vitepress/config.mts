import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MadroneJS",
  description: "Documentation for MadroneJS",
  lastUpdated: true,
  srcDir: './src',
  base: '/madronejs/docs/',
  themeConfig: {
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    // nav: [
    //   { text: 'Home', link: '/' },
    //   { text: 'Examples', link: '/markdown-examples' }
    // ],

    sidebar: [
      {
        text: 'MadroneJS Core',
        items: [
          { text: 'Core', link: '/core/' },
        ]
      },
      {
        text: "SplitPanel",
        items: [
          { text: 'SplitPanel', link: '/splitpanel/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/madronejs' }
    ]
  },
});
