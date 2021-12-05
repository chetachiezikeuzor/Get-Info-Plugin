import * as React from "react";
import parse from "html-react-parser";
import { getReadingTime } from "src/data/stats";

export default function getInfoReact(stats: any): JSX.Element {
	const fileIcons: Record<string, string> = {
		md: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.76em" height="2.76em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM429 481.2c-1.9-4.4-6.2-7.2-11-7.2h-35c-6.6 0-12 5.4-12 12v272c0 6.6 5.4 12 12 12h27.1c6.6 0 12-5.4 12-12V582.1l66.8 150.2a12 12 0 0 0 11 7.1H524c4.7 0 9-2.8 11-7.1l66.8-150.6V758c0 6.6 5.4 12 12 12H641c6.6 0 12-5.4 12-12V486c0-6.6-5.4-12-12-12h-34.7c-4.8 0-9.1 2.8-11 7.2l-83.1 191l-83.2-191z" fill="var(--text-normal)"/></svg>`,
		png: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.76em" height="2.76em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><path d="M553.1 509.1l-77.8 99.2l-41.1-52.4a8 8 0 0 0-12.6 0l-99.8 127.2a7.98 7.98 0 0 0 6.3 12.9H696c6.7 0 10.4-7.7 6.3-12.9l-136.5-174a8.1 8.1 0 0 0-12.7 0zM360 442a40 40 0 1 0 80 0a40 40 0 1 0-80 0zm494.6-153.4L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="var(--text-normal)"/></svg>`,
		gif: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.76em" height="2.76em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><defs/><path d="M551.5 490.5H521c-4.6 0-8.4 3.7-8.4 8.4V720c0 4.6 3.7 8.4 8.4 8.4h30.5c4.6 0 8.4-3.7 8.4-8.4V498.9c-.1-4.6-3.8-8.4-8.4-8.4zM477.3 600h-88.1c-4.6 0-8.4 3.7-8.4 8.4v23.8c0 4.6 3.7 8.4 8.4 8.4h47.6v.7c-.6 29.9-23 49.8-56.5 49.8c-39.2 0-63.6-30.7-63.6-81.4c0-50.1 23.9-80.6 62.3-80.6c28.1 0 47.5 13.5 55.4 38.3l.9 2.8h49.2l-.7-4.6C475.9 515.9 434.7 484 379 484c-68.8 0-113 49.4-113 125.9c0 77.5 43.7 126.1 113.6 126.1c64.4 0 106-40.3 106-102.9v-24.8c0-4.6-3.7-8.3-8.3-8.3z" fill="currentColor"/><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216c0 23.2 18.8 42 42 42h216v494z" fill="currentColor"/><path d="M608.2 727.8h32.3c4.6 0 8.4-3.7 8.4-8.4v-84.8h87.8c4.6 0 8.4-3.7 8.4-8.4v-25.5c0-4.6-3.7-8.4-8.4-8.4h-87.8v-58.9h96.8c4.6 0 8.4-3.7 8.4-8.4v-26.8c0-4.6-3.7-8.4-8.4-8.4H608.2c-4.6 0-8.4 3.7-8.4 8.4v221.1c0 4.8 3.8 8.5 8.4 8.5z" fill="var(--text-normal)"/></svg>`,
		pdf: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.76em" height="2.76em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><path d="M531.3 574.4l.3-1.4c5.8-23.9 13.1-53.7 7.4-80.7c-3.8-21.3-19.5-29.6-32.9-30.2c-15.8-.7-29.9 8.3-33.4 21.4c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.5-51.2 107.5c-29.6 15.3-69.3 38.9-75.2 68.7c-1.2 5.5.2 12.5 3.5 18.8c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-13.2-13-45.3-16.4-95.3-10.2c-24.6-15-40.7-35.4-52.4-65.8zM421.6 726.3c-13.9 20.2-24.4 30.3-30.1 34.7c6.7-12.3 19.8-25.3 30.1-34.7zm87.6-235.5c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4c.8.1 1.5.7 2.2 2zm-1.6 120.5c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4zm155.6 65.5c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4zm191.4-388.2L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="var(--text-normal)"/></svg>`,
		unknownIcon: `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2.76em" height="2.76em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024" stroke-width="0" stroke-linecap="round" stroke-linejoin="round"><path d="M854.6 288.7L639.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.6-9.4-22.6zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM402 549c0 5.4 4.4 9.5 9.8 9.5h32.4c5.4 0 9.8-4.2 9.8-9.4c0-28.2 25.8-51.6 58-51.6s58 23.4 58 51.5c0 25.3-21 47.2-49.3 50.9c-19.3 2.8-34.5 20.3-34.7 40.1v32c0 5.5 4.5 10 10 10h32c5.5 0 10-4.5 10-10v-12.2c0-6 4-11.5 9.7-13.3c44.6-14.4 75-54 74.3-98.9c-.8-55.5-49.2-100.8-108.5-101.6c-61.4-.7-111.5 45.6-111.5 103zm78 195a32 32 0 1 0 64 0a32 32 0 1 0-64 0z" fill="var(--text-normal)"/></svg>`,
	};
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
	];
	let dateModified =
		new Date(stats?.modified).toDateString() +
		" " +
		new Date(stats?.modified).toLocaleTimeString();
	let dateCreated =
		new Date(stats?.created).toDateString() +
		" " +
		new Date(stats?.created).toLocaleTimeString();
	return (
		<>
			{!stats ? (
				<div>No File Open</div>
			) : (
				<div className="get-infocontainer">
					<div className="item item-3">
						{" "}
						<span>{stats?.fileName}</span>{" "}
					</div>
					{stats?.extension == "md" ? (
						<>
							<div className="item item-3">
								{" "}
								<span>{dateModified}</span>{" "}
								<span>Modified</span>{" "}
							</div>
							<div className="item item-3">
								{" "}
								<span>{dateCreated}</span> <span>Created</span>{" "}
							</div>
							<div className="item item-4">
								{" "}
								<span>{stats?.wordCount}</span>{" "}
								<span>Words</span>{" "}
							</div>
							<div className="item item-5">
								{" "}
								<span>{stats?.charCount}</span>{" "}
								<span>Characters</span>{" "}
							</div>
							<div className="item item-4">
								{" "}
								<span>
									{parseFloat(stats?.pageCount.toFixed(2))}
								</span>{" "}
								<span>Pages</span>{" "}
							</div>
							<div className="item item-5">
								{" "}
								<span>
									{getReadingTime(stats?.readingTime)}
								</span>{" "}
								<span>Reading Time</span>{" "}
							</div>
						</>
					) : stats?.extension !== "md" ? (
						<>
							<div className="item item-3">
								{" "}
								<span>{dateModified}</span>{" "}
								<span>Modified</span>{" "}
							</div>
							<div className="item item-3">
								{" "}
								<span>{dateCreated}</span> <span>Created</span>{" "}
							</div>
						</>
					) : (
						""
					)}
					<div
						className="item item-6"
						style={{ textAlign: "center" }}
					>
						{parse(
							fileIcons[
								fileTypes[stats?.extension]
									? stats?.extension
									: "unknownIcon"
							]
						)}
					</div>
				</div>
			)}
		</>
	);
}
