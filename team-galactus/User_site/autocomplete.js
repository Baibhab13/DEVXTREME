const suggestions = ["Berhampur", "Gopalpur", "PMEC", "Jagannathpur", "Narendrapur", "Purusottampur", "Kabisuryanagar", "Khallikote", "Chhatrapur", "Pukudibandha"];

const inputFields = document.querySelectorAll("input"); // Select both inputs
const suggestionsList = document.createElement("ul");
suggestionsList.classList.add("suggestions-list");
document.body.appendChild(suggestionsList);

let activeInput = null;

// Function to show suggestions below the active input
function showSuggestions(inputField) {
    const inputValue = inputField.value.toLowerCase().trim(); // Ensure lowercase and trimmed
    suggestionsList.innerHTML = "";
    activeInput = inputField;

    // Get input field position relative to the viewport
    const rect = inputField.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop; 
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft; 

    // Adjust dropdown position
    suggestionsList.style.position = "absolute";
    suggestionsList.style.top = rect.bottom + scrollTop + 5 + "px";
    suggestionsList.style.left = rect.left + scrollLeft + "px";
    suggestionsList.style.width = rect.width + "px";
    suggestionsList.style.display = "none";

    if (inputValue) {
        const filteredSuggestions = suggestions.filter(item =>
            item.toLowerCase().trim().startsWith(inputValue.trim())
        );
        
        

        if (filteredSuggestions.length > 0) {
            filteredSuggestions.forEach(suggestion => {
                const li = document.createElement("li");
                li.textContent = suggestion;
                li.addEventListener("click", () => {
                    activeInput.value = suggestion;
                    suggestionsList.style.display = "none"; 
                });
                suggestionsList.appendChild(li);
            });

            suggestionsList.style.display = "block"; 
        }
    }
}



// Attach event listeners to both input fields
inputFields.forEach(input => {
    input.addEventListener("input", () => showSuggestions(input));
});

// Hide suggestions when clicking outside
document.addEventListener("click", (e) => {
    if (!suggestionsList.contains(e.target) && !Array.from(inputFields).includes(e.target)) {
        suggestionsList.style.display = "none";
    }
});
