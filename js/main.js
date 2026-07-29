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

        console.clear();

        console.log("========== Pokebox ==========");
        console.log("Tamanho:", save.getSize());
        console.log("Sections:", gba.getSectionCount());

        gba.getSections().forEach(section => {

            console.log(
                `Section ${section.id} -> Offset 0x${section.offset.toString(16).toUpperCase()}`
            );

        });

    }
    catch (e) {

        console.error(e);

        status.textContent =
            "❌ Erro ao carregar o save.";

    }

});
