export default class Section {
    constructor(index, offset) {
        this.index = index;
        this.offset = offset;

        this.data = new Uint8Array(0x0F80); // 3968 bytes
        this.id = 0;
        this.checksum = 0;
        this.signature = 0;
        this.saveIndex = 0;
    }

    load(reader) {
        reader.seek(this.offset);

        for (let i = 0; i < 0x0F80; i++) {
            this.data[i] = reader.readU8();
        }

        this.id = reader.readU16();
        this.checksum = reader.readU16();
        this.signature = reader.readU32();
        this.saveIndex = reader.readU32();

        return true;
    }

    isValidSignature() {
        return this.signature === 0x08012025;
    }
}
