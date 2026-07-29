export default class TrainerInfo {

    constructor() {

        this.name = "";
        this.trainerId = 0;
        this.secretId = 0;
        this.money = 0;

    }

    load(slot) {

        // Ainda vamos implementar a leitura do save.
        // Por enquanto apenas retorna true.

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

}
