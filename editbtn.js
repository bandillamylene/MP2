document.addEventListener("DOMContentLoaded", function () {
    var editBtn = document.getElementById("editBtn");
    var saveBtn = document.getElementById("saveBtn");

    if (editBtn) {
        editBtn.addEventListener("click", function () {
            enableFormEditing(true);
            editBtn.classList.add("clicked");
        });
    }
    if (saveBtn) {
        saveBtn.addEventListener("click", function () {
            var editBtn = document.getElementById("editBtn");
            editBtn.classList.remove("clicked");
            saveEditedData();
        });
    }
});

