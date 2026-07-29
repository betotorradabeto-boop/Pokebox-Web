import { decodeGen3String } from "../core/Gen3Text.js";

export default class TrainerInfo {
    constructor() {
        this.name = "";
        this.trainerId = 0;
        this.secretId = 0;

        this.playTimeHours = 0;
        this.playTimeMinutes = 0;
        this.playTimeSeconds = 0;
        this.playTimeFrames = 0;
    }

    load(gbaSave) {
        if (!gbaSave || !gbaSave.isLoaded()) {
            return false;
        }

        const section = gbaSave.getSection(0);

        if (!section) {
            return false;
        }

        const data = section.data;

        this.name = decodeGen3String(data, 8);
        this.trainerId = section.getU16(0x0A);
        this.secretId = section.getU16(0x0C);

        this.playTimeHours = section.getU16(0x0E);
        this.playTimeMinutes = section.getByte(0x10);
        this.playTimeSeconds = section.getByte(0x11);
        this.playTimeFrames = section.getByte(0x12);

        return true;
    }

    getName() {
        return this.name;
    }

    getTrainerId() {
        return this.trainerId;
    }

    getSecretId() {
        return this.secretId;
    }

    getPlayTimeString() {
        const hh = String(this.playTimeHours).padStart(2, "0");
        const mm = String(this.playTimeMinutes).padStart(2, "0");
        const ss = String(this.playTimeSeconds).padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
    }

    getPlayTimeFrames() {
        return this.playTimeFrames;
    }
        }
