"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => RLTPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian3 = require("obsidian");

// src/modals.ts
var import_obsidian = require("obsidian");

function isIconName(value) {
  return /^[a-z0-9]+(-[a-z0-9]+)*$/.test(value.trim());
}
function renderIconInto(parent, icon) {
  const span = parent.createSpan({ cls: "rlt-icon" });
  const value = (icon != null ? icon : "").trim();
  if (value === "") {
    span.addClass("rlt-icon--default");
    (0, import_obsidian.setIcon)(span, "folder");
  } else if (isIconName(value)) {
    (0, import_obsidian.setIcon)(span, value);
  } else {
    span.setText(value);
  }
  return span;
}
var LUCIDE_ICONS = [
  "rocket",
  "map",
  "compass",
  "globe",
  "target",
  "flag",
  "star",
  "heart",
  "home",
  "briefcase",
  "code",
  "calendar",
  "camera",
  "music",
  "film",
  "newspaper",
  "mail",
  "users",
  "book-open",
  "bot",
  "lightbulb",
  "zap",
  "flame",
  "coffee",
  "utensils",
  "shopping-bag",
  "trending-up",
  "search",
  "settings",
  "wrench",
  "hammer",
  "palette",
  "pen-tool",
  "mic",
  "radio",
  "tv",
  "phone",
  "gift",
  "award",
  "crown",
  "gem",
  "leaf",
  "sun",
  "moon",
  "anchor",
  "plane",
  "car",
  "bike",
  "dumbbell",
  "graduation-cap",
  "landmark",
  "scale",
  "rainbow",
  "sparkles"
];
var EMOJI_ICONS = [
  "\u{1F680}",
  "\u{1F4DA}",
  "\u{1F916}",
  "\u{1F5FA}\uFE0F",
  "\u{1F3AF}",
  "\u{1F4CC}",
  "\u{1F4C5}",
  "\u{1F4F0}",
  "\u{1F399}\uFE0F",
  "\u{1F3AC}",
  "\u{1F3B5}",
  "\u{1F4F8}",
  "\u{1F4A1}",
  "\u{1F4BC}",
  "\u{1F3E0}",
  "\u{1F308}",
  "\u{1F37D}\uFE0F",
  "\u2615",
  "\u{1F3C6}",
  "\u{1F525}",
  "\u2B50",
  "\u2764\uFE0F",
  "\u{1F6E0}\uFE0F",
  "\u{1F4CA}",
  "\u{1F9ED}",
  "\u2708\uFE0F",
  "\u{1F393}",
  "\u{1F4B0}",
  "\u{1F331}",
  "\u{1F3A8}",
  "\u26BD",
  "\u{1F3E5}"
];
var IconPickerModal = class extends import_obsidian.Modal {
  constructor(app, current, onPick, extraIcons = [], extraLabel = "From Iconize") {
    super(app);
    this.query = "";
    this.current = (current != null ? current : "").trim();
    this.onPick = onPick;
    this.extraIcons = extraIcons;
    this.extraLabel = extraLabel;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.addClass("rlt-picker");
    contentEl.createEl("h2", { text: "Pick an icon" });
    const searchWrap = contentEl.createDiv({ cls: "rlt-picker-search" });
    this.input = searchWrap.createEl("input", { cls: "rlt-picker-input" });
    this.input.type = "text";
    this.input.placeholder = "Search icons, or type any emoji / icon name\u2026";
    if (this.current && !LUCIDE_ICONS.includes(this.current) && !EMOJI_ICONS.includes(this.current)) {
      this.input.value = this.current;
      this.query = this.current.toLowerCase();
    }
    this.input.addEventListener("input", () => {
      this.query = this.input.value.trim().toLowerCase();
      this.renderGrids();
    });
    window.setTimeout(() => this.input.focus(), 0);
    contentEl.createEl("div", { cls: "rlt-picker-section", text: "Icons" });
    this.lucideGrid = contentEl.createDiv({ cls: "rlt-icon-grid" });
    this.extraSection = contentEl.createEl("div", { cls: "rlt-picker-section", text: this.extraLabel });
    this.extraGrid = contentEl.createDiv({ cls: "rlt-icon-grid" });
    this.emojiSection = contentEl.createEl("div", { cls: "rlt-picker-section", text: "Emoji" });
    this.emojiGrid = contentEl.createDiv({ cls: "rlt-icon-grid" });
    const footer = contentEl.createDiv({ cls: "rlt-picker-footer" });
    this.customBtn = footer.createEl("button", { cls: "rlt-btn" });
    this.customBtn.addEventListener("click", () => this.pick(this.input.value.trim()));
    const noneBtn = footer.createEl("button", { cls: "rlt-btn", text: "No icon (default)" });
    noneBtn.addEventListener("click", () => this.pick(""));
    this.renderGrids();
  }
  async pick(value) {
    if (this.saving) return;
    this.saving = true;
    try {
      await this.onPick(value);
      this.close();
    } catch (error) {
      new import_obsidian.Notice("Could not save the icon. Please try again.");
      console.error(error);
    } finally {
      this.saving = false;
    }
  }
  renderGrids() {
    const q = this.query;
    this.lucideGrid.empty();
    const names = LUCIDE_ICONS.filter((n) => q === "" || n.includes(q));
    if (names.length === 0) {
      this.lucideGrid.createEl("div", { cls: "rlt-picker-none", text: "No matching icons." });
    }
    for (const name of names) {
      const btn = this.lucideGrid.createEl("button", { cls: "rlt-icon-btn" });
      btn.title = name;
      btn.setAttr("aria-label", name);
      if (name === this.current)
        btn.addClass("is-selected");
      (0, import_obsidian.setIcon)(btn, name);
      btn.addEventListener("click", () => this.pick(name));
    }
    const extras = this.extraIcons.filter(
      (v) => q === "" || isIconName(v) && v.includes(q)
    );
    const showExtras = extras.length > 0;
    this.extraSection.style.display = showExtras ? "" : "none";
    this.extraGrid.style.display = showExtras ? "" : "none";
    if (showExtras) {
      this.extraGrid.empty();
      for (const value of extras.slice(0, 60)) {
        const btn = this.extraGrid.createEl("button", { cls: "rlt-icon-btn" });
        btn.title = value;
        btn.setAttr("aria-label", value);
        if (value === this.current)
          btn.addClass("is-selected");
        if (isIconName(value)) {
          (0, import_obsidian.setIcon)(btn, value);
        } else {
          btn.setText(value);
        }
        btn.addEventListener("click", () => this.pick(value));
      }
    }
    const showEmoji = q === "";
    this.emojiSection.style.display = showEmoji ? "" : "none";
    this.emojiGrid.style.display = showEmoji ? "" : "none";
    if (showEmoji) {
      this.emojiGrid.empty();
      for (const emoji of EMOJI_ICONS) {
        const btn = this.emojiGrid.createEl("button", { cls: "rlt-icon-btn", text: emoji });
        btn.title = emoji;
        btn.setAttr("aria-label", emoji);
        if (emoji === this.current)
          btn.addClass("is-selected");
        btn.addEventListener("click", () => this.pick(emoji));
      }
    }
    const custom = this.input.value.trim();
    this.customBtn.style.display = custom !== "" ? "" : "none";
    this.customBtn.setText(`Use \u201C${custom}\u201D`);
  }
};


// src/types.ts
var READ_LATER_STATUSES = [
  { value: "to-read", label: "To read" },
  { value: "reading", label: "Reading" },
  { value: "done", label: "Done" }
];
var TOPIC_STATUSES = [
  { value: "idea", label: "Idea" },
  { value: "discussing", label: "Discussing" },
  { value: "decided", label: "Decided" },
  { value: "archived", label: "Archived" }
];
var NO_SECTION = "No section";
function labelOf(list, value) {
  var _a, _b;
  return (_b = (_a = list.find((s) => s.value === value)) == null ? void 0 : _a.label) != null ? _b : value;
}
function fmString(fm, key) {
  if (!fm)
    return "";
  const v = fm[key];
  if (v === null || v === void 0)
    return "";
  if (v instanceof Date)
    return toDateString(v);
  return String(v).trim();
}
function toDateString(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function todayString() {
  return toDateString(/* @__PURE__ */ new Date());
}
function fmDate(fm, key) {
  const raw = fmString(fm, key);
  if (!raw)
    return "";
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m)
    return `${m[1]}-${m[2]}-${m[3]}`;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? "" : toDateString(parsed);
}
function prettyDate(iso) {
  if (!iso)
    return "\u2014";
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m)
    return iso;
  return `${months[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}
function yamlScalar(value) {
  if (value === "")
    return '""';
  if (/^[A-Za-z0-9][A-Za-z0-9 _.\-/&'()]*$/.test(value) && !/^(yes|no|true|false|null|~)$/i.test(value)) {
    return value;
  }
  return JSON.stringify(value);
}
function sanitizeFileName(title) {
  const cleaned = title.replace(/[\\/:*?"<>|#^[\]]/g, "").trim();
  return cleaned === "" ? "Untitled" : cleaned;
}

// src/modals.ts
var KIND_LABEL = {
  "read-later": "read-later item",
  topic: "topic"
};
var datalistCounter = 0;
var CreateItemModal = class extends import_obsidian.Modal {
  constructor(app, kind, settings, sections, onCreated, initialSection = "", initialStatus, iconizeIcons = []) {
    super(app);
    this.title = "";
    this.icon = "";
    this.iconizeIcons = iconizeIcons;
    this.url = "";
    this.source = "";
    this.section = "";
    this.owner = "";
    this.status = "";
    this.date = "";
    this.kind = kind;
    this.settings = settings;
    this.sections = sections;
    this.onCreated = onCreated;
    this.section = initialSection;
    this.date = todayString();
    this.status = kind === "read-later" ? "to-read" : "idea";
    if (initialStatus) {
      const valid = (kind === "read-later" ? READ_LATER_STATUSES : TOPIC_STATUSES).map(
        (s) => s.value
      );
      if (valid.includes(initialStatus))
        this.status = initialStatus;
    }
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: `New ${KIND_LABEL[this.kind]}` });
    new import_obsidian.Setting(contentEl).setName("Title").addText((t) => {
      t.setPlaceholder(
        this.kind === "read-later" ? "e.g. The oral history episode that worked" : "e.g. Should interviews be transcribed by AI?"
      );
      t.onChange((v) => this.title = v);
      t.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
          void this.submit();
      });
      window.setTimeout(() => t.inputEl.focus(), 0);
    });
    addIconSetting(this, this.iconizeIcons);
    if (this.kind === "read-later") {
      new import_obsidian.Setting(contentEl).setName("URL").setDesc("Optional \u2014 shown as an Open link on the dashboard.").addText((t) => {
        t.setPlaceholder("https://\u2026");
        t.onChange((v) => this.url = v);
      });
      new import_obsidian.Setting(contentEl).setName("Source").setDesc("Optional \u2014 publication, site, or who sent it.").addText((t) => {
        t.setPlaceholder("e.g. The Atlantic");
        t.onChange((v) => this.source = v);
      });
    }
    const listId = `rlt-sections-${++datalistCounter}`;
    const datalist = contentEl.createEl("datalist");
    datalist.id = listId;
    for (const s of this.sections) {
      const opt = datalist.createEl("option");
      opt.value = s;
    }
    new import_obsidian.Setting(contentEl).setName("Section").setDesc("Groups the item on the dashboard. Pick an existing section or type a new one.").addText((t) => {
      t.setPlaceholder("e.g. Podcast research");
      t.setValue(this.section);
      t.inputEl.setAttribute("list", listId);
      t.onChange((v) => this.section = v);
    });
    if (this.kind === "topic") {
      new import_obsidian.Setting(contentEl).setName("Owner").addText((t) => {
        t.setPlaceholder("Who is driving it? (optional)");
        t.onChange((v) => this.owner = v);
      });
    }
    const statuses = this.kind === "read-later" ? READ_LATER_STATUSES : TOPIC_STATUSES;
    new import_obsidian.Setting(contentEl).setName("Status").addDropdown((d) => {
      for (const s of statuses)
        d.addOption(s.value, s.label);
      d.setValue(this.status);
      d.onChange((v) => this.status = v);
    });
    new import_obsidian.Setting(contentEl).setName(this.kind === "read-later" ? "Added" : "Updated").addText((t) => {
      t.inputEl.type = "date";
      t.setValue(this.date);
      t.onChange((v) => this.date = v);
    });
    new import_obsidian.Setting(contentEl).addButton((b) => {
      b.setButtonText(`Create ${KIND_LABEL[this.kind]}`).setCta().onClick(() => void this.submit());
    });
  }
  folder() {
    return this.kind === "read-later" ? this.settings.readLaterFolder : this.settings.topicsFolder;
  }
  async submit() {
    var _a;
    const title = this.title.trim();
    if (!title) {
      new import_obsidian.Notice("Give it a title first.");
      return;
    }
    const folder = this.folder().replace(/^\/+|\/+$/g, "");
    if (folder && !await this.app.vault.adapter.exists(folder)) {
      await this.app.vault.createFolder(folder);
    }
    const base = sanitizeFileName(title);
    let path = folder ? `${folder}/${base}.md` : `${base}.md`;
    let n = 2;
    while (await this.app.vault.adapter.exists(path)) {
      path = folder ? `${folder}/${base} ${n}.md` : `${base} ${n}.md`;
      n += 1;
    }
    const lines = ["---"];
    if (this.icon.trim())
      lines.push(`icon: ${yamlScalar(this.icon.trim())}`);
    if (this.kind === "read-later" && this.url.trim())
      lines.push(`url: ${yamlScalar(this.url.trim())}`);
    if (this.section.trim())
      lines.push(`section: ${yamlScalar(this.section.trim())}`);
    lines.push(`status: ${this.status}`);
    if (this.kind === "read-later") {
      if (this.date)
        lines.push(`added: ${this.date}`);
      if (this.source.trim())
        lines.push(`source: ${yamlScalar(this.source.trim())}`);
    } else {
      if (this.owner.trim())
        lines.push(`owner: ${yamlScalar(this.owner.trim())}`);
      if (this.date)
        lines.push(`updated: ${this.date}`);
    }
    lines.push("---", "", `# ${title}`, "");
    const file = await this.app.vault.create(path, lines.join("\n"));
    this.close();
    new import_obsidian.Notice(`Created ${KIND_LABEL[this.kind]}: ${title}`);
    (_a = this.onCreated) == null ? void 0 : _a.call(this);
    await this.app.workspace.getLeaf(false).openFile(file);
  }
};

function addIconSetting(modal, extras) {
  const setting = new import_obsidian.Setting(modal.contentEl).setName("Icon").setDesc("Choose an emoji or Lucide icon. Optional.");
  const preview = setting.controlEl.createSpan({ cls: "rlt-icon-preview" });
  const refresh = () => { preview.empty(); renderIconInto(preview, modal.icon); };
  refresh();
  setting.addButton((b) => b.setButtonText("Choose icon").onClick(() => {
    new IconPickerModal(modal.app, modal.icon, (value) => { modal.icon = value; refresh(); }, extras).open();
  }));
}
var CreateSectionModal = class extends import_obsidian.Modal {
  constructor(plugin, extras) {
    super(plugin.app);
    this.plugin = plugin;
    this.extras = extras;
    this.name = "";
    this.icon = "";
    this.saving = false;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.createEl("h2", { text: "New section" });
    new import_obsidian.Setting(this.contentEl).setName("Section name").addText((t) => {
      t.setPlaceholder("e.g. Podcast research").onChange((v) => this.name = v);
      t.inputEl.addEventListener("keydown", (e) => { if (e.key === "Enter") void this.submit(); });
      window.setTimeout(() => t.inputEl.focus(), 0);
    });
    addIconSetting(this, this.extras);
    new import_obsidian.Setting(this.contentEl).addButton((b) => b.setButtonText("Create section").setCta().onClick(() => void this.submit()));
  }
  async submit() {
    const name = this.name.trim();
    if (!name) { new import_obsidian.Notice("Give the section a name first."); return; }
    if (loadData(this.app, this.plugin.settings).sections.some((s) => s.toLowerCase() === name.toLowerCase())) {
      new import_obsidian.Notice("That section already exists."); return;
    }
    if (this.saving) return;
    this.saving = true;
    const previous = this.plugin.settings;
    this.plugin.settings = { ...previous, sections: [...previous.sections, name], sectionIcons: { ...previous.sectionIcons, [name]: this.icon.trim() } };
    try {
      await this.plugin.saveSettings();
      this.plugin.rerenderDashboards();
      this.close();
      new import_obsidian.Notice(`Created section: ${name}`);
    } catch (error) {
      this.plugin.settings = previous;
      this.saving = false;
      new import_obsidian.Notice("Could not save the section. Please try again.");
      console.error(error);
    }
  }
};

// src/store.ts
var DEFAULT_SETTINGS = {
  readLaterFolder: "Read Later",
  topicsFolder: "Topics",
  showStartupNotice: true,
  useIconizeIcons: true,
  sections: [],
  sectionIcons: {},
  accentColor: "#C11A18"
};
function inFolder(path, folder) {
  const f = folder.replace(/^\/+|\/+$/g, "");
  if (f === "")
    return !path.includes("/");
  return path.startsWith(f + "/");
}
function oneOf(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}
var READ_LATER_ORDER = ["reading", "to-read", "done"];
var TOPIC_ORDER = ["discussing", "idea", "decided", "archived"];
function loadData(app, settings) {
  var _a;
  const files = app.vault.getMarkdownFiles();
  const readLater = [];
  const topics = [];
  for (const file of files) {
    const fm = (_a = app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
    if (inFolder(file.path, settings.readLaterFolder)) {
      readLater.push({
        file,
        title: fmString(fm, "title") || file.basename,
        icon: fmString(fm, "icon"),
        url: fmString(fm, "url"),
        section: fmString(fm, "section"),
        status: oneOf(
          fmString(fm, "status").toLowerCase(),
          ["to-read", "reading", "done"],
          "to-read"
        ),
        added: fmDate(fm, "added"),
        source: fmString(fm, "source")
      });
    } else if (inFolder(file.path, settings.topicsFolder)) {
      topics.push({
        file,
        title: fmString(fm, "title") || file.basename,
        icon: fmString(fm, "icon"),
        section: fmString(fm, "section"),
        status: oneOf(
          fmString(fm, "status").toLowerCase(),
          ["idea", "discussing", "decided", "archived"],
          "idea"
        ),
        owner: fmString(fm, "owner"),
        updated: fmDate(fm, "updated")
      });
    }
  }
  const byDateDesc = (a, b) => a === b ? 0 : a === "" ? 1 : b === "" ? -1 : a < b ? 1 : -1;
  readLater.sort((a, b) => {
    const d = READ_LATER_ORDER.indexOf(a.status) - READ_LATER_ORDER.indexOf(b.status);
    if (d !== 0)
      return d;
    const dd = byDateDesc(a.added, b.added);
    return dd !== 0 ? dd : a.title.localeCompare(b.title);
  });
  topics.sort((a, b) => {
    const d = TOPIC_ORDER.indexOf(a.status) - TOPIC_ORDER.indexOf(b.status);
    if (d !== 0)
      return d;
    const dd = byDateDesc(a.updated, b.updated);
    return dd !== 0 ? dd : a.title.localeCompare(b.title);
  });
  const sections = Array.from(
    new Set(
      [...(settings.sections || []), ...[...readLater, ...topics].map((i) => i.section)].filter((s) => typeof s === "string" && s !== "")
    )
  ).sort((a, b) => a.localeCompare(b));
  return { readLater, topics, sections };
}
function groupBySection(items) {
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const key = item.section;
    const list = groups.get(key);
    if (list)
      list.push(item);
    else
      groups.set(key, [item]);
  }
  const sorted = /* @__PURE__ */ new Map();
  const keys = Array.from(groups.keys()).sort((a, b) => {
    if (a === b)
      return 0;
    if (a === "")
      return 1;
    if (b === "")
      return -1;
    return a.localeCompare(b);
  });
  for (const key of keys)
    sorted.set(key, groups.get(key));
  return sorted;
}

// src/view.ts
var import_obsidian2 = require("obsidian");

// src/iconize.ts
var EMPTY = { byPath: /* @__PURE__ */ new Map(), allIcons: [] };
function camelToKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2").toLowerCase();
}
function normalizeIconizeValue(raw) {
  var _a, _b;
  let value = "";
  if (typeof raw === "string") {
    value = raw.trim();
  } else if (raw && typeof raw === "object") {
    const obj = raw;
    const candidate = (_b = (_a = obj.icon) != null ? _a : obj.name) != null ? _b : obj.iconName;
    if (typeof candidate === "string")
      value = candidate.trim();
  }
  if (value === "")
    return "";
  if (value.startsWith("<") || value.startsWith("data:"))
    return "";
  const sep = Math.max(value.lastIndexOf(":"), value.lastIndexOf("/"));
  if (sep >= 0)
    value = value.slice(sep + 1);
  if (value === "")
    return "";
  if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value))
    return value;
  if (!/^[A-Za-z0-9]+$/.test(value))
    return value;
  const stripped = /^[A-Z][a-z][A-Z]/.test(value) ? value.slice(2) : value;
  return camelToKebab(stripped);
}
function collectEntries(source, into) {
  for (const [key, raw] of Object.entries(source)) {
    if (key === "settings" || key === "settingsData")
      continue;
    if (typeof raw !== "string" && !(raw && typeof raw === "object"))
      continue;
    const icon = normalizeIconizeValue(raw);
    if (icon !== "")
      into.set(key, icon);
  }
}
async function loadIconizeIcons(app) {
  const path = `${app.vault.configDir}/plugins/obsidian-icon-folder/data.json`;
  try {
    if (!await app.vault.adapter.exists(path))
      return EMPTY;
    const text = await app.vault.adapter.read(path);
    const parsed = JSON.parse(text);
    if (!parsed || typeof parsed !== "object")
      return EMPTY;
    const root = parsed;
    const byPath = /* @__PURE__ */ new Map();
    collectEntries(root, byPath);
    const nested = root.icons;
    if (nested && typeof nested === "object" && !Array.isArray(nested)) {
      collectEntries(nested, byPath);
    }
    const allIcons = [...new Set(byPath.values())];
    return { byPath, allIcons };
  } catch (e) {
    return EMPTY;
  }
}

// src/view.ts
var VIEW_TYPE = "rlt-dashboard";
function readLaterChip(status) {
  return status === "done" ? "good" : status === "reading" ? "info" : "muted";
}
function topicChip(status) {
  return status === "decided" ? "good" : status === "discussing" ? "info" : status === "idea" ? "warn" : "muted";
}
var NO_SECTION_FILTER = "__none__";
// Compare displayed values without mutating the vault-derived arrays. Missing and
// invalid dates stay last in either direction; equal values retain input order.
var RLT_SORT_COLLATOR = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortTableItems(items, state, valueOf) {
  if (!state) return items;
  const normalized = (item) => {
    const value = valueOf(item, state.key);
    if (value == null || String(value).trim() === "") return null;
    if (state.key === "added" || state.key === "updated") {
      const timestamp = Date.parse(String(value));
      return Number.isFinite(timestamp) ? timestamp : null;
    }
    return typeof value === "number" && Number.isFinite(value) ? value : String(value).trim();
  };
  return items.map((item, index) => ({ item, index, value: normalized(item) }))
    .sort((a, b) => {
      if (a.value === null || b.value === null)
        return a.value === b.value ? a.index - b.index : a.value === null ? 1 : -1;
      const comparison = typeof a.value === "number" && typeof b.value === "number"
        ? a.value - b.value : RLT_SORT_COLLATOR.compare(String(a.value), String(b.value));
      return comparison === 0 ? a.index - b.index : comparison * (state.direction === "asc" ? 1 : -1);
    }).map((entry) => entry.item);
}
var DashboardView = class extends import_obsidian2.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.refreshTimer = null;
    this.searchQuery = "";
    this.sectionFilter = "";
    this.showFinished = false;
    this.tableSorts = Object.create(null);
    this.iconizeData = null;
    this.plugin = plugin;
  }
  getViewType() {
    return VIEW_TYPE;
  }
  getDisplayText() {
    return "Read Later & Topics";
  }
  getIcon() {
    return "book-open";
  }
  async onOpen() {
    const schedule = () => {
      if (this.refreshTimer !== null)
        window.clearTimeout(this.refreshTimer);
      this.refreshTimer = window.setTimeout(() => void this.render(), 250);
    };
    this.registerEvent(this.app.metadataCache.on("changed", schedule));
    this.registerEvent(this.app.vault.on("create", schedule));
    this.registerEvent(this.app.vault.on("delete", schedule));
    this.registerEvent(this.app.vault.on("rename", schedule));
    await this.render();
  }
  matches(item) {
    var _a, _b;
    if (this.sectionFilter) {
      const ok = this.sectionFilter === NO_SECTION_FILTER ? item.section === "" : item.section === this.sectionFilter;
      if (!ok)
        return false;
    }
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      const hay = [item.title, item.section, (_a = item.source) != null ? _a : "", (_b = item.owner) != null ? _b : ""].join(" ").toLowerCase();
      if (!hay.includes(q))
        return false;
    }
    return true;
  }
  async render() {
    const activeEl = document.activeElement;
    const searchHadFocus = activeEl instanceof HTMLInputElement && activeEl.classList.contains("rlt-search");
    const caret = searchHadFocus ? activeEl.selectionStart : null;
    const data = loadData(this.app, this.plugin.settings);
    const root = this.contentEl;
    root.empty();
    root.addClass("rlt-root");
    root.style.setProperty("--rlt-accent", this.plugin.settings.accentColor || "#C11A18");
    this.iconizeData = this.plugin.settings.useIconizeIcons ? await loadIconizeIcons(this.app) : null;
    const activeReadLater = data.readLater.filter((i) => i.status !== "done");
    const activeTopics = data.topics.filter((t) => t.status !== "archived");
    const visReadLater = activeReadLater.filter((i) => this.matches(i));
    const visTopics = activeTopics.filter((t) => this.matches(t));
    this.renderHeader(root);
    this.renderStats(root, data);
    this.renderToolbar(root, data, searchHadFocus, caret);
    this.renderSections(root, visReadLater, visTopics, data);
    this.renderFinished(root, data);
  }
  el(parent, tag, cls, text) {
    const node = parent.createEl(tag, cls ? { cls } : void 0);
    if (text !== void 0)
      node.setText(text);
    return node;
  }
  /** A status chip that opens a menu to change the status in place. */
  editableChip(parent, text, tone, options, current, file) {
    const chip = this.el(parent, "span", `rlt-chip rlt-chip--${tone} rlt-chip--editable`, text);
    chip.title = "Click to change status";
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = new import_obsidian2.Menu();
      for (const opt of options) {
        menu.addItem((item) => {
          item.setTitle(opt.label);
          item.setChecked(opt.value === current);
          item.onClick(() => void this.setStatus(file, opt.value));
        });
      }
      menu.showAtMouseEvent(e);
    });
  }
  openFile(file) {
    void this.app.workspace.getLeaf(false).openFile(file);
  }
  async setStatus(file, status) {
    await this.app.fileManager.processFrontMatter(file, (fm) => {
      fm.status = status;
    });
    void this.render();
  }
  renderHeader(root) {
    const head = this.el(root, "div", "rlt-header");
    const left = this.el(head, "div", "rlt-header-left");
    this.el(left, "div", "rlt-eyebrow", "Library");
    this.el(left, "h2", "rlt-title", "Read Later & Topics");
    const now = /* @__PURE__ */ new Date();
    this.el(
      left,
      "div",
      "rlt-subtitle",
      now.toLocaleDateString(void 0, { weekday: "short", month: "short", day: "numeric", year: "numeric" })
    );
    const actions = this.el(head, "div", "rlt-header-actions");
    const sectionBtn = this.el(actions, "button", "rlt-btn", "+ New Section");
    sectionBtn.addEventListener("click", () => void this.plugin.openSectionModal());
    const topicBtn = this.el(actions, "button", "rlt-btn", "+ New topic");
    topicBtn.addEventListener("click", () => this.plugin.openCreateModal("topic"));
    const add = this.el(actions, "button", "rlt-btn rlt-btn--cta", "+ New read-later item");
    add.addEventListener("click", () => this.plugin.openCreateModal("read-later"));
  }
  renderStats(root, data) {
    const row = this.el(root, "div", "rlt-stats");
    const toRead = data.readLater.filter((i) => i.status === "to-read").length;
    const reading = data.readLater.filter((i) => i.status === "reading").length;
    const done = data.readLater.filter((i) => i.status === "done").length;
    const topicsOpen = data.topics.filter(
      (t) => t.status === "idea" || t.status === "discussing"
    ).length;
    const decided = data.topics.filter((t) => t.status === "decided").length;
    const cards = [
      {
        label: "To read",
        value: String(toRead),
        sub: `${data.readLater.length} saved in total`,
        alert: toRead > 0
      },
      {
        label: "Reading now",
        value: String(reading),
        sub: `${done} finished`
      },
      {
        label: "Topics open",
        value: String(topicsOpen),
        sub: `${data.topics.length} topics \xB7 ${decided} decided`
      },
      {
        label: "Sections",
        value: String(data.sections.length),
        sub: data.sections.length ? data.sections.slice(0, 3).join(" \xB7 ") : "No sections yet"
      }
    ];
    for (const c of cards) {
      const card = this.el(row, "div", "rlt-stat" + (c.alert ? " rlt-stat--alert" : ""));
      this.el(card, "div", "rlt-stat-value", c.value);
      this.el(card, "div", "rlt-stat-label", c.label);
      this.el(card, "div", "rlt-stat-sub", c.sub);
    }
  }
  renderToolbar(root, data, searchHadFocus, caret) {
    const bar = this.el(root, "div", "rlt-toolbar");
    const search = this.el(bar, "input", "rlt-search");
    search.type = "text";
    search.placeholder = "Search titles, sections, sources, owners\u2026";
    search.value = this.searchQuery;
    search.addEventListener("input", () => {
      this.searchQuery = search.value;
      if (this.refreshTimer !== null)
        window.clearTimeout(this.refreshTimer);
      this.refreshTimer = window.setTimeout(() => void this.render(), 200);
    });
    if (searchHadFocus) {
      search.focus();
      if (caret !== null)
        search.setSelectionRange(caret, caret);
    }
    const select = this.el(bar, "select", "rlt-filter");
    const all = select.createEl("option", { text: "All sections" });
    all.value = "";
    for (const s of data.sections) {
      const o = select.createEl("option", { text: s });
      o.value = s;
    }
    const none = select.createEl("option", { text: NO_SECTION });
    none.value = NO_SECTION_FILTER;
    select.value = this.sectionFilter;
    select.addEventListener("change", () => {
      this.sectionFilter = select.value;
      void this.render();
    });
  }
  renderIconInto(parent, value) {
    return renderIconInto(parent, value);
  }
  editableIcon(parent, value, onPick) {
    const button = parent.createEl("button", { cls: "rlt-icon-edit", attr: { "aria-label": "Change icon", title: "Change icon" } });
    this.renderIconInto(button, value);
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      new IconPickerModal(this.app, value, onPick, this.iconizeData ? this.iconizeData.allIcons : []).open();
    });
  }
  renderItemTitle(parent, item) {
    const value = item.icon || (this.iconizeData && this.iconizeData.byPath.get(item.file.path)) || "";
    this.editableIcon(parent, value, async (icon) => {
      await this.app.fileManager.processFrontMatter(item.file, (fm) => {
        if (icon) fm.icon = icon;
        else delete fm.icon;
      });
      this.plugin.rerenderDashboards();
    });
    parent.createSpan({ text: item.title });
  }
  /**
   * The Iconize icon for a section, if any. A section maps to the folder of
   * the same name inside the read-later folder first, then the topics
   * folder, then a vault-root folder of that name.
   */
  sectionIcon(section) {
    if (Object.prototype.hasOwnProperty.call(this.plugin.settings.sectionIcons, section))
      return this.plugin.settings.sectionIcons[section];
    if (!this.iconizeData || section === "")
      return "";
    const { readLaterFolder, topicsFolder } = this.plugin.settings;
    const candidates = [
      `${readLaterFolder}/${section}`,
      `${topicsFolder}/${section}`,
      section
    ];
    for (const path of candidates) {
      const icon = this.iconizeData.byPath.get(path);
      if (icon)
        return icon;
    }
    return "";
  }
  sortedItems(items, tableType) {
    return sortTableItems(items, this.tableSorts[tableType], (row, key) => {
      const item = tableType === "finished" ? row.item : row;
      if (key === "type") return row.type;
      if (key === "status") return labelOf(tableType === "topics" || row.type === "Topic" ? TOPIC_STATUSES : READ_LATER_STATUSES, item.status);
      return item[key];
    });
  }
  table(root, headers, tableType, keys) {
    const table = this.el(root, "table", "rlt-table");
    const thead = table.createEl("thead");
    const tr = thead.createEl("tr");
    for (let index = 0; index < headers.length; index++) {
      const h = headers[index];
      const key = keys[index];
      const th = tr.createEl("th");
      th.setAttr("scope", "col");
      const state = this.tableSorts[tableType];
      const active = state && state.key === key;
      th.setAttr("aria-sort", active ? (state.direction === "asc" ? "ascending" : "descending") : "none");
      const button = th.createEl("button", { cls: "rlt-sort-header", text: h });
      button.setAttr("type", "button");
      button.setAttr("aria-label", `Sort by ${h}, ${active && state.direction === "asc" ? "descending" : "ascending"}`);
      button.createSpan({ cls: "rlt-sort-arrow", text: active ? (state.direction === "asc" ? " \u2191" : " \u2193") : " \u2195" }).setAttr("aria-hidden", "true");
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        const position = Array.from(this.contentEl.querySelectorAll(".rlt-table")).indexOf(table);
        this.tableSorts[tableType] = { key, direction: active && state.direction === "asc" ? "desc" : "asc" };
        void this.render().then(() => {
          // Restore keyboard focus to the same header after rebuilding the view.
          const replacement = this.contentEl.querySelectorAll(".rlt-table")[position];
          replacement?.querySelector(`button[data-rlt-sort="${tableType}-${key}"]`)?.focus({ preventScroll: true });
        });
      });
      button.setAttr("data-rlt-sort", `${tableType}-${key}`);
    }
    return table.createEl("tbody");
  }
  renderSections(root, readLater, topics, data) {
    var _a, _b;
    const visibleSections = data.sections.filter((section) => this.matches({ section, title: "" }));
    if (data.readLater.length === 0 && data.topics.length === 0 && visibleSections.length === 0) {
      const box = this.el(root, "div", "rlt-section");
      this.el(
        box,
        "div",
        "rlt-empty-block",
        `Nothing tracked yet. Add notes in \u201C${this.plugin.settings.readLaterFolder}\u201D and \u201C${this.plugin.settings.topicsFolder}\u201D, or use the New buttons above.`
      );
      return;
    }
    if (readLater.length === 0 && topics.length === 0 && visibleSections.length === 0) {
      const box = this.el(root, "div", "rlt-section");
      this.el(box, "div", "rlt-empty-block", "No items match the current search/filter.");
      return;
    }
    const rlGroups = groupBySection(readLater);
    const topicGroups = groupBySection(topics);
    const keys = Array.from(/* @__PURE__ */ new Set([...visibleSections, ...rlGroups.keys(), ...topicGroups.keys()])).sort(
      (a, b) => {
        if (a === b)
          return 0;
        if (a === "")
          return 1;
        if (b === "")
          return -1;
        return a.localeCompare(b);
      }
    );
    for (const key of keys) {
      const rl = (_a = rlGroups.get(key)) != null ? _a : [];
      const tp = (_b = topicGroups.get(key)) != null ? _b : [];
      const group = this.el(root, "div", "rlt-group");
      const head = this.el(group, "div", "rlt-group-head");
      const icon = this.sectionIcon(key);
      if (key) {
        this.editableIcon(head, icon, async (value) => {
          const previous = this.plugin.settings.sectionIcons;
          this.plugin.settings.sectionIcons = { ...previous, [key]: value };
          try { await this.plugin.saveSettings(); }
          catch (error) { this.plugin.settings.sectionIcons = previous; new import_obsidian.Notice("Could not save the icon."); console.error(error); }
          this.plugin.rerenderDashboards();
        });
      }
      this.el(head, "h3", "rlt-group-title", key === "" ? NO_SECTION : key);
      this.el(
        head,
        "span",
        "rlt-section-count",
        `${rl.length} to read \xB7 ${tp.length} topic${tp.length === 1 ? "" : "s"}`
      );
      const addRl = this.el(head, "button", "rlt-btn rlt-btn--small rlt-group-add", "+ Read later");
      addRl.addEventListener(
        "click",
        () => this.plugin.openCreateModal("read-later", key)
      );
      const addTp = this.el(head, "button", "rlt-btn rlt-btn--small", "+ Topic");
      addTp.addEventListener("click", () => this.plugin.openCreateModal("topic", key));
      if (rl.length === 0 && tp.length === 0)
        this.el(group, "div", "rlt-empty-block", "No active items. Add a read-later item or topic above.");
      if (rl.length > 0) {
        this.el(group, "div", "rlt-subhead", "Read later");
        const tbody = this.table(group, ["Title", "Source", "Status", "Added", "Link"], "readLater", ["title", "source", "status", "added", "url"]);
        for (const item of this.sortedItems(rl, "readLater"))
          this.renderReadLaterRow(tbody, item);
      }
      if (tp.length > 0) {
        this.el(group, "div", "rlt-subhead", "Topics");
        const tbody = this.table(group, ["Title", "Owner", "Status", "Updated"], "topics", ["title", "owner", "status", "updated"]);
        for (const topic of this.sortedItems(tp, "topics"))
          this.renderTopicRow(tbody, topic);
      }
    }
  }
  renderReadLaterRow(tbody, item) {
    const tr = tbody.createEl("tr", { cls: "rlt-row" });
    tr.addEventListener("click", () => this.openFile(item.file));
    this.renderItemTitle(tr.createEl("td", { cls: "rlt-cell-title" }), item);
    tr.createEl("td", { text: item.source || "\u2014" });
    const statusTd = tr.createEl("td");
    this.editableChip(
      statusTd,
      labelOf(READ_LATER_STATUSES, item.status),
      readLaterChip(item.status),
      READ_LATER_STATUSES,
      item.status,
      item.file
    );
    tr.createEl("td", { text: prettyDate(item.added) });
    const linkTd = tr.createEl("td");
    if (!item.url) {
      linkTd.setText("\u2014");
    } else if (/^https?:\/\//.test(item.url)) {
      const a = linkTd.createEl("a", { cls: "rlt-link", text: "Open \u2197" });
      a.href = item.url;
      a.setAttr("target", "_blank");
      a.setAttr("rel", "noopener");
      a.addEventListener("click", (e) => e.stopPropagation());
    } else {
      linkTd.setText(item.url);
    }
  }
  renderTopicRow(tbody, topic) {
    const tr = tbody.createEl("tr", { cls: "rlt-row" });
    tr.addEventListener("click", () => this.openFile(topic.file));
    this.renderItemTitle(tr.createEl("td", { cls: "rlt-cell-title" }), topic);
    tr.createEl("td", { text: topic.owner || "\u2014" });
    const statusTd = tr.createEl("td");
    this.editableChip(
      statusTd,
      labelOf(TOPIC_STATUSES, topic.status),
      topicChip(topic.status),
      TOPIC_STATUSES,
      topic.status,
      topic.file
    );
    tr.createEl("td", { text: prettyDate(topic.updated) });
  }
  renderFinished(root, data) {
    const rows = [
      ...data.readLater.filter((i) => i.status === "done").map((i) => ({ type: "Read later", item: i, status: i.status })),
      ...data.topics.filter((t) => t.status === "archived").map((t) => ({ type: "Topic", item: t, status: t.status }))
    ];
    const shown = rows.filter((r) => this.matches(r.item));
    if (rows.length === 0)
      return;
    const section = this.el(root, "div", "rlt-section");
    const toggle = this.el(
      section,
      "button",
      "rlt-btn rlt-finished-toggle",
      `${this.showFinished ? "\u25BE" : "\u25B8"} Finished (${rows.length})`
    );
    toggle.addEventListener("click", () => {
      this.showFinished = !this.showFinished;
      void this.render();
    });
    if (!this.showFinished)
      return;
    const tbody = this.table(section, ["Type", "Title", "Section", "Status"], "finished", ["type", "title", "section", "status"]);
    if (shown.length === 0) {
      const tr = tbody.createEl("tr");
      const td = tr.createEl("td", { cls: "rlt-empty", text: "No finished items match the current search/filter." });
      td.colSpan = 4;
      return;
    }
    for (const r of this.sortedItems(shown, "finished")) {
      const tr = tbody.createEl("tr", { cls: "rlt-row" });
      tr.addEventListener("click", () => this.openFile(r.item.file));
      tr.createEl("td", { text: r.type });
      this.renderItemTitle(tr.createEl("td", { cls: "rlt-cell-title" }), r.item);
      tr.createEl("td", { text: r.item.section || NO_SECTION });
      tr.createEl("td", {
        text: r.type === "Read later" ? labelOf(READ_LATER_STATUSES, r.status) : labelOf(TOPIC_STATUSES, r.status)
      });
    }
  }
};

