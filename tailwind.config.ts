/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				// 'blue': '#3D63DD',
				'primary': '#9400FF',
				'white': '#E4E4E4',
				'gray': '#8B8D98',
				'dark': '#222222'
			},
			borderRadius: {
				'none': '0',
				'sm': '0.125rem',
				DEFAULT: '0.25rem',
				'md': '0.375rem',
				'lg': '0.5rem',
				'full': '9999px',
				'large': '12px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
