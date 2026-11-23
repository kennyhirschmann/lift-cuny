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


## Session details and simplified topic categories

Each card shows a readable summary. Selecting its title or **Read full description** opens a native HTML dialog with the full original description from the supplied Word document. The dialog supports keyboard focus, Escape to close, and a close button. Search matches the full descriptions as well as summaries.

The Topic filter uses six broad categories: **Instructional Design**, **AI Tools & Development**, **Ethics & Governance**, **AI & Digital Literacy**, **Faculty Development**, and **Student Learning & Success**. Sessions can belong to multiple topics. Digital Foundations is explicitly labeled both Instructional Design and AI & Digital Literacy.

The One Coder title line in the supplied Word document combines two title versions; this site uses the second: **One Coder, One Vibe Coder: Building an AI-Powered Course Quality Ecosystem**. The document's full text has been retained except the obvious typo “speakerI” corrected to “speaker” and one grammatical typo (“this is generalizable” to “that is generalizable”).

To publish these changes, replace `index.html`, `app.js`, `sessions.js`, `styles.css`, and `README.md` in your repository, then commit and push in GitHub Desktop. The original image asset is unchanged.

## About LIFT@CUNY section

The page includes an **About the LIFT@CUNY Collective** section after the conference session guide, with concise Who We Are / What We Do content and a call to action. Links are based on the official one-sheet handout:

- Mailing list: https://bit.ly/liftatcunymail
- Microsoft Teams: https://bit.ly/liftatcunyteams
- Academic Commons: https://bit.ly/liftatcunycommons

The logo in `assets/lift-logo-original.png` is retained byte-for-byte. The session content and room visibility were not intentionally changed by this feature; this package also includes the previously supplied corrected 14-session JavaScript file. If you have edited sessions in GitHub since then, **keep your newer sessions.js** when applying this update.

To update only this feature, replace `index.html` and `styles.css` in your existing website folder, then commit and push.

### LIFT@CUNY contact details

Replace the visible placeholder `[add LIFT@CUNY contact address]` in `index.html` when the shared contact address is confirmed. The interest survey, MS Teams, Academic Commons, and mailing-list links are already set up.
