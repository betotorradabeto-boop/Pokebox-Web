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

        this.securityKey = 0;
        this.money = 0;
    }

    load(gbaSave) {
        if (!gbaSave || !gbaSave.isLoaded()) {
            return false;
        }

        const section0 = gbaSave.getSection(0);
        const section1 = gbaSave.getSection(1);

        if (!section0) {
            return false;
        }

        const data0 = section0.data;

        this.name = decodeGen3String(data0.subarray(0x0000, 0x0007), 7);

        const trainerIdRaw = section0.getU32(0x000A);
        this.trainerId = trainerIdRaw & 0xFFFF;
        this.secretId = (trainerIdRaw >>> 16) & 0xFFFF;

        this.playTimeHours = section0.getU16(0x000E);
        this.playTimeMinutes = section0.getByte(0x0010);
        this.playTimeSeconds = section0.getByte(0x0011);
        this.playTimeFrames = section0.getByte(0x0012);

        this.securityKey = section0.getU32(0x0AF8) >>> 0;

        this.money = 0;
        if (section1) {
            const encryptedMoney = section1.getU32(0x0290) >>> 0;
            this.money = (encryptedMoney ^ this.securityKey) >>> 0;
        }

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

    getMoney() {
        return this.money;
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

    getSecurityKey() {
        return this.securityKey;
    }
    }
