export const MATCH_HTML_COMMENT = new RegExp(
	"<!--[\\s\\S]*?(?:-->)?" +
		"<!---+>?" +
		"|<!(?![dD][oO][cC][tT][yY][pP][eE]|\\[CDATA\\[)[^>]*>?" +
		"|<[?][^>]*>?",
	"g"
);
export const MATCH_COMMENT = new RegExp("%%[^%%]+%%", "g");
export const MATCH_PARAGRAPH = new RegExp("\n([^\n]+)\n", "g");
