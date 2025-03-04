document.addEventListener("DOMContentLoaded", function () {
    const passwordInput = document.getElementById("signup-password");
    const passwordMessage = document.createElement("p");
    passwordMessage.style.color = "red";
    passwordInput.parentNode.appendChild(passwordMessage);

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value;
        const strength = checkPasswordStrength(password);

        passwordMessage.textContent = strength.message;
        passwordMessage.style.color = strength.color;
    });

    function checkPasswordStrength(password) {
        const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const mediumPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

        if (strongPattern.test(password)) {
            return { message: "Strong password", color: "green" };
        } else if (mediumPattern.test(password)) {
            return { message: "Medium strength password (Add a special character)", color: "orange" };
        } else {
            return { message: "Weak password (Use uppercase, lowercase, number, and special character)", color: "red" };
        }
    }
});
