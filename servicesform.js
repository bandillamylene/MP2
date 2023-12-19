// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        // If the form is valid, call your custom function
        submitService();
      }

      form.classList.add('was-validated');
    }, false);
  });
})();


let SERVICE_KEY = "serviceInquiryData";


function submitService(){


    let serviceData = {

        firstName: document.getElementById("service_firstName").value,
        middleName: document.getElementById("service_middleName").value,
        lastName: document.getElementById("service_lastName").value,
        emailAddress: document.getElementById("service_email").value,
        mobilePhone: document.getElementById("service_mobile").value,
        addressLocation: document.getElementById("service_address").value,
        schedule: document.getElementById("service_schedule").value,
        serviceMessage: document.getElementById("service_message").value,
        agreement: document.getElementById("service_checkbox").value,
        status: "Waiting",



    }

  // Retrieve existing Data from local storage or initialize an empty array
let existingServiceData = JSON.parse(localStorage.getItem(SERVICE_KEY)) || [];

// Push the new order data into the array
existingServiceData.push(serviceData)

// Save the updated array back to local storage
localStorage.setItem(SERVICE_KEY, JSON.stringify(existingServiceData));

alert("Service inquiry Form Submitted! Kindly wait for our reply via email or phone");
window.location.href = "index.html";

}