// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

// @ts-ignore
const lightCodeTheme = require('prism-react-renderer/themes/github');
// @ts-ignore
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const remarkPlugin = require('./remark-plugin')

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
    defaultLocale: 'zh',
    locales: ['zh', 'en']
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
          beforeDefaultRemarkPlugins: [remarkPlugin]
        },
        blog: {
          blogSidebarCount: 0,
          editUrl: ({blogDirPath, blogPath}) => {
            return `https://github.com/easy-interview/fe-interview/edit/main/website/${blogDirPath}/${blogPath}`;
          },
        },
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
            type: 'docSidebar',
            sidebarId: 'questions',
            position: 'left',
            label: '面试题',
          },
          {
            type: 'docSidebar',
            position: 'left',
            sidebarId: 'records',
            label: '面试记录',
          },
          {
            position: 'left',
            label: '攻略',
            to: 'blog/walk-through'
          },
          {
            position: 'left',
            label: '简历',
            to: 'blog/resume'
          },
          {
            position: 'left',
            label: '微信群',
            to: 'blog/community'
          },
          {
            position: 'left',
            label: '内推/工作机会',
            to: 'blog/job'
          },
          {
            position: 'left',
            label: '贡献',
            to: 'blog/contribute'
          },
          {
            position: 'left',
            label: '捐赠',
            to: 'blog/donate'
          },
          {
            position: 'left',
            label: '反馈',
            to: 'blog/feedback'
          },
          {
            href: 'https://github.com/easy-interview/fe-interview',
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
  ],
};

module.exports = config;
