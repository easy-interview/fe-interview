// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// @ts-ignore
const lightCodeTheme = require('prism-react-renderer/themes/github');
// @ts-ignore
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
// @ts-ignore
const remarkPlugin = require('./remark-plugin')
// @ts-ignore
const plugin = require('./plugin')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'woopen', // Usually your GitHub org/user name.
  projectName: 'fe-interview', // Usually your repo name.

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    localeConfigs: {
      en: {
        label: 'English',
      },
      'zh-CN': {
        label: '中文',
      }
    }
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/easy-interview/fe-interview/edit/main/website/',
          // beforeDefaultRemarkPlugins: [remarkPlugin]
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
      navbar: {
        title: 'FE Interview',
        logo: {
          alt: 'FE Interview',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '面试',
          },
          {
            to: '/records/intro',
            label: '面试记录',
            position: 'left',
            activeBaseRegex: `/records/`,
          },
          {
            position: 'left',
            label: '攻略',
            to: 'walk-through'
          },
          {
            position: 'left',
            label: '简历',
            to: 'resume'
          },
          {
            position: 'left',
            label: '微信群',
            to: 'community'
          },
          {
            position: 'left',
            label: '内推/工作机会',
            to: 'job'
          },
          {
            position: 'left',
            label: '贡献',
            to: 'contribute'
          },
          {
            position: 'left',
            label: '捐赠',
            to: 'donate'
          },
          {
            position: 'left',
            label: '反馈',
            to: 'feedback'
          },
          {
            href: 'https://github.com/woopen/fe-interview',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Fe Interview.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    require('./plugin'),
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'records',
        path: 'records',
        routeBasePath: 'records',
        editUrl: 'https://github.com/easy-interview/fe-interview/edit/main/website/',
        sidebarPath: require.resolve('./sidebars.js'),
      },
    ],
  ],
};

module.exports = config;
