# AniList - Quick Genres Display

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/Symswag/)
[![Platform](https://img.shields.io/badge/platform-Anilist-blue.svg)](https://anilist.co/)

A lightweight Tampermonkey/Violentmonkey userscript for **AniList.co** that duplicates and displays anime/manga genres right above the "Relations" block in the main column, preventing you from having to look for them deep inside the sidebar. 

It includes a native Single Page Application (SPA) fix to ensure smooth navigation when clicking through recommendations without refreshing the page.

## Features

- **Improved Visibility:** Moves genres from the sidebar to the main content layout, placing them right above the Relations section.
- **Native AniList Look & Feel:** Styled with CSS variables matching your active theme (Dark, Light, etc.) with custom hover animations.
- **SPA Compatibility:** Listens to modern dynamic URL changes, ensuring the tags refresh instantly when navigating from one anime/manga page to another.
- **Clean Code:** Lightweight, zero dependencies, and doesn't inject external libraries.

## Installation

1. Install a userscript manager browser extension if you haven't already:
   - [Tampermonkey](https://www.tampermonkey.net/) (Recommended)
   - [Violentmonkey](https://violentmonkey.github.io/)
2. Navigate to the script file (e.g., `anilist-quick-genres.user.js`) here on GitHub.
3. Click on the **"Raw"** button at the top right of the code block.
4. Your userscript manager will automatically detect it and open an installation tab. Click **Install**.
5. Refresh your AniList page, and you're good to go!

## Metadata

- **Author:** Symswag
- **Version:** 1.0
- **Matches:** `https://anilist.co/anime/*`, `https://anilist.co/manga/*`
- **Grant:** `none` (No special permissions needed)

## License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and adapt it to your preference.