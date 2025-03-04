document.addEventListener("DOMContentLoaded", function () {
    const busList = document.getElementById("bus-list");
    const popup = document.getElementById("confirmation-popup");
    const busDetails = document.getElementById("bus-details");
    const confirmYes = document.getElementById("confirm-yes");
    const confirmNo = document.getElementById("confirm-no");

    const busSlots = [
        { id: "bus1", time: "10:00 AM - 11:00 AM", name: "" },
        { id: "bus2", time: "11:00 AM - 12:00 PM", name: "" },
        { id: "bus3", time: "12:00 PM - 01:00 PM", name: "" },
        { id: "bus4", time: "01:00 PM - 02:00 PM", name: "" },
        { id: "bus5", time: "02:00 PM - 03:00 PM", name: "" },
    ];

    busSlots.forEach(slot => {
        const busSlot = document.createElement("div");
        busSlot.classList.add("bus-slot");
        busSlot.innerHTML = `
            <h3>${slot.name}</h3>
            <p>Time: ${slot.time}</p>
        `;
        busSlot.addEventListener("click", () => {
            busDetails.textContent = `${slot.name} at ${slot.time}`;
            popup.style.display = "flex";
        });
        busList.appendChild(busSlot);
    });

    confirmYes.addEventListener("click", () => {
        alert("Bus is running.");
        popup.style.display = "none";
    });

    confirmNo.addEventListener("click", () => {
        alert("Bus is not running.");
        popup.style.display = "none";
    });
});