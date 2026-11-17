# Read Later & Topics — Obsidian plugin

A dashboard for your vault that tracks **read-later items** and **discussion/research topics**, grouped by **section**. All data lives in plain Markdown notes with frontmatter, in two folders. No database, no lock-in: edit a note's frontmatter and the dashboard updates itself.

## What you get

- A **dashboard view** grouped by section: stat cards (To read, Reading now, Topics open, Sections), then for each section a **Read later** table and a **Topics** table.
- **Create commands** and buttons: New read-later item / New topic — a small form writes the note with the right frontmatter for you. The Section field suggests sections already in use; pick one or type a new one.
- **Click any row** to open the underlying note.
- **Status chips are menus** — click a chip to change an item's status in place; the new status is written to the note's frontmatter.
- Read-later **URLs render as an "Open ↗" link** in their own column.
- **Finished items** (read-later items marked Done, topics marked Archived) move out of the section tables into a collapsed **Finished** area at the bottom. Decided topics stay visible in their section.
- A **toolbar** with a search box (titles, sections, sources, owners) and a **section filter**.
- A quiet **startup notice** once per Obsidian session summarizing the counts (X to read · Y topics open) — turn it off in settings.
- **Section icons from Iconize** — if you use the Iconize plugin, the icon assigned to a section's folder shows in that section's dashboard header (see below).
- **Your choice of spot color** — the dashboard accent (header rules, primary button, alerts) defaults to the Intown Maps red from the Workroom dashboard; change it in settings with a color picker or presets.
- Follows your Obsidian theme (light/dark).

## Install (Windows)

1. Unzip `read-later-topics-tracker.zip`.
2. Copy the `read-later-topics-tracker` folder into your vault's plugins folder:
   `<your vault>\.obsidian\plugins\`
   (so you end up with `.obsidian\plugins\read-later-topics-tracker\main.js`, `manifest.json`, `styles.css`).
3. In Obsidian: **Settings → Community plugins**. If Restricted mode is on, turn it off, then enable **Read Later & Topics** in the installed list.
4. Open the dashboard from the ribbon icon (book icon on the left) or the command palette: **Open dashboard**.

## Try it with the samples

Copy the two folders from `sample-notes` (`Read Later`, `Topics`) into the root of your vault, open the dashboard, and you'll see it populated across three sections (Atlanta, Podcast research, Tech & tools) — including a finished article and an archived topic in the Finished area. Delete the samples whenever you're ready.

## How sections work

- Every note can carry a `section:` in its frontmatter. Notes that share a section are grouped under that section's heading on the dashboard, in alphabetical order.
- Sections aren't configured anywhere — they exist because notes use them. Type a new section name in the create form (or in a note's frontmatter) and a new group appears.
- Notes with no `section:` land in a **No section** group, always last.
- The group header shows counts and has **+ Read later** / **+ Topic** buttons that pre-fill that section for you.

### Section icons (Iconize)

If the [Iconize](https://github.com/FlorianWoelki/obsidian-icon-folder) plugin is installed, a section header shows the icon Iconize has assigned to that section's folder. The lookup tries, in order: a folder with the section's name inside the read-later folder (e.g. `Read Later/Atlanta`), then inside the topics folder (`Topics/Atlanta`), then a vault-root folder with that name (`Atlanta`). Emoji assignments and icon-pack assignments both work. Turn it off with the **Section icons from Iconize** setting.

## Frontmatter schema

Read-later note (in the `Read Later` folder by default):

```yaml
---
url: https://example.com/article   # optional; shown as an "Open ↗" link
section: Podcast research
status: to-read                    # to-read | reading | done
added: 2026-10-22                  # optional, YYYY-MM-DD
source: The Atlantic               # optional; publication, site, or who sent it
---
```

Topic note (in the `Topics` folder by default):

```yaml
---
section: Podcast research
status: idea                       # idea | discussing | decided | archived
owner: Tom                         # optional
updated: 2026-10-22                # optional, YYYY-MM-DD
---
```

The note's filename is its title on the dashboard (a `title:` frontmatter key, if present, wins).

## Settings

Settings → Read Later & Topics:

- **Read-later folder** and **Topics folder** — rename them to match your vault. Subfolders count too: anything inside the folder is picked up.
- **Startup notice** — the once-per-session counts notice, on by default.
- **Section icons from Iconize** — on by default; see "Section icons" above.
- **Spot color** — a color picker plus preset swatches for the dashboard accent. "Reset to Intown red" restores #C11A18.

## Commands

- **Open dashboard**
- **New read-later item**
- **New topic**

Everything is just frontmatter, so Dataview, search, and graph view all work on the same notes.


## Icons and new sections

Use **+ New Section** on the dashboard (or **New section** in the command palette) to create a named section with an optional icon. Empty sections are saved in plugin settings and remain available after restarting Obsidian. Use **+ Read later** or **+ Topic** in its header to add notes to it.

Click a section or note icon to open the same searchable icon picker used in Project Milestone. Choose a Lucide icon, emoji, an icon from Iconize, or type your own icon name/emoji. New item dialogs also include an icon chooser. Note icons are saved as `icon:` frontmatter; section icons are saved in plugin settings. When no note icon is set, Iconize provides a fallback if enabled. Clearing a section icon restores the default folder icon.
