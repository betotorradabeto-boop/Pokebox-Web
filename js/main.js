import SaveFile from "./core/SaveFile.js";
import GbaSave from "./core/GbaSave.js";
import TrainerInfo from "./models/TrainerInfo.js";

const input = document.getElementById("saveInput");
const status = document.getElementById("status");

input.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file)
        return;

    try {

        status.innerHTML = "Carregando save...";

        const buffer = await file.arrayBuffer();

        const save = new SaveFile(buffer);

        const gba = new GbaSave(save);

        if (!gba.load()) {
            throw new Error("Falha ao carregar o GbaSave.");
        }

        const trainer = new TrainerInfo();

        trainer.load(gba);

        status.innerHTML = `

            <h2>✅ Save carregado!</h2>

            <hr>

            <p><strong>Arquivo:</strong> ${file.name}</p>

            <p><strong>Tamanho:</strong> ${save.getSize()} bytes</p>

            <p><strong>Sections:</strong> ${gba.getSectionCount()}</p>

            <p><strong>Slot ativo:</strong> ${
                gba.getActiveSlot() === 0
                    ? "Slot A"
                    : "Slot B"
            }</p>

            <hr>

            <h3>Trainer</h3>

            <p>Em desenvolvimento...</p>

        `;

        console.clear();

        console.log("========== Pokebox ==========");

        console.log("Arquivo:", file.name);
        console.log("Tamanho:", save.getSize());
        console.log("Sections:", gba.getSectionCount());
        console.log("Slot ativo:", gba.getActiveSlot());

    }
    catch (error) {

        console.error(error);

        status.innerHTML = `

            <h2>❌ Erro</h2>

            <p>${error.message}</p>

        `;

    }

});
