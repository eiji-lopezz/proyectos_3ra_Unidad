document.addEventListener("DOMContentLoaded", () => {
    const dropArea = document.getElementById("drop-area");
    const fileInput = document.getElementById("file-input");
    const fileList = document.getElementById("file-list");
    const fileUploadButton = document.getElementById("file-upload-button");

    // Prevenir comportamiento por defecto
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    // Resaltar área de arrastre
    ["dragenter", "dragover"].forEach((eventName) => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.add("highlight");
        }, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropArea.addEventListener(eventName, () => {
            dropArea.classList.remove("highlight");
        }, false);
    });

    dropArea.addEventListener("drop", handleDrop, false);
    fileUploadButton.addEventListener("click", () => {
        fileInput.click();
    });
    fileInput.addEventListener("change", () => {
        const files = fileInput.files;
        handleFiles(files);
    });
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles(files);
}

function handleFiles(files) {
    const fileList = document.getElementById("file-list");
    [...files].forEach((file) => {
        const item = document.createElement("div");
        item.className = "file-item";

        if (file.type.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                URL.revokeObjectURL(img.src); // Liberar memoria
            };
            item.appendChild(img);
        }

        const text = document.createElement("span");
        text.textContent = file.name;
        item.appendChild(text);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            fileList.removeChild(item);
        });
        item.appendChild(removeButton);

        fileList.appendChild(item);
    });
}
