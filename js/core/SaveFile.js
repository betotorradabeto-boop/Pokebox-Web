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

}
