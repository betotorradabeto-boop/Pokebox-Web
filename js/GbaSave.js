import Section from "./Section.js";

export default class GbaSave {

    constructor(saveFile) {

        this.saveFile = saveFile;
        this.reader = saveFile.getReader();

        this.sections = [];
        this.activeSlot = -1;
        this.loaded = false;

    }

    load() {

        this.sections = [];

        // FireRed possui 28 sections
        // 14 do Slot A e 14 do Slot B

        for (let i = 0; i < 28; i++) {

            const offset = i * 0x1000;

            this.sections.push(
                new Section(i, offset)
            );

        }

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

    getActiveSlot() {
        return this.activeSlot;
    }

}
