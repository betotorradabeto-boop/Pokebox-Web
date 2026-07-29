export default class BinaryReader {
    constructor(buffer) {
        this.data = new Uint8Array(buffer);
        this.offset = 0;
    }

    seek(pos) {
        this.offset = pos;
    }

    skip(bytes) {
        this.offset += bytes;
    }

    readU8() {
        return this.data[this.offset++];
    }

    readU16() {
        const value =
            this.data[this.offset] |
            (this.data[this.offset + 1] << 8);

        this.offset += 2;
        return value;
    }

    readU32() {
        const value =
            this.data[this.offset] |
            (this.data[this.offset + 1] << 8) |
            (this.data[this.offset + 2] << 16) |
            (this.data[this.offset + 3] << 24);

        this.offset += 4;
        return value >>> 0;
    }
}
