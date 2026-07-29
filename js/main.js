import SaveFile from "./SaveFile.js";
import GbaSave from "./GbaSave.js";

const input = document.getElementById("saveInput");
const status = document.getElementById("status");

input.addEventListener("change", async (event) => {

    const file = event.target.files[0];

    if (!file)
        return;

    try {

        status.textContent = "Carregando save...";

        const buffer = await file.arrayBuffer();

        const save = new SaveFile(buffer);

        const gba = new GbaSave(save);

        gba.load();

        status.textContent =
            `✅ Save carregado! ${save.getSize()} bytes`;

        console.log("========== Pokebox ==========");
        console.log("Save:", save);
        console.log("GbaSave:", gba);

    } catch (e) {

        console.error(e);

        status.textContent =
            "❌ Erro ao carregar o save.";

    }

});
