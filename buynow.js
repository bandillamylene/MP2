//For the Product function
function updateProduct(){
let productImage = document.getElementById('main_image').getAttribute('src');/* Declaring variables that connects id names from product page*/
let modelName = document.getElementById('model_title').innerText;  /* Declaring variables that connects id names from product page*/
let productDetails = document.getElementById('model_details').innerText;   /* Declaring variables that connects id names from product page*/
let productSRP = document.getElementById('modelSRP').innerText;   /* Declaring variables that connects id names from product page*/


//Setting the declared variables to local storage
localStorage.setItem('productImage', productImage);
localStorage.setItem('modelName', modelName);
localStorage.setItem('productDetails', productDetails);
localStorage.setItem('productSRP', productSRP);

}

//For the Checkoutpage
let productImage = localStorage.getItem('productImage');//Declaring varibales that connects id names from checkout pages, and getting the details in local storage
let modelName = localStorage.getItem('modelName');//Declaring varibales that connects id names from checkout pages, and getting the details in local storage
let productDetails = localStorage.getItem('productDetails');//Declaring varibales that connects id names from checkout pages, and getting the details in local storage
let productSRP = localStorage.getItem('productSRP');//Declaring varibales that connects id names from checkout pages, and getting the details in local storage


//Displaying the declared variables connecting to checkoutpage
document.getElementById('productImage').src = productImage;
document.getElementById('modelName').innerText = modelName;
document.getElementById('productDetails').innerText = productDetails;
document.getElementById('modelPrice').innerText = productSRP;




//Script for step by step functions
let currentStep = 1;

// Function to manage the checkout steps
function manageCheckoutSteps() {
    // Hide all steps initially
    document.querySelectorAll('.step_1, .step_2, .step_3, .step_4').forEach(step => {
        step.style.display = 'none';
    });

    // Show the current step
    document.querySelector(`.step_${currentStep}`).style.display = 'block';

    // Update icons based on the current step
    const icons = document.querySelectorAll('.form-label > svg');
    icons.forEach(icon => {
        icon.style.fill = 'black'; // Reset all icons to black
    });

    // Update icons based on the current step
    const icon = document.getElementById(`iconStep${currentStep}`);
    if (icon) {
        icon.querySelector('svg').style.fill = 'green';
    }
}

// Function to handle the 'Proceed' button click
function proceedButton() {
    if (currentStep < 4) {
        currentStep++;
        manageCheckoutSteps();
    }
}

// Function to handle the 'Back' button click
function backButton() {
    if (currentStep > 1) {
        currentStep--;
        manageCheckoutSteps();
    }
    if (currentStep < 4) {
        const icon = document.getElementById(`iconStep${currentStep + 1}`);
        if (icon) {
            icon.querySelector('svg').style.fill = 'black';
        }
    }
}

// Initially display only the first step
manageCheckoutSteps();