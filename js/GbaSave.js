import Section from "./Section.js";

export default class GbaSave {
    constructor(saveFile) {
        this.saveFile = saveFile;
        this.reader = saveFile.getReader();

        this.sections = [];
        this.slotA = [];
        this.slotB = [];
        this.activeSlot = -1;
        this.loaded = false;
    }

    load() {
        this.sections = [];
        this.slotA = [];
        this.slotB = [];
        this.activeSlot = -1;
        this.loaded = false;

        if (!this.saveFile) {
            return false;
        }

        if (this.saveFile.getSize() < 0x20000) {
            return false;
        }

        for (let i = 0; i < 28; i++) {
            const section = new Section(i, i * 0x1000);
            section.load(this.reader);
            this.sections.push(section);
        }

        this.slotA = this.sections.slice(0, 14);
        this.slotB = this.sections.slice(14, 28);

        const saveIndexA = this.slotA[13]?.saveIndex ?? 0;
        const saveIndexB = this.slotB[13]?.saveIndex ?? 0;

        this.activeSlot = saveIndexA >= saveIndexB ? 0 : 1;
        this.loaded = true;

        return true;
    }

    isLoaded() {
        return this.loaded;
    }

    getReader() {
        return this.reader;
    }

    getSections() {
        return this.sections;
    }

    getSection(index) {
        return this.sections[index];
    }

    getSectionCount() {
        return this.sections.length;
    }

    getSlotA() {
        return this.slotA;
    }

    getSlotB() {
        return this.slotB;
    }

    getActiveSlot() {
        return this.activeSlot;
    }

    getActiveSlotSections() {
        return this.activeSlot === 0 ? this.slotA : this.slotB;
    }
    }
