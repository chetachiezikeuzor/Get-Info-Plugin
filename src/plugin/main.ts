import type { BrowserWindow } from "electron";
import { remote } from "electron";
import addIcons from "src/icons/customIcons";
import getInfoMenu from "src/ui/getInfoMenu";
import { setAttributes } from "src/utils/setAttributes";
import { Plugin, TFile, setIcon, FileSystemAdapter } from "obsidian";
import { GetInfoSettingsTab } from "../settings/settingsTab";
import DEFAULT_SETTINGS, { GetInfoSettings } from "../settings/settingsData";
import { removeFootnotes, removeMarkdown } from "src/data/stats";
import {
	getCharacterCount,
	getSentenceCount,
	getWordCount,
} from "../data/stats";
import { makeCSS } from "src/ui/makeCSS";
import getInfoReact from "src/ui/getInfoReact";

export default class GetInfoPlugin extends Plugin {
	stats: any;
	settings: GetInfoSettings;
	statusBarIcon: HTMLElement;
	window: BrowserWindow;

	async onload() {
		addIcons();
		await this.loadSettings();
		this.addSettingTab(new GetInfoSettingsTab(this.app, this));

		this.registerEvent(
			this.app.workspace.on("file-menu", async (menu, file: TFile) => {
				if (file instanceof TFile) {
					// && file.extension === "md"
					menu.addItem((item) => {
						const itemDom = (item as any).dom as HTMLElement;
						item.setTitle(`Get file info`)
							.setIcon("help")
							.onClick(async () => {
								//this.loadFile(file);
								getInfoMenu(
									this.app,
									this,
									this.settings,
									this.calculateNoteStats(file)
								);
							});
					});
				}
			})
		);
		this.app.workspace.onLayoutReady(() => {
			setTimeout(() => {
				this.setupSnippetsStatusBarIcon();
			});
		});
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

		this.statusBarIcon.addEventListener("click", () => {
			getInfoMenu(
				this.app,
				this,
				this.settings,
				this.calculateNoteStats()
			);
		});

		this.addCommand({
			id: `open-snippets-menu`,
			name: `See current file info`,
			icon: `help`,
			callback: async () => {
				getInfoMenu(
					this.app,
					this,
					this.settings,
					this.calculateNoteStats()
				);
			},
		});
	}

	async loadFile(file: TFile) {
		if (!(this.app.vault.adapter instanceof FileSystemAdapter)) return;

		const html = `<div style="height: 100%; width: 100%;">${getInfoReact(
			this.calculateNoteStats(file)
		)}</div>`;

		const encoded = "data:text/html;charset=utf-8," + encodeURI(html);

		if (!this.window) {
			this.window = new remote.BrowserWindow({
				webPreferences: {
					webSecurity: false,
				},
				width: 276,
				height: 380,
				title: file.basename,
				resizable: false,
			});

			this.window.webContents.insertCSS(makeCSS, {
				cssOrigin: "author",
			});

			this.window.on("close", () => (this.window = null));
		}
		await this.window.loadURL(encoded);
		this.window.moveTop();
	}

	codeMirror = (cm: any) => {
		cm.on("change", this.calculateNoteStats());
	};

	calculateNoteStats(file?: TFile) {
		let fileData = !file ? this.app.workspace.getActiveFile() : file;
		if (fileData && fileData.extension == "md") {
			//@ts-ignore
			let fileCache = fileData?.unsafeCachedData;
			fileCache = fileCache?.replace(/(^\\s\*)|(\\s\*$)/gi, "");
			fileCache = fileCache?.replace(/\[ \]{2,}/gi, " ");
			fileCache = fileCache?.replace(/\\n /, "\\n");
			fileCache = removeMarkdown(fileCache, true);
			!true ? removeFootnotes(fileCache) : fileCache;
			return {
				fileName: fileData.basename,
				wordCount: getWordCount(fileCache),
				charCount: getCharacterCount(fileCache, true),
				sentenceCount: getSentenceCount(fileCache),
				readingTime:
					getWordCount(fileCache) /
					parseInt(this.settings.wordsPerMinute),
				pageCount:
					getWordCount(fileCache) /
					parseInt(this.settings.wordsPerPage),
				created: fileData.stat.ctime,
				modified: fileData.stat.mtime,
				extension: fileData.extension,
			};
		} else if (fileData && fileData.extension) {
			return {
				fileName: fileData.basename,
				created: fileData.stat.ctime,
				modified: fileData.stat.mtime,
				extension: fileData.extension,
			};
		}
	}

	onunload() {}

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
