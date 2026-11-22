# LIFT@CUNY at the 2026 CUNY IT Conference

A responsive, accessible, static conference session guide for GitHub Pages. No build system, server, account or third-party scripts are required.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder to the repository root (`index.html`, `styles.css`, `app.js`, `sessions.js`, and `assets/`).
3. In repository **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the Pages URL GitHub provides. It works from a project repository path, not only a custom domain.

## Update the program

Edit `sessions.js` to change the title, description, presenters, time, campus, topics, or `room` for each session. Titles reflect the provided Word document. The source document contains two concatenated alternatives for the “One Coder, One Vibe Coder” title; this site uses **One Coder, One Vibe Coder: Building an AI-Powered Course Quality Ecosystem**, the alternative used in the previous guide. Verify against the official schedule if necessary.

### Show room assignments later

1. Replace `room:null` with a room such as `room:'L.63'` for each confirmed session in `sessions.js`.
2. Change `const SHOW_ROOMS = false;` to `true` near the top of `app.js`.
3. Commit and push changes.

## Features

- Search titles, descriptions, presenters, campus names, topics and times
- Filter by day, topic and campus/unit
- Sort within each time slot by original program order, title or campus
- Keep concurrent sessions grouped together
- Responsive card layout for desktop and mobile
- Keyboard-operable controls, visible focus, semantic headings, accessible status messages
- Print-friendly layout
- Original logo image copied byte-for-byte from the supplied uploaded file, with no changes to the artwork

## Notes

- Room assignments are currently placeholders and are deliberately hidden.
- All data comes from the user-provided `CUNYITCONFERENCE - LIFT SESSIONS.docx`; descriptions are edited summaries.
- The website covers the 13 listed member sessions, not the full conference.
