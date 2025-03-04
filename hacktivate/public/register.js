let phnumberInput = document.getElementById("phnumber");
phnumberInput.addEventListener("input", () => {
    let phnumber = phnumberInput.value.trim();
    if (!phnumber || isNaN(phnumber)) {
        phnumberInput.style.border = "1px solid red";
    } else {
        phnumberInput.style.border = "none"; 
    }
});