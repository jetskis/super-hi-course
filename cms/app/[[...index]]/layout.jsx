import React from 'react';

export default function RootLayout({children}) {
	return (
		<html>
			<head />
			<style>{`
				body, html {
					margin: 0;
					padding: 0;
				}
			`}</style>
			<body>{children}</body>
		</html>
	);
}
