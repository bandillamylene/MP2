// Function to enable specific inquiry options based on the selected inquiry type
function enableSpecific() {
  var inquiryType = document.getElementById("inquiryType");
  var specificInquiry = document.getElementById("specificInquiry");

  // Enable the "Please be more specific" dropdown if a selection is made in the first dropdown
  specificInquiry.disabled = false;
  specificInquiry.innerHTML = ''; // Clear previous options

  if (inquiryType.value === "general") {
      var options = ["Product Inquiry", "Service Inquiry", "Financing Inquiry"];
      addOptions(options);
  } else if (inquiryType.value === "support") {
      var options = ["Technical Support", "Troubleshooting Assistance", "Account Help"];
      addOptions(options);
  } else if (inquiryType.value === "sales") {
      var options = ["Model Availability", "Pricing Information", "Purchase Assistance"];
      addOptions(options);
  } else if (inquiryType.value === "feedback") {
      var options = ["Suggestions", "Complaints", "Improvement Ideas"];
      addOptions(options);
  }
}

// Function to add options to the specific inquiry dropdown
function addOptions(options) {
  var specificInquiry = document.getElementById("specificInquiry");

  options.forEach(function (option) {
      var opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      specificInquiry.appendChild(opt);
  });
}

// Function to validate phone number format
function validatePhone(phone) {
  // Check if the phone number is empty
  if (phone.trim() === '') {
      return 'empty';
  }

  // Check if the phone number matches the expected format and length
  var phoneRegex = /^\+639\d{9}$/;
  if (!phoneRegex.test(phone)) {
      return 'invalidFormat';
  }

  return 'valid';
}

// Function to validate email format
function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

document.getElementById("contactForm").addEventListener("submit", function (event) {
  var fieldsToCheck = ["inquiryType", "specificInquiry", "firstName", "surname", "email", "phone", "address"];
  var isValid = true;

  fieldsToCheck.forEach(function (fieldId) {
    var field = document.getElementById(fieldId);
    var warning = document.getElementById(fieldId + "Warning");

    // Reset previous styles
    field.style.border = "1px solid #ced4da"; // Reset to the default border color
    warning.style.display = "none";

    // Validation logic for each field
    if (field.value.trim() === '') {
      field.style.border = "1px solid red"; // Set red border
      warning.style.display = "block";
      isValid = false;
    } else if (fieldId === "email" && !validateEmail(field.value)) {
      field.style.border = "1px solid red"; // Set red border
      warning.style.display = "block";
      isValid = false;
    } else if (fieldId === "phone") {
      var phoneValidation = validatePhone(field.value);
      if (phoneValidation === 'empty' || phoneValidation === 'invalidFormat') {
        field.style.border = "1px solid red"; // Set red border
        warning.textContent = (phoneValidation === 'empty') ? "*Please enter phone number.*" : "Please enter a valid phone number starting with +639 followed by 9 digits.";
        warning.style.display = "block";
        isValid = false;
      }
    }
  });

  if (!isValid) {
    event.preventDefault(); // Prevent form submission
  } else {
    submitForm();
  }
});

// Function to submit the form and store data in local storage
function submitForm() {
  var INQUIRY_KEY = "inquirydata";

  var inquiryData = {
      type: document.getElementById("inquiryType").value,
      inquiry: document.getElementById("specificInquiry").value,
      message: document.getElementById("additionalInfo").value,
      firstname: document.getElementById("firstName").value,
      surname: document.getElementById("surname").value,
      emailAddress: document.getElementById("email").value,
      phoneNumber: document.getElementById("phone").value,
      addressLocation: document.getElementById("address").value,
      status: "Not Yet Replied",
  }

  var existingData = JSON.parse(localStorage.getItem(INQUIRY_KEY)) || [];
  existingData.push(inquiryData);
  localStorage.setItem(INQUIRY_KEY, JSON.stringify(existingData));

  alert("Inquiry Received, will send a reply to your provided email");
  location.reload();
}








//Prevention of 405 error
document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  var contactForm = document.getElementById("contactForm");

  //Event listener to the form
  contactForm.addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Collect form data
    var formData = new FormData(contactForm);

    // Send form data to the admin page using AJAX
    sendFormData(formData);
  });
});

function sendFormData(formData) {
  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure it to send a POST request to the admin page
  xhr.open("POST", "admin.php", true);

  // Set up the callback function to handle the response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response (if needed)
      console.log(xhr.responseText);
    }
  };

  // Send the form data
  xhr.send(formData);
}
