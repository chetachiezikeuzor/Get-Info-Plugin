import addIcons from "src/icons/customIcons";
import getInfoMenu from "src/ui/getInfoMenu";
import { setAttributes } from "src/utils/setAttributes";
import { Plugin, TFile, setIcon } from "obsidian";
import { GetInfoSettingsTab } from "../settings/settingsTab";
import DEFAULT_SETTINGS, { GetInfoSettings } from "../settings/settingsData";
import { removeFootnotes, removeMarkdown } from "src/data/stats";
import {
	getCharacterCount,
	getSentenceCount,
	getWordCount,
} from "../data/stats";

export default class GetInfoPlugin extends Plugin {
	stats: any;
	settings: GetInfoSettings;
	statusBarIcon: HTMLElement;

	async onload() {
		addIcons();
		console.log("Get Info v" + this.manifest.version + " loaded");
		await this.loadSettings();
		this.setupSnippetsStatusBarIcon();
		this.addSettingTab(new GetInfoSettingsTab(this.app, this));

		this.registerEvent(
			this.app.workspace.on("file-menu", async (menu, file: TFile) => {
				if (file instanceof TFile) {
					menu.addItem((item) => {
						item.setTitle(`Get file info`)
							.setIcon("help")
							.onClick(async () => {
								getInfoMenu(
									this.app,
									await this.getFileStats(file)
								);
							});
					});
				}
			})
		);
	}

	setupSnippetsStatusBarIcon() {
		this.statusBarIcon = this.addStatusBarItem();
		this.statusBarIcon.addClass("GetInfo-statusbar-button");
		this.statusBarIcon.addClass("mod-clickable");

		setAttributes(this.statusBarIcon, {
			"aria-label": "Get file info",
			"aria-label-position": "top",
		});
		setIcon(this.statusBarIcon, "help");

		this.statusBarIcon.addEventListener("click", async () => {
			getInfoMenu(this.app, await this.getFileStats());
		});

		this.addCommand({
			id: `open-snippets-menu`,
			name: `See current file info`,
			icon: `help`,
			callback: async () => {
				getInfoMenu(this.app, await this.getFileStats());
			},
		});
	}

	async getFileStats(file?: TFile) {
		file = !file ? this.app.workspace.getActiveFile() : file;
		if (file && file.extension == "md") {
			let fileCache = await this.app.vault.cachedRead(file);
			fileCache = fileCache.replace(/(^\\s\*)|(\\s\*$)/gi, "");
			fileCache = fileCache.replace(/\[ \]{2,}/gi, " ");
			fileCache = fileCache.replace(/\\n /, "\\n");
			fileCache = removeMarkdown(
				fileCache,
				!this.settings.commentsIncluded
			);
			if (!this.settings.footnotesIncluded)
				fileCache = removeFootnotes(fileCache);
			else fileCache;
			let numWords = getWordCount(fileCache);
			return {
				path: file.path,
				fileName: file.basename,
				wordCount: numWords,
				charCount: getCharacterCount(
					fileCache,
					this.settings.spacesIncluded
				),
				sentenceCount: getSentenceCount(fileCache),
				readingTime: numWords / parseInt(this.settings.wordsPerMinute),
				pageCount: numWords / parseInt(this.settings.wordsPerPage),
				created: file.stat.ctime,
				modified: file.stat.mtime,
				extension: file.extension,
			};
		} else if (file && file.extension) {
			return {
				path: file.path,
				fileName: file.basename,
				created: file.stat.ctime,
				modified: file.stat.mtime,
				extension: file.extension,
			};
		}
	}

	onunload() {
		console.log("Get Info unloaded");
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
