/* eslint-disable perfectionist/sort-imports */
import "src/global.css";

// ----------------------------------------------------------------------

import ThemeProvider from "src/theme";
import { primaryFont } from "src/theme/typography";

import ProgressBar from "src/components/progress-bar";

// ----------------------------------------------------------------------

export const metadata = {
	title: "Bitfa",
	description: "Code challenge",
	keywords: "react",
	themeColor: "#000000",
	manifest: "/manifest.json",
	viewport: { width: "device-width", initialScale: 1, maximumScale: 1 },
	icons: [
		{ rel: "icon", url: "/favicon/favicon.ico" },
		{
			rel: "icon",
			type: "image/png",
			sizes: "16x16",
			url: "/favicon/favicon-16x16.png",
		},
		{
			rel: "icon",
			type: "image/png",
			sizes: "32x32",
			url: "/favicon/favicon-32x32.png",
		},
		{
			rel: "apple-touch-icon",
			sizes: "180x180",
			url: "/favicon/apple-touch-icon.png",
		},
	],
};

type Props = {
	children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en" className={primaryFont.className}>
			<body>
				<ThemeProvider>
						<ProgressBar />
						{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
