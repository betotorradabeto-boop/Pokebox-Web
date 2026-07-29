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
        this.invalidSections = [];
    }

    load() {
        this.sections = [];
        this.slotA = [];
        this.slotB = [];
        this.invalidSections = [];
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

            if (!section.load(this.reader)) {
                this.invalidSections.push({ index: i, reason: "load-failed" });
                continue;
            }

            if (!section.isValidSignature()) {
                this.invalidSections.push({ index: i, reason: "bad-signature" });
            }

            this.sections.push(section);
        }

        if (this.sections.length < 28) {
            return false;
        }

        this.slotA = this.sections.slice(0, 14);
        this.slotB = this.sections.slice(14, 28);

        if (this.slotA.length !== 14 || this.slotB.length !== 14) {
            return false;
        }

        const saveIndexA = this.slotA[13]?.saveIndex ?? 0;
        const saveIndexB = this.slotB[13]?.saveIndex ?? 0;

        // Em empate, o Slot B vence.
        this.activeSlot = saveIndexA > saveIndexB ? 0 : 1;

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

    getSection(id) {
        const sections = this.getActiveSlotSections();

        for (const section of sections) {
            if (section.id === id) {
                return section;
            }
        }

        return null;
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
        if (this.activeSlot === 0) {
            return this.slotA;
        }

        if (this.activeSlot === 1) {
            return this.slotB;
        }

        return [];
    }

    getInvalidSections() {
        return this.invalidSections;
    }

}
