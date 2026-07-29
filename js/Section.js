export default class Section {

    constructor(id, offset) {

        this.id = id;
        this.offset = offset;

        this.checksum = 0;
        this.signature = 0;
        this.saveIndex = 0;

    }

}
