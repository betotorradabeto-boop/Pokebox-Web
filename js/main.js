import SaveFile from "./SaveFile.js";

const input = document.getElementById("saveInput");
const status = document.getElementById("status");

input.addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (!file) {
        return;
    }

    try {
        status.textContent = "Carregando save...";

        const buffer = await file.arrayBuffer();

        const save = new SaveFile(buffer);

        status.textContent =
            `✅ Save carregado! ${save.getSize()} bytes`;

        console.log("========== Pokebox ==========");
        console.log("Tamanho:", save.getSize());

        const reader = save.getReader();

        reader.seek(0);

        console.log("U8 :", reader.readU8());
        console.log("U16:", reader.readU16());

        reader.seek(0);

        console.log("U32:", reader.readU32());

    } catch (error) {
        console.error(error);
        status.textContent = "❌ Erro ao carregar o save.";
    }
});
