const saveInput = document.getElementById("saveInput");

const status = document.getElementById("status");

saveInput.addEventListener("change", async (event)=>{

    const file = event.target.files[0];

    if(!file)
        return;

    status.textContent =
        "Lendo save...";

    const buffer =
        await file.arrayBuffer();

    const bytes =
        new Uint8Array(buffer);

    status.textContent =
        `Save carregado!\n\n${bytes.length} bytes`;

});
