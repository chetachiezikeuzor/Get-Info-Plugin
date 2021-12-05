export interface GetInfoSettings {
	wordsPerMinute: string;
	wordsPerPage: string;
	footnotesIncluded: boolean;
	spacesIncluded: boolean;
	commentsIncluded: boolean;
}

const DEFAULT_SETTINGS: GetInfoSettings = {
	wordsPerMinute: "250",
	wordsPerPage: "750",
	footnotesIncluded: true,
	spacesIncluded: false,
	commentsIncluded: false,
};

export default DEFAULT_SETTINGS;
