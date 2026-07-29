export default class Section {

    constructor(index, offset, id, saveIndex, checksum, signature, data) {

        this.index = index;
        this.offset = offset;
        this.id = id;
        this.saveIndex = saveIndex;
        this.checksum = checksum;
        this.signature = signature;
        this.data = data;

    }

    getByte(offset) {

        return this.data[offset];

    }

    getU16(offset) {

        return this.data[offset] |
            (this.data[offset + 1] << 8);

    }

    getU32(offset) {

        return this.getU16(offset) |
            (this.getU16(offset + 2) << 16);

    }

}
