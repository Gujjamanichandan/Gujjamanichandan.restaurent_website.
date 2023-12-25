document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("date").min = new Date().toISOString().split("T")[0];
});



// Function to store form data in session storage and redirect to confirmation page
const redirectToConfirmationPage = (formData) => {
    sessionStorage.setItem('formData', JSON.stringify(formData));
    window.location.href = 'confirmation.html';
};

// Function to handle form submission
const submitForm = () => {
    // Clear any previous error messages
    clearErrors();

    // Retrieve form field values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const eventType = document.getElementById("eventType").value;
    const guests = document.getElementById("guests").value;

    // Validate form inputs
    if (!validateInputs(firstName, lastName, email, phone, date, time, eventType, guests)) {
        return;
    }

    // Create formData object for storage and redirection
    const formData = {
        firstName,
        lastName,
        email,
        phone,
        date,
        time,
        eventType,
        guests,
    };

    // Redirect to confirmation page
    redirectToConfirmationPage(formData);
};

// Function to validate form inputs
const validateInputs = (firstName, lastName, email, phone, date, time, eventType, guests) => {
    let isValid = true;
    const alphaNumericRegex = /^[a-zA-Z0-9\s]+$/;
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^\d{10}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9] (AM|PM)$/;

    

    // Validate each input and display errors if necessary
    if (!firstName.trim() || !alphaNumericRegex.test(firstName)) {
        isValid = false;
        displayError("firstNameError", "Please enter a valid first name");
    }

    if (!lastName.trim() || !alphaNumericRegex.test(lastName)) {
        isValid = false;
        displayError("lastNameError", "Please enter a valid last name");
    }

    if (!emailRegex.test(email)) {
        isValid = false;
        displayError("emailError", "Please enter a valid email address.");
    }

    if (!phoneRegex.test(phone)) {
        isValid = false;
        displayError("phoneError", "Please enter a valid phone number (10 digits).");
    }

    if (!dateRegex.test(date) || new Date(date) < new Date()) {
        isValid = false;
        displayError("dateError", "Please enter a valid date");
    }

    if (!timeRegex.test(time)) {
        isValid = false;
        displayError("timeError", "Please enter a valid time (HH:MM AM/PM).");
    }

    if (!eventType) {
        isValid = false;
        displayError("eventTypeError", "Please select an event type.");
    }

    if (!Number.isInteger(Number(guests)) || guests <= 0) {
        isValid = false;
        displayError("guestsError", "Please enter a valid number of guests (integer greater than 0).");
    }

    return isValid;
};

// Function to display error messages
const displayError = (elementId, errorMessage) => {
    document.getElementById(elementId).innerHTML = errorMessage;
};

// Function to clear all error messages
const clearErrors = () => {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
        element.innerHTML = '';
    });
};

// Function to clear form fields and errors
const clearForm = () => {
    document.getElementById("reservationForm").reset();
    clearErrors();
    document.getElementById("firstName").focus();
};

// Function to confirm reservation and redirect
const confirmReservation = () => {
    const formData = JSON.parse(sessionStorage.getItem('formData'));
    alert('Reservation confirmed!');
    sessionStorage.removeItem('formData');
    window.location.href = 'contact.html'; 
};

// Function to go back in the browser history
const goBack = () => {
    sessionStorage.removeItem('formData');
    window.history.back();
};

// Accordion functionality
document.querySelectorAll('.accordion').forEach((accordion) => {
    accordion.addEventListener('click', () => {
        // Close other accordions and panels
        document.querySelectorAll('.accordion').forEach((otherAccordion) => {
            if (otherAccordion !== accordion) {
                otherAccordion.classList.remove('active');
                const otherPanel = otherAccordion.nextElementSibling;
                otherPanel.style.display = 'none';
            }
        });

        // Toggle current accordion and panel
        accordion.classList.toggle('active');
        const panel = accordion.nextElementSibling;
        panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
    });
});
