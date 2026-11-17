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

## Installation: Windows, macOS, Linux, Android, and iOS/iPadOS

These instructions cover Obsidian's desktop and mobile platforms. **Platform instructions are not a claim that this plugin has been tested on every platform.** The supplied README does not include the plugin code, manifest, or a compatibility test matrix. Verify the release before use, especially on mobile.

### Before you install

- Install Obsidian for your device and open the vault where you want the dashboard.
- Back up the vault and its configuration folder before adding or updating plugins.
- Use a trusted release of `read-later-topics-tracker.zip`. The release needs `main.js`, `manifest.json`, and `styles.css`; a source-code ZIP alone may not contain the compiled plugin.
- Check `minAppVersion` in `manifest.json` and use an Obsidian version at least that recent.
- **Mobile prerequisite:** the release must support mobile and declare `isDesktopOnly: false`. A false value alone is not proof of working mobile support. If it declares `true`, use it on desktop only; changing that flag does not make desktop-specific code mobile-compatible. See the [Obsidian manifest reference](https://docs.obsidian.md/Reference/Manifest).
- Paths below assume the default `.obsidian` configuration folder. If you use **Settings → Files and links → Override config folder**, substitute that folder instead. Install separately in each vault or configuration profile where you want the plugin.

### Windows

1. Close Obsidian and extract `read-later-topics-tracker.zip` using File Explorer.
2. Open your vault folder. Enable **View → Show → Hidden items** if needed.
3. Copy the plugin folder into `<your vault>\.obsidian\plugins\`. Create `plugins` if it does not exist.
4. Confirm the release files sit directly in `read-later-topics-tracker`, not inside another nested copy of that folder.
5. Reopen Obsidian and follow **Enable and open the dashboard** below.

### macOS

1. Quit Obsidian and unzip the release in Finder.
2. Open your vault folder. Press **Command + Shift + .** to show hidden folders.
3. Copy `read-later-topics-tracker` into `<your vault>/.obsidian/plugins/`. Create `plugins` if needed.
4. Reopen Obsidian and follow **Enable and open the dashboard** below.

### Linux

1. Close Obsidian and extract the release with your archive manager.
2. Open your vault in the file manager and show hidden files (often **Ctrl + H**).
3. Copy `read-later-topics-tracker` into `<your vault>/.obsidian/plugins/`. Create `plugins` if needed.
4. Ensure your user can read the files and write to the vault. Install in the vault, not Obsidian's application installation directory; administrator privileges should not be necessary for a user-owned vault.
5. Reopen Obsidian and follow **Enable and open the dashboard** below.

### Android

Only proceed with a mobile-compatible release.

1. Close Obsidian and extract the release using a file manager.
2. Locate the actual vault folder selected in Obsidian. Enable **Show hidden files** to access `.obsidian`.
3. Copy `read-later-topics-tracker` into `<your vault>/.obsidian/plugins/`.
4. If your file manager cannot access the vault or its hidden folders, use the **Sync from a desktop** method below instead of copying into an unrelated folder.
5. Reopen Obsidian and enable the plugin. Use the command palette to open the dashboard; the mobile ribbon layout differs from desktop.

### iPhone and iPad (iOS/iPadOS)

Only proceed with a mobile-compatible release. The standard Files app does not provide normal access to the hidden `.obsidian` folder, so the simplest documented route is **Sync from a desktop** below. Do not assume that copying the ZIP into the vault installs the plugin.

Advanced alternative: a file manager capable of accessing hidden folders in your actual vault can copy the extracted plugin folder to `<your vault>/.obsidian/plugins/`. Access depends on your vault storage and file manager. Obsidian documents these limitations in its [configuration folder guide](https://obsidian.md/help/configuration-folder). Reopen Obsidian afterward, enable the plugin, and open the dashboard through the command palette.

### Sync from a desktop (including mobile)

If you already use **Obsidian Sync**, install on desktop first. On the participating devices, configure **Settings → Sync → Vault configuration sync** to include the installed community plugin list and, if desired, the active community plugin list. Enable community plugin settings syncing as well if you want the plugin's saved preferences transferred. Wait for syncing to finish, restart Obsidian on the receiving device, and check that **Read Later & Topics** is enabled there.

Use the intended configuration profile on each device. Sync settings must be configured on each device; syncing notes alone is not sufficient to install a plugin. See [Obsidian Sync settings](https://obsidian.md/help/sync/settings). With another sync service, verify that it transfers the actual configuration folder and plugin files; do not assume hidden folders are included.

### Expected folder layout

```text
<your vault>/
└── .obsidian/
    └── plugins/
        └── read-later-topics-tracker/
            ├── main.js
            ├── manifest.json
            └── styles.css
```

The directory name should match the release manifest's `id`. The examples use the folder name supplied with this plugin. Node.js, npm, or a terminal is not needed to install a compiled release.

### Enable and open the dashboard

1. In Obsidian, open **Settings → Community plugins**.
2. If Restricted mode is enabled, review the security implications before turning it off. Only enable plugins you trust.
3. Enable **Read Later & Topics** in the installed list. Restart Obsidian if the plugin does not appear after copying its files.
4. Open the command palette and search for **Open dashboard**. On desktop, you can also use the book-shaped ribbon icon. The default command-palette shortcut is **Ctrl + P** on Windows/Linux or **Command + P** on macOS.

### Updating, troubleshooting, and removing

- **Update:** back up your vault, disable the plugin, close Obsidian, and replace `main.js`, `manifest.json`, and `styles.css` with the new release's files. Preserve `data.json` if present because it contains plugin settings, including saved section preferences. Reopen Obsidian and re-enable the plugin.
- **Plugin missing:** check the active vault/configuration folder, nested folders, exact filenames, and manifest's minimum app version. A ZIP sitting in the vault is not an installation.
- **Mobile fails to load:** check the release's mobile compatibility rather than changing `isDesktopOnly`. Mobile runtime behavior and the dashboard's small-screen layout remain unverified for this README revision.
- **Icons missing:** Iconize integration is optional. Install and configure it separately on the device if you want its fallback icons; its own platform compatibility applies.
- **Safe test:** in a test vault, try the samples, create a note, change its status, restart Obsidian, and confirm the note and settings persist. Repeat on each device you intend to use.
- **Remove:** disable and uninstall the plugin in Community plugins, or close Obsidian and remove its plugin folder. This removes plugin-specific settings; the Markdown notes in `Read Later` and `Topics` remain unless you delete them separately.

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