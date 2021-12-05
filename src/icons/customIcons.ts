import { addIcon } from "obsidian";

const icons: Record<string, string> = {
	"gi-info": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><g class="icon-tabler" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 17v.01"/><path d="M12 13.5a1.5 1.5 0 0 1 1-1.5a2.6 2.6 0 1 0-3-4"/></g></svg>`,
};

export default function addIcons() {
	Object.keys(icons).forEach((key) => {
		addIcon(key, icons[key]);
	});
}
