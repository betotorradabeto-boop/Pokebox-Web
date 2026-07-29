import BinaryReader from "./BinaryReader.js";

export default class SaveFile {

    constructor(buffer) {

        this.buffer = buffer;
        this.reader = new BinaryReader(buffer);

    }

    getReader() {

        return this.reader;

    }

    getBuffer() {

        return this.buffer;

    }

    getSize() {

        return this.buffer.byteLength;

    }

    download(filename = "Pokebox_Save.sav") {

        const blob = new Blob(
            [this.buffer],
            {
                type: "application/octet-stream"
            }
        );

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = filename;

        document.body.appendChild(a);

        a.click();

        document.body.removeChild(a);

        URL.revokeObjectURL(url);

    }

}
