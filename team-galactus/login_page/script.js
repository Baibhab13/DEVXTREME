// Get elements
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const formTitle = document.getElementById("form-title");
const showSignup = document.getElementById("show-signup");
const showLogin = document.getElementById("show-login");

// Toggle to Signup
showSignup.addEventListener("click", function () {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    formTitle.textContent = "Sign Up";
});

// Toggle to Login
showLogin.addEventListener("click", function () {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    formTitle.textContent = "Login";
});



