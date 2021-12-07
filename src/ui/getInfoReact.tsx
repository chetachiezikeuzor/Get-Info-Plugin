import * as React from "react";
import parse from "html-react-parser";
import { getReadingTime, make1000 } from "src/data/stats";
import { fileIcons } from "src/icons/customIcons";

export default function getInfoReact(stats: any): JSX.Element {
	const fileTypes = [
		"md",
		"png",
		"jpg",
		"jpeg",
		"gif",
		"bmp",
		"svg",
		"mp3",
		"webm",
		"wav",
		"m4a",
		"ogg",
		"3gp",
		"flac",
		"mp4",
		"webm",
		"ogv",
		"pdf",
		"js",
		"doc",
		"docx",
		"css",
		"apk",
		"xls",
		"xlsx",
		"javascript",
		"mp3",
		"mp4",
		"pdf",
		"php",
		"ppt",
		"psd",
		"sql",
		"svg",
		"ttf",
		"txt",
		"zip",
	];
	let dateModified =
		new Date(stats?.modified).toDateString() +
		" " +
		new Date(stats?.modified).toLocaleTimeString();
	let dateCreated =
		new Date(stats?.created).toDateString() +
		" " +
		new Date(stats?.created).toLocaleTimeString();
	let iconType = fileTypes.includes(stats?.extension)
		? stats?.extension
		: "unknown";

	const getInfoContainer = {
		display: "grid",
		gridTemplateColumns: "1fr 116px 116px",
	};
	const gridItemTitle = {
		flexFlow: "column",
		display: "flex",
		gridColumn: "2/4",
		alignItems: "center",
		textAlign: "center" as "center",
		padding: "0.45em 0 .85em 0",
	};
	const fileTitle = {
		width: "100%",
		fontSize: "18px",
		overflowX: "hidden",
		lineHeight: "1.32em",
		textOverflow: "ellipsis",
		color: "var(--text-normal)",
		marginBottom: "8px",
	};
	const gridItem = {
		display: "grid",
		fontSize: "16px",
		padding: ".66em 0",
		gridTemplateColumns: "1fr",
		borderTop: "1.5px solid var(--background-modifier-border)",
	};
	const twoOfFour = {
		gridColumn: "2/4",
	};

	const twoOfThree = {
		gridColumn: "2/3",
	};
	const boldItem = {
		fontWeight: "500",
	};
	const textMuted = {
		fontSize: "13.5px",
		fontWeight: "600",
		color: "var(--text-muted)",
	};

	return (
		<>
			{!stats ? (
				<div>No File is Open</div>
			) : (
				<div style={getInfoContainer}>
					<>
						<div style={gridItemTitle}>
							<span>{parse(fileIcons[iconType])}</span>
							<span style={Object.assign(fileTitle, boldItem)}>
								{stats?.fileName}
							</span>
							<span
								style={Object.assign(textMuted, {
									width: "100%",
									overflowX: "hidden",
									textOverflow: "ellipsis",
								})}
							>
								{(stats?.path).toUpperCase()}
							</span>{" "}
						</div>{" "}
					</>
					{stats?.extension == "md" ? (
						<>
							<div style={Object.assign(twoOfThree, gridItem)}>
								{" "}
								<span style={boldItem}>
									{make1000(stats?.wordCount)}
								</span>{" "}
								<span style={textMuted}>WORDS</span>{" "}
							</div>
							<div style={Object.assign(gridItem)}>
								{" "}
								<span style={boldItem}>
									{make1000(stats?.charCount)}
								</span>{" "}
								<span style={textMuted}>CHARACTERS</span>{" "}
							</div>
							<div style={Object.assign(twoOfThree, gridItem)}>
								{" "}
								<span style={boldItem}>
									{parseFloat(stats?.pageCount.toFixed(2))}
								</span>{" "}
								<span style={textMuted}>PAGES</span>{" "}
							</div>
							<div style={Object.assign(gridItem)}>
								{" "}
								<span style={boldItem}>
									{getReadingTime(stats?.readingTime)}
								</span>{" "}
								<span style={textMuted}>READING TIME</span>{" "}
							</div>
						</>
					) : (
						""
					)}
					<div style={Object.assign(twoOfFour, gridItem)}>
						{" "}
						<span style={boldItem}>{dateModified}</span>{" "}
						<span style={textMuted}>MODIFICATION DATE</span>{" "}
					</div>
					<div style={Object.assign(twoOfFour, gridItem)}>
						{" "}
						<span style={boldItem}>{dateCreated}</span>{" "}
						<span style={textMuted}>CREATION DATE</span>{" "}
					</div>
				</div>
			)}
		</>
	);
}
