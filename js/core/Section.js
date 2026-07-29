export default class Section {

    static DATA_SIZE = 0x0FF4;
    static SECTION_SIZE = 0x1000;
    static SIGNATURE = 0x08012025;

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

    //========================
    // LEITURA
    //========================

    getByte(offset) {

        return this.data[offset];

    }

    getU16(offset) {

        return (
            this.data[offset] |
            (this.data[offset + 1] << 8)
        );

    }

    getU32(offset) {

        return (
            this.data[offset] |
            (this.data[offset + 1] << 8) |
            (this.data[offset + 2] << 16) |
            (this.data[offset + 3] << 24)
        ) >>> 0;

    }

    //========================
    // ESCRITA
    //========================

    setByte(offset, value) {

        this.data[offset] = value & 0xFF;

    }

    setU16(offset, value) {

        this.data[offset] = value & 0xFF;
        this.data[offset + 1] = (value >> 8) & 0xFF;

    }

    setU32(offset, value) {

        this.data[offset] = value & 0xFF;
        this.data[offset + 1] = (value >> 8) & 0xFF;
        this.data[offset + 2] = (value >> 16) & 0xFF;
        this.data[offset + 3] = (value >> 24) & 0xFF;

    }

    //========================
    // CHECKSUM
    //========================

    calculateChecksum() {

        let checksum = 0;

        for (let i = 0; i < this.data.length; i += 4) {

            const word =
                this.data[i] |
                (this.data[i + 1] << 8) |
                (this.data[i + 2] << 16) |
                (this.data[i + 3] << 24);

            checksum += word >>> 0;

        }

        checksum =
            (checksum & 0xFFFF) +
            (checksum >>> 16);

        checksum =
            (checksum & 0xFFFF) +
            (checksum >>> 16);

        return checksum & 0xFFFF;

    }

    updateChecksum() {

        this.checksum = this.calculateChecksum();

    }

}
