import SaveFile from "./core/SaveFile.js";
import GbaSave from "./core/GbaSave.js";
import TrainerInfo from "./models/TrainerInfo.js";

import TrainerView from "./views/TrainerView.js";
import MoneyView from "./views/MoneyView.js";

const saveInput = document.getElementById("saveInput");
const status = document.getElementById("status");

const btnTrainer = document.getElementById("btnTrainer");
const btnMoney = document.getElementById("btnMoney");

let trainer = null;

saveInput.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file)
        return;

    try {

        const buffer = await file.arrayBuffer();

        const save = new SaveFile(buffer);

        const gba = new GbaSave(save);

        if (!gba.load())
            throw new Error("Falha ao carregar o save.");

        trainer = new TrainerInfo();

        trainer.load(gba);

        const trainerView = new TrainerView();

        status.innerHTML = trainerView.render(trainer);

    }
    catch (error) {

        status.innerHTML = `

            <h2>Erro</h2>

            <p>${error.message}</p>

        `;

    }

});

btnTrainer.addEventListener("click", () => {

    if (!trainer)
        return;

    const trainerView = new TrainerView();

    status.innerHTML = trainerView.render(trainer);

});

btnMoney.addEventListener("click", () => {

    if (!trainer)
        return;

    const moneyView = new MoneyView();

    status.innerHTML = moneyView.render(trainer);

});
