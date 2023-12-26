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

function addOptions(options) {
  var specificInquiry = document.getElementById("specificInquiry");

  options.forEach(function(option) {
    var opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    specificInquiry.appendChild(opt);
  });
}

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

document.getElementById("contactForm").addEventListener("submit", function(event) {
  var inquiryType = document.getElementById("inquiryType");
  var specificInquiry = document.getElementById("specificInquiry");
  var inquiryTypeWarning = document.getElementById("inquiryTypeWarning");
  var specificInquiryWarning = document.getElementById("specificInquiryWarning");
  var firstName = document.getElementById("firstName");
  var surname = document.getElementById("surname");
  var email = document.getElementById("email");
  var phone = document.getElementById("phone");
  var address = document.getElementById("address");
  var firstNameWarning = document.getElementById("firstNameWarning");
  var surnameWarning = document.getElementById("surnameWarning");
  var emailWarning = document.getElementById("emailWarning");
  var phoneWarning = document.getElementById("phoneWarning");
  var addressWarning = document.getElementById("addressWarning");

  // Reset all existing warning messages
  inquiryTypeWarning.style.display = "none";
  specificInquiryWarning.style.display = "none";
  firstNameWarning.style.display = "none";
  surnameWarning.style.display = "none";
  emailWarning.style.display = "none";
  phoneWarning.style.display = "none";
  addressWarning.style.display = "none";

  // Validation logic for each field
  var isValid = true;

  if (!inquiryType.value) {
    inquiryTypeWarning.style.display = "block";
    isValid = false;
  }

  if (!specificInquiry.value) {
    specificInquiryWarning.style.display = "block";
    isValid = false;
  }

  if (!firstName.value) {
    firstNameWarning.style.display = "block";
    isValid = false;
  }

  if (!surname.value) {
    surnameWarning.style.display = "block";
    isValid = false;
  }

  if (!email.value || !validateEmail(email.value)) {
    emailWarning.style.display = "block";
    isValid = false;
  }

  var phoneValidation = validatePhone(phone.value);

  if (phoneValidation === 'empty') {
    phoneWarning.textContent = "*Please enter phone number.*";
    phoneWarning.style.display = "block";
    isValid = false;
  } else if (phoneValidation === 'invalidFormat') {
    phoneWarning.textContent = "Please enter a valid phone number starting with +639 followed by 9 digits.";
    phoneWarning.style.display = "block";
    isValid = false;
  }

  if (!address.value) {
    addressWarning.style.display = "block";
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();// Prevent form submission
    
  }else{
    submitForm();
  }
});

function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


//Function data to give data to admindashboard via local storage
let INQUIRY_KEY = "inquirydata";
  
function submitForm(){

  let inquiryData = {

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

  let existingData = JSON.parse(localStorage.getItem(INQUIRY_KEY)) || [];

  existingData.push(inquiryData);

  localStorage.setItem(INQUIRY_KEY, JSON.stringify(existingData));


  alert("Inquiry Received, will send a reply on your provided email");
  location.reload();
}