// js/core/Section.js
export default class Section {

    static DATA_SIZE = 0x0FF4; // 4084 bytes antes do footer
    static SECTION_SIZE = 0x1000; // 4096 bytes total
    static SIGNATURE = 0x08012025;

    static CHECKSUM_LENGTHS = {
        0: 3884,
        1: 3968,
        2: 3968,
        3: 3968,
        4: 3848,
        5: 3968,
        6: 3968,
        7: 3968,
        8: 3968,
        9: 3968,
        10: 3968,
        11: 3968,
        12: 3968,
        13: 2000,
    };

    constructor(index, offset) {
        this.index = index;
        this.offset = offset;

        this.data = new Uint8Array(Section.DATA_SIZE);

        this.id = 0;
        this.checksum = 0;
        this.signature = 0;
        this.saveIndex = 0;
        this.loaded = false;
    }

    load(reader) {
        if (!reader || !reader.data) {
            return false;
        }

        if (this.offset + Section.SECTION_SIZE > reader.data.length) {
            return false;
        }

        reader.seek(this.offset);

        for (let i = 0; i < Section.DATA_SIZE; i++) {
            this.data[i] = reader.readU8();
        }

        this.id = reader.readU16();
        this.checksum = reader.readU16();
        this.signature = reader.readU32();
        this.saveIndex = reader.readU32();

        this.loaded = true;
        return true;
    }

    isLoaded() {
        return this.loaded;
    }

    isValidSignature() {
        return this.signature === Section.SIGNATURE;
    }

    getExpectedChecksumSize() {
        return Section.CHECKSUM_LENGTHS[this.id] ?? Section.DATA_SIZE;
    }

    calculateChecksum() {
        const size = this.getExpectedChecksumSize();

        let checksum = 0 >>> 0;

        for (let i = 0; i < size; i += 4) {
            const word =
                (this.data[i]) |
                (this.data[i + 1] << 8) |
                (this.data[i + 2] << 16) |
                (this.data[i + 3] << 24);

            checksum = (checksum + (word >>> 0)) >>> 0;
        }

        checksum = (checksum >>> 16) + (checksum & 0xFFFF);
        checksum = (checksum >>> 16) + (checksum & 0xFFFF);

        return checksum & 0xFFFF;
    }

    isValidChecksum() {
        return this.checksum === this.calculateChecksum();
    }

    isValid() {
        return this.isValidSignature() && this.isValidChecksum();
    }

    getByte(offset) {
        return this.data[offset];
    }

    getU16(offset) {
        return this.data[offset] |
            (this.data[offset + 1] << 8);
    }

    getU32(offset) {
        return (
            this.data[offset] |
            (this.data[offset + 1] << 8) |
            (this.data[offset + 2] << 16) |
            (this.data[offset + 3] << 24)
        ) >>> 0;
    }

}