// src/main.ts
var RLTPlugin = class extends import_obsidian3.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.notifiedThisSession = false;
  }
  async onload() {
    await this.loadSettings();
    this.registerView(VIEW_TYPE, (leaf) => new DashboardView(leaf, this));
    this.addRibbonIcon("book-open", "Open Read Later & Topics dashboard", () => {
      void this.activateView();
    });
    this.addCommand({
      id: "open-dashboard",
      name: "Open dashboard",
      callback: () => void this.activateView()
    });
    this.addCommand({
      id: "new-read-later-item",
      name: "New read-later item",
      callback: () => this.openCreateModal("read-later")
    });
    this.addCommand({
      id: "new-topic",
      name: "New topic",
      callback: () => this.openCreateModal("topic")
    });
    this.addCommand({ id: "new-section", name: "New section", callback: () => void this.openSectionModal() });
    this.addSettingTab(new RLTSettingTab(this));
    this.app.workspace.onLayoutReady(() => {
      void this.notifySummary();
    });
  }
  /** One quiet notice per session: how much is waiting to be read / discussed. */
  async notifySummary() {
    if (!this.settings.showStartupNotice || this.notifiedThisSession)
      return;
    this.notifiedThisSession = true;
    const data = loadData(this.app, this.settings);
    const toRead = data.readLater.filter((i) => i.status === "to-read").length;
    const reading = data.readLater.filter((i) => i.status === "reading").length;
    const topicsOpen = data.topics.filter(
      (t) => t.status === "idea" || t.status === "discussing"
    ).length;
    const parts = [];
    if (toRead)
      parts.push(`${toRead} to read`);
    if (reading)
      parts.push(`${reading} in progress`);
    if (topicsOpen)
      parts.push(`${topicsOpen} topic${topicsOpen === 1 ? "" : "s"} open`);
    if (parts.length > 0) {
      new import_obsidian3.Notice(`Read Later & Topics: ${parts.join(" \xB7 ")}.`, 9e3);
    }
  }
  async activateView() {
    var _a;
    const { workspace } = this.app;
    let leaf = (_a = workspace.getLeavesOfType(VIEW_TYPE)[0]) != null ? _a : null;
    if (!leaf) {
      leaf = workspace.getLeaf("tab");
      await leaf.setViewState({ type: VIEW_TYPE, active: true });
    }
    void workspace.revealLeaf(leaf);
  }
  async openSectionModal() {
    const icons = this.settings.useIconizeIcons ? await loadIconizeIcons(this.app) : EMPTY;
    new CreateSectionModal(this, icons.allIcons).open();
  }
  async openCreateModal(kind, initialSection = "") {
    const icons = this.settings.useIconizeIcons ? await loadIconizeIcons(this.app) : EMPTY;
    const sections = loadData(this.app, this.settings).sections;
    new CreateItemModal(this.app, kind, this.settings, sections, () => {
      this.rerenderDashboards();
    }, initialSection, void 0, icons.allIcons).open();
  }
  /** Re-render every open dashboard (after a settings change, a create, …). */
  rerenderDashboards() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE)) {
      const view = leaf.view;
      if (view instanceof DashboardView)
        void view.render();
    }
  }
  async loadSettings() {
    const saved = await this.loadData();
    this.settings = { ...DEFAULT_SETTINGS, ...saved != null ? saved : {} };
    this.settings.sections = Array.isArray(this.settings.sections) ? [...new Set(this.settings.sections.filter((v) => typeof v === "string").map((v) => v.trim()).filter(Boolean))] : [];
    this.settings.sectionIcons = this.settings.sectionIcons && typeof this.settings.sectionIcons === "object" && !Array.isArray(this.settings.sectionIcons) ? Object.fromEntries(Object.entries(this.settings.sectionIcons).filter(([, v]) => typeof v === "string")) : {};
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var RLTSettingTab = class extends import_obsidian3.PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Read Later & Topics" });
    containerEl.createEl("p", {
      text: "Items are plain notes with frontmatter. Read-later items live in one folder, topics in another, and both are grouped on the dashboard by their section: frontmatter."
    });
    new import_obsidian3.Setting(containerEl).setName("Read-later folder").addText((t) => {
      t.setValue(this.plugin.settings.readLaterFolder);
      t.onChange(async (v) => {
        this.plugin.settings.readLaterFolder = v.trim() || "Read Later";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian3.Setting(containerEl).setName("Topics folder").addText((t) => {
      t.setValue(this.plugin.settings.topicsFolder);
      t.onChange(async (v) => {
        this.plugin.settings.topicsFolder = v.trim() || "Topics";
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian3.Setting(containerEl).setName("Startup notice").setDesc(
      "Once per Obsidian session, show a short notice with the to-read and open-topic counts."
    ).addToggle((t) => {
      t.setValue(this.plugin.settings.showStartupNotice);
      t.onChange(async (v) => {
        this.plugin.settings.showStartupNotice = v;
        await this.plugin.saveSettings();
      });
    });
    new import_obsidian3.Setting(containerEl).setName("Section icons from Iconize").setDesc(
      "Use Iconize icons for notes and section folders when no custom icon is assigned. Icons used in Iconize also appear in the picker. A section looks up the folder of the same name inside the read-later folder, then the topics folder, then the vault root."
    ).addToggle((t) => {
      t.setValue(this.plugin.settings.useIconizeIcons);
      t.onChange(async (v) => {
        this.plugin.settings.useIconizeIcons = v;
        await this.plugin.saveSettings();
        this.plugin.rerenderDashboards();
      });
    });
    new import_obsidian3.Setting(containerEl).setName("Spot color").setDesc("The dashboard's accent: header rules, the primary button, and alerts.").addColorPicker((c) => {
      c.setValue(this.plugin.settings.accentColor);
      c.onChange(async (v) => {
        this.plugin.settings.accentColor = v;
        await this.plugin.saveSettings();
        this.plugin.rerenderDashboards();
      });
    }).addButton((b) => {
      b.setButtonText("Reset to Intown red");
      b.onClick(async () => {
        this.plugin.settings.accentColor = "#C11A18";
        await this.plugin.saveSettings();
        this.plugin.rerenderDashboards();
        this.display();
      });
    });
    const presets = [
      { name: "Intown red", hex: "#C11A18" },
      { name: "Blue", hex: "#2563EB" },
      { name: "Teal", hex: "#0F766E" },
      { name: "Green", hex: "#2E7D32" },
      { name: "Purple", hex: "#7C3AED" },
      { name: "Orange", hex: "#E8590C" },
      { name: "Pink", hex: "#D6336C" }
    ];
    const swatchRow = containerEl.createDiv({ cls: "rlt-swatches" });
    swatchRow.createSpan({ text: "Presets:", cls: "rlt-swatches-label" });
    for (const p of presets) {
      const btn = swatchRow.createEl("button", {
        cls: "rlt-swatch" + (this.plugin.settings.accentColor.toLowerCase() === p.hex.toLowerCase() ? " rlt-swatch--active" : "")
      });
      btn.style.background = p.hex;
      btn.title = `${p.name} (${p.hex})`;
      btn.setAttr("aria-label", p.name);
      btn.addEventListener("click", async () => {
        this.plugin.settings.accentColor = p.hex;
        await this.plugin.saveSettings();
        this.plugin.rerenderDashboards();
        this.display();
      });
    }
    containerEl.createEl("h3", { text: "Frontmatter reference" });
    const pre = containerEl.createEl("pre", { cls: "rlt-settings-pre" });
    pre.setText(
      [
        "Read-later note:",
        "  url: https://example.com/article   (optional; shown as an Open link)",
        "  icon: book-open                     (optional; emoji or Lucide name)",
        "  section: Podcast research",
        "  status: to-read | reading | done",
        "  added: 2026-10-22                  (optional)",
        "  source: The Atlantic                (optional)",
        "",
        "Topic note:",
        "  icon: book-open                     (optional; emoji or Lucide name)",
        "  section: Podcast research",
        "  status: idea | discussing | decided | archived",
        "  owner: Tom                          (optional)",
        "  updated: 2026-10-22                 (optional)",
        "",
        "Items sharing a section: value are grouped together on the dashboard;",
        "items with no section land in \u201CNo section\u201D, last."
      ].join("\n")
    );
  }
};
