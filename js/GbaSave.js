export default class GbaSave {
    constructor(saveFile) {
        this.saveFile = saveFile;
        this.reader = saveFile.getReader();

        this.sections = [];
        this.activeSlot = 0;
    }

    load() {
        // Por enquanto, apenas prepara a estrutura.
        // A leitura das 14 sections será implementada no próximo passo.

        this.sections = [];
        this.activeSlot = 0;

        return true;
    }

    getReader() {
        return this.reader;
    }

    getSections() {
        return this.sections;
    }

    getActiveSlot() {
        return this.activeSlot;
    }
}
