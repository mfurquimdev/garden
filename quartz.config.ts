import { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
	configuration: {
		pageTitle: "MFurquim Garden",
		enableSPA: true,
		enablePopovers: true,
		analytics: {
			provider: "plausible",
		},
		locale: "en-US",
		baseUrl: "mfurquim.dev",
		ignorePatterns: [
			"private",
			"templates",
			".obsidian",
			"!(PublicMedia)**/!(*.md)",
			"!(*.md)",
		],
		defaultDateType: "created",
		theme: {
			fontOrigin: "googleFonts",
			cdnCaching: true,
			typography: {
				header: "Schibsted Grotesk",
				body: "Source Sans Pro",
				code: "IBM Plex Mono",
			},
			colors: {
				lightMode: { // https://gitlab.com/yorickpeterse/vim-paper/-/tree/master?ref_type=heads
					light: "#f2eede",
					lightgray: "#d8d5c7", // Graph border and search background
					gray: "#777777",
					darkgray: "#242933", // Normal text
					dark: "#000000",
					secondary: "#216609",
					tertiary: "#b58900",
					highlight: "rgba(247, 243, 227, 0.15)",
				},
				darkMode: { // https://www.nordtheme.com
					light: "#242933",
					lightgray: "#3B4252",
					gray: "#6f7d98",
					darkgray: "#D8DEE9",
					dark: "#ECEFF4",
					secondary: "#81A1C1",
					tertiary: "#6f7d98",
					highlight: "rgba(180, 142, 173, 0.15)",
				},
			},
		},
	},
	plugins: {
		transformers: [
			Plugin.FrontMatter(),
			Plugin.CreatedModifiedDate({
				priority: ["frontmatter", "filesystem"],
			}),
			Plugin.SyntaxHighlighting({
				theme: {
					light: "github-light",
					dark: "github-dark",
				},
				keepBackground: false,
			}),
			Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
			Plugin.GitHubFlavoredMarkdown(),
			Plugin.TableOfContents(),
			Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
			Plugin.Description(),
			Plugin.Latex({ renderEngine: "katex" }),
		],
		filters: [Plugin.RemoveDrafts()],
		emitters: [
			Plugin.AliasRedirects(),
			Plugin.ComponentResources(),
			Plugin.ContentPage(),
			Plugin.FolderPage(),
			Plugin.TagPage(),
			Plugin.ContentIndex({
				enableSiteMap: true,
				enableRSS: true,
			}),
			Plugin.Assets(),
			Plugin.Static(),
			Plugin.NotFoundPage(),
		],
	},
};

export default config;
