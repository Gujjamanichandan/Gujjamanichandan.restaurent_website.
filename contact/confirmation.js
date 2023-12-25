// Retrieve form data from sessionStorage
const formData = JSON.parse(sessionStorage.getItem("formData"));

// Display form data on the confirmation page
document.getElementById("confirmFirstName").innerText =
  formData.firstName;
document.getElementById("confirmLastName").innerText = formData.lastName;
document.getElementById("confirmEmail").innerText = formData.email;
document.getElementById("confirmPhone").innerText = formData.phone;
document.getElementById("confirmDate").innerText = formData.date;
document.getElementById("confirmTime").innerText = formData.time;
document.getElementById("confirmEventType").innerText =
  formData.eventType;
document.getElementById("confirmGuests").innerText = formData.guests;

const confirmReservation = () => {
  const formData = JSON.parse(sessionStorage.getItem('formData'));

  // Clear sessionStorage
  sessionStorage.removeItem('formData');

  // Replace content in the "forminfo" div with the thank you message
  const forminfoDiv = document.querySelector('.forminfo');
  
  if (forminfoDiv) {
      forminfoDiv.innerHTML = `
          <h1>Thank you! <br>We received your information, our team will call you soon.</h1>
      `;
  }
};



// Function to go back to the previous page
const goBack = () => {
  // Clear sessionStorage
  sessionStorage.removeItem("formData");
  // Redirect to the previous page
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