import { App, Menu } from "obsidian";
import GetInfoPlugin from "src/plugin/main";
import { GetInfoSettings } from "src/settings/settingsData";
import createSettings from "./getInfoReact";
import * as ReactDOM from "react-dom";
export default function getInfoMenu(
	app: App,
	plugin: GetInfoPlugin,
	settings: GetInfoSettings,
	stats: any
) {
	const windowX = window.innerWidth;
	const windowY = window.innerHeight;
	const menuExists = document.querySelector(".menu.get-info-menu");

	if (!menuExists) {
		const menu = new Menu(app).addItem((item) => {
			item.setTitle("Get Info");

			const itemDom = (item as any).dom as HTMLElement;
			itemDom.setAttribute("style", "display: none;");
		});

		const menuDom = (menu as any).dom as HTMLElement;
		menuDom.addClass("get-info-menu");
		menuDom.setAttribute("draggable", "true");
		ReactDOM.render(createSettings(stats), menuDom);
		menuDom.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopImmediatePropagation();
			e.stopPropagation();
		});
		menu.showAtPosition({
			x: windowX - 15,
			y: windowY - 37,
		});
	}
}