// // Typing effect to Heading
// const text = "Welcome to MediConnect";
// let index = 0;

// function typeEffect() {
//     if (index < text.length) {

//         document.getElementById("typing-text").innerHTML += text.charAt(index);
//         index++;
//         setTimeout(typeEffect, 100);
//     }
// }

// window.onload = function() {
//     setTimeout(typeEffect, 500);
// };

// Cursor Effects
// const cursor = document.querySelector(".cursor");
// document.addEventListener("mousemove", (e) => {
//     cursor.style.top =`${e.clientY}px`;
//     cursor.style.left =`${e.clientX}px`;
// });

// Form Effects
// Get the modal and button elements
const modal = document.getElementById("confirmationModal");
const confirmButton = document.getElementById("confirmButton");
const closeModalButton = document.getElementById("closeModal");
const closeSpan = document.getElementsByClassName("close")[0];

// Open the modal when the confirm button is clicked
confirmButton.addEventListener("click", () => {
  modal.style.display = "block";
});

// Close the modal when the close button is clicked
closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when the close span (x) is clicked
closeSpan.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close the modal when clicking outside the modal content
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Form Validation for Sign Up Page
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.querySelector(".signup-form");
    const loginForm = document.querySelector(".login-form");

    // Validate Password Match in Sign Up
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            const password = signupForm.querySelector('input[name="password"]').value;
            const confirmPassword = signupForm.querySelector('input[name="confirm_password"]').value;

            if (password !== confirmPassword) {
                e.preventDefault();
                alert("Passwords do not match. Please try again.");
            } else if (password.length < 6) {
                e.preventDefault();
                alert("Password must be at least 6 characters long.");
            }
        });
    }

    // Basic Login Validation
    if (loginForm) {

        loginForm.addEventListener("submit", (e) => {
            const email = loginForm.querySelector('input[name="email"]').value;
            const password = loginForm.querySelector('input[name="password"]').value;
            const userType = loginForm.querySelector('#userType').value;

            if (!email || !password) {
                e.preventDefault();
                alert("Please fill out all fields.");
            }
        });
    }
});

// chatbot

function toggleChat() {
    let chatbox = document.getElementById("chatbox");
    chatbox.classList.toggle("hidden");
}

function sendMessage() {
    let inputField = document.getElementById("chat-input");
    let chatBody = document.getElementById("chat-body");

    if (inputField.value.trim() === "") return;

    // Append user message
    let userMessage = document.createElement("p");
    userMessage.textContent = inputField.value;
    userMessage.style.background = "#DCF8C6";
    userMessage.style.padding = "5px";
    userMessage.style.borderRadius = "5px";
    userMessage.style.margin = "5px 0";
    chatBody.appendChild(userMessage);

    // Clear input field
    inputField.value = "";

    // Auto-reply from bot (Example)
    setTimeout(() => {
        let botMessage = document.createElement("p");
        botMessage.textContent = "Thank you! A representative will assist you soon.";
        botMessage.style.background = "#fff";
        botMessage.style.padding = "5px";
        botMessage.style.borderRadius = "5px";
        botMessage.style.margin = "5px 0";
        chatBody.appendChild(botMessage);
    }, 1000);

    // Auto-scroll to latest message
    chatBody.scrollTop = chatBody.scrollHeight;
}