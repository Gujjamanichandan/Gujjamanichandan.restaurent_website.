// app.js

// Requiring module


document.addEventListener("DOMContentLoaded", function () {
    // Get references to various HTML elements
    const home = document.querySelector(".home");
    const formOpenBtn = document.querySelector("#form-open");
    const formContainer = document.querySelector(".form_container");
    const formCloseBtn = document.querySelector(".form_close");
    const signupBtn = document.querySelector("#signup");
    const mainbox = document.querySelector("#mainboxSpinner");
    const loginBtn = document.querySelector("#login");
    const pwShowHide = document.querySelectorAll(".pw_hide");

    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const user = document.getElementById("user");
    const myLink = document.getElementById("myLink");
    const drop = document.getElementById("drop");
    const loginEmailInput = document.getElementById("loginEmail");
    const loginPasswordInput = document.getElementById("loginPassword");
    const nameInput = document.getElementById("name");
    const signupEmailInput = document.getElementById("signupEmail");
    const signupPasswordInput = document.getElementById("signupPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const loginPasswordError = document.getElementById("loginEmailError");
    const loginconfirmPasswordError = document.getElementById("loginPasswordError");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    let timeoutEventTriggered = Boolean(localStorage.getItem("timeoutEventTriggered"));
    // Function to display the main box modal after 3 seconds
    function showMainBoxModal() {
        if (mainbox) {
            mainbox.style.display = "block";
        }
    }

    // Set a timeout to call the showMainBoxModal function after 3 seconds (3000 milliseconds)

    // Function to add input change listener and clear error messages
    addInputChangeListener(loginEmailInput, "loginEmailError");
    addInputChangeListener(loginPasswordInput, "loginPasswordError");
    addInputChangeListener(nameInput, "nameError");
    addInputChangeListener(signupEmailInput, "emailError");
    addInputChangeListener(signupPasswordInput, "passwordError");
    addInputChangeListener(confirmPasswordInput, "confirmPasswordError");

    // Function to add an input change listener
    function addInputChangeListener(inputElement, errorId) {
        inputElement.addEventListener("input", function () {
            document.getElementById(errorId).textContent = "";
        });
    }

    // Initialization
    let userLoggedIn = false;
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    console.log(registeredUsers);
    checkUserLogin();

    // Store the interval reference
    let intervalId;

    // Event listener for closing the form

    function removeValidation() {
        loginPasswordError.textContent = "";
        loginconfirmPasswordError.textContent = "";
        nameError.textContent = "";
    }

    formCloseBtn.addEventListener("click", (event) => {
        home.classList.remove("show");
        formContainer.classList.remove("active"); // Reset the formContainer class
        removeValidation();
        // Clear the interval when the form is closed
        clearInterval(intervalId);
    });

    // Event listener for opening the form
    formOpenBtn.addEventListener("click", () => {
        clearForms();
        home.classList.add("show");
    });

    // Function to clear input forms
    function clearForms() {
        document.getElementById("loginForm").reset();
        document.getElementById("signupForm").reset();
    }

    // Event listener for showing or hiding the password
    pwShowHide.forEach((icon) => {
        icon.addEventListener("click", () => {
            let getPwInput = icon.parentElement.querySelector("input");
            if (getPwInput.type === "password") {
                getPwInput.type = "text";
                icon.classList.replace("uil-eye-slash", "uil-eye");
            } else {
                getPwInput.type = "password";
                icon.classList.replace("uil-eye", "uil-eye-slash");
            }
        });
    });

    // Event listener for signup button
    signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        removeValidation();
        formContainer.classList.add("active");
    });

    // Event listener for login button
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        removeValidation();
        formContainer.classList.remove("active");
    });

    // Event listener for login form submission
    loginForm.addEventListener("submit", loginUser);

    // Event listener for signup form submission
    signupForm.addEventListener("submit", signupUser);

    // Function to handle user login
    // Function to handle user login
    async function loginUser(event) {
        event.preventDefault();
        const enteredUsername = document.getElementById("loginEmail").value;
        const enteredPassword = document.getElementById("loginPassword").value;
        const loginEmailError = document.getElementById("loginEmailError");
        const loginPasswordError = document.getElementById("loginPasswordError");

        // Reset error messages
        loginEmailError.textContent = "";
        loginPasswordError.textContent = "";

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(enteredUsername)) {
            loginEmailError.textContent = "Please enter a valid email address.";
            return;
        }

        const loggedInUserIndex = registeredUsers.findIndex(
            (user) => user.userEmail === enteredUsername
        );

        if (loggedInUserIndex !== -1) {
            // Use the hashPassword function to hash the entered password for comparison
            const hashedEnteredPassword = await hashPassword(enteredPassword);

            // Compare the hashed entered password with the stored hash
            if (hashedEnteredPassword === registeredUsers[loggedInUserIndex].userPassword) {
                registeredUsers[loggedInUserIndex].isLoggedIn = true;
                home.classList.remove("show");
                localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
                userLoggedIn = true;
                alert("Login successful!");
                checkUserLogin();
                drop.classList.remove('display');
                formOpenBtn.classList.add('display');
            } else {
                loginPasswordError.textContent = "Invalid credentials. Please try again.";
                return;
            }
        } else {
            loginPasswordError.textContent = "Invalid credentials. Please try again.";
            return;
        }

        clearForms();
    }

    // Event listener for logout link
    myLink.onclick = function () {
        // Reset input fields
        let index;
        index = registeredUsers.findIndex(obj => obj.isLoggedIn === true);

        if (index !== -1) {
            registeredUsers[index].isLoggedIn = false;
           timeoutEventTriggered= localStorage.setItem("timeoutEventTriggered", false);
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));
            drop.classList.add('display');
            formOpenBtn.classList.remove('display');
            userLoggedIn = false;
        }
    }

    // Function to check if a user is logged in
    function checkUserLogin() {
        const drop = document.querySelector("#drop");

        if (registeredUsers.find(obj => obj.isLoggedIn === true)) {
            userLoggedIn = true;
            if (!timeoutEventTriggered) {
                setTimeout(() => {
                    showMainBoxModal();
                    localStorage.setItem("timeoutEventTriggered", "true");
                }, 3000);
            }
            let loggedInUser = registeredUsers.find(obj => obj.isLoggedIn === true).userName;
            user.innerHTML = loggedInUser;
            formOpenBtn.classList.add('display');
        } else {

            drop.classList.add('display');
        }
    }

    async function hashPassword(password) {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);

        try {
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
            return hashedPassword;
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
        }
    }

    // Example usage:

    // Function to handle user signup

    async function signupUser(event) {
        event.preventDefault();

        const signupUserName = document.getElementById("name").value;
        const signupUserEmail = document.getElementById("signupEmail").value;
        const signupPassword = document.getElementById("signupPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Reset error messages
        nameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";

        // Validate name
        if (!/^[A-Za-z]+$/.test(signupUserName.trim())) {
            nameError.textContent = "Name should contain only alphabets.";
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(signupUserEmail)) {
            emailError.textContent = "Please enter a valid email address.";
            return;
        }

        // Check if the user already exists with the same email
        const userExists = registeredUsers.some(user => user.userEmail === signupUserEmail);
        if (userExists) {
            alert("User with this email already exists. Please choose a different email.");
            return;
        }

        // Validate password length or any other criteria
        if (signupPassword.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            return;
        }

        // Validate password confirmation
        if (signupPassword !== confirmPassword) {
            confirmPasswordError.textContent = "Passwords do not match. Please confirm your password.";
            return;
        }

        // Hash the user's password using your hashPassword function
        try {
            const hashedPassword = await hashPassword(signupPassword);

            // Add the new user to the registered users array
            registeredUsers.push({
                userEmail: signupUserEmail,
                userPassword: hashedPassword,
                userName: signupUserName
            });

            console.log("Updated Registered Users:", registeredUsers);

            // Store the updated user data in local storage
            localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

            alert("Registration successful! You can now log in.");

            // Hide the signup form
            formContainer.classList.remove("active");

            // Clear the input forms
            clearForms();
        } catch (error) {
            console.error('Error hashing password:', error);
        }
    }



    // Function to navigate to the menu page
    function openMenuPage() {
        window.location.href = "../menu/menu.html";
    }

    // Function to navigate to the contact page
    function openContactPage() {
        window.location.href = "../contact/contact.html";
    }

    // Function to navigate to the about page
    function openAboutPage() {
        window.location.href = "../about/about.html";
    }

    // Automatic slider functionality
    const slider = document.getElementById('slider');
    let currentIndex = 0;

    // Function to show a specific slide
    function showSlide(index) {
        const slideWidth = document.querySelector('.slide').offsetWidth;
        const newPosition = -index * slideWidth;
        slider.style.transform = `translateX(${newPosition}px)`;
    }

    // Function to show the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % document.querySelectorAll('.slide').length;
        showSlide(currentIndex);
    }

    // Set interval to automatically transition to the next slide every 2000 milliseconds (2 seconds)
    setInterval(nextSlide, 2000);

}, { once: true });
