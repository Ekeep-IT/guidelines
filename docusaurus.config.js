// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config();

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const organizationName = 'Ekeep-IT';
const projectName = 'guidelines';

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Guidelines',
	tagline: 'Guide de bonnes pratiques',
	url: process.env.ORGANISATION_URL ?? `https://${organizationName}.github.io`,
	baseUrl: `/${projectName}/`,
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'throw',
	favicon: 'img/favicon.ico',
	// GitHub Pages adds a trailing slash by default that I don't want
	trailingSlash: false,
	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName, // Usually your GitHub org/user name.
	projectName, // Usually your repo name.

	// Even if you don't use internalization, you can use this field to set useful
	// metadata like html lang. For example, if your site is Chinese, you may want
	// to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: 'fr',
		locales: ['fr'],
	},
	plugins: ['docusaurus-plugin-sass'],
	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
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
			prims: {
				additionalLanguages: ['java', 'csharp', 'cs', 'dotnet', 'bash'],
			},
			navbar: {
				title: 'Guidelines Ekeep',
				logo: {
					alt: 'ekeep logo',
					src: 'img/logo.svg',
				},
				items: [
					{
						href: `https://github.com/${organizationName}/${projectName}`,
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
						items: [],
					},
					{
						title: 'Community',
					},
					{
						title: 'More',
						items: [
							{
								label: 'GitHub',
								href: `https://github.com/${organizationName}/${projectName}`,
							},
						],
					},
				],
				copyright: `Copyright © ${new Date().getFullYear()} Ekeep-IT, Inc. Built with Docusaurus.`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};
module.exports = config;
