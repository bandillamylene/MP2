// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                // Call the existing handleFormSubmission, proceedButton, populateReview Form function if the form is valid
                handleFormSubmission();
                proceedButton();
                populateReviewForm();
            }

            form.classList.add('was-validated')
        }, false)
    })
})();


//////////////////////////////////////////////////////////////////////
//For the Product function
function updateProduct(event){
    
    let productImage = document.getElementById('main_image').getAttribute('src');/* Declaring variables that connects id names from product page*/
    let modelName = document.getElementById('model_title').innerText;  /* Declaring variables that connects id names from product page*/
    let productDetails = document.getElementById('model_details').innerText;   /* Declaring variables that connects id names from product page*/
    let productSRP = document.getElementById('modelSRP').innerText;   /* Declaring variables that connects id names from product page*/
    let isLoggedIn = sessionStorage.getItem("loggedIn");
    
    //Setting the declared variables to local storage
    localStorage.setItem('productImage', productImage);
    localStorage.setItem('modelName', modelName);
    localStorage.setItem('productDetails', productDetails);
    localStorage.setItem('productSRP', productSRP);
    
    
    event.preventDefault(); // Prevents the default behavior of the anchor tag

    
    //To restrict users to buy a product unless they are logged in
    if (isLoggedIn === "true") {
        // User is logged in, proceed to checkout page
        window.location.href = "checkoutpage.html";
    } else {
       // User is not logged in, display the modal
        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal fade" id="login_Require" tabindex="-1" aria-labelledby="loginRequire" aria-hidden="true">

                <div class="modal-dialog modal-dialog-centered">

                    <div class="modal-content">

                        <div class="modal-header">

                            <button type="button" class="btn btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">

                            <h4 class="lead text-center" style="font-weight: bold">Please Log In to proceed</h4>

                        </div>

                    </div>

                </div>

            </div>
        `;

        document.body.appendChild(modal);

        // Activate Bootstrap Modal
        const myModal = new bootstrap.Modal(document.getElementById('login_Require'));
        myModal.show();

        // When the modal is closed, redirect to login page
        myModal._element.addEventListener('hidden.bs.modal', function () {
            window.location.href = "login.html";
        });

    }
    
    
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
    //////////////////////////////////////////////////////////////////////
    
    
    
    
    
    //////////////////////////////////////////////////////////////////////
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
    //////////////////////////////////////////////////////////////////////
    
    
    
    
    //////////////////////////////////////////////////////////////////////
    //To Update currente date in application date
    function updateDate(){
    
        let currentdate = new Date().toLocaleDateString();
        document.getElementById("app_date").innerText = currentdate
        
        
        }
        
        updateDate();
     //////////////////////////////////////////////////////////////////////   
    
    
    
    
    
    //////////////////////////////////////////////////////////////////////
    // Function to handle the 'Proceed' button click
    function proceedButton() {
        if (currentStep < 4) {
            event.preventDefault;
            currentStep++;
            manageCheckoutSteps();
        
        }
    
        //For automatic fill in vehicle information
        let modelNameValue = document.getElementById('modelName').innerText;
        let modelSRPValue = document.getElementById('modelPrice'). innerText;
    
        document.getElementById('app_desiredModel').value = modelNameValue;
        document.getElementById('app_srp').value = modelSRPValue;
    
    
        //For step 4 success to automatic replace the name for "Dear Name"
        let customerName = document.getElementById("app_name").value;
    
        document.getElementById("customer_name").innerText = customerName;
        
    
        // Generate a random number between 100000 and 999999
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
    
        // Get the element where to display the order number
        const orderNumberElement = document.getElementById('order_number');
    
        // Set the generated random number as the content of the element
        orderNumberElement.textContent = '#' + randomNumber;
    
        return false;
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
    
    
    // Function to handle form submission
    function handleFormSubmission() {
        const form = document.getElementById('app_form');
    
        if (form.checkValidity()) {
            // Call the proceedButton function after a slight delay
            setTimeout(function () {
                proceedButton();
            }, 100);
        }
    
        form.classList.add('was-validated'); // Add validation styles
        return false; // Prevent the default form submission
    }
    
    
    
    //Fetching datas from input fields
    function populateReviewForm() {
        
        // Customer Details
        document.getElementById("review_name").value = document.getElementById("app_name").value;
        document.getElementById("review_email").value = document.getElementById("app_email").value;
        document.getElementById("review_birthday").value = document.getElementById("app_birthday").value;
        document.getElementById("review_phone").value = document.getElementById("app_phone").value;
        document.getElementById("review_date").innerHTML = document.getElementById("app_date").innerHTML;
    
    
        // Address
        document.getElementById("review_streetbrgy").value = document.getElementById("app_streetbrgy").value;
        document.getElementById("review_mun").value = document.getElementById("app_mun").value;
        document.getElementById("review_province").value = document.getElementById("app_province").value;
        document.getElementById("review_zip").value = document.getElementById("app_zip").value;
    
        // Employment Details
        document.getElementById("review_compName").value = document.getElementById("app_compName").value;
        document.getElementById("review_empType").value = document.getElementById("app_empType").value;
        document.getElementById("review_comNum").value = document.getElementById("app_comNum").value;
        document.getElementById("review_compAdd").value = document.getElementById("app_compAdd").value;
        document.getElementById("review_monIncome").value = document.getElementById("app_monIncome").value;
        document.getElementById("review_annIncome").value = document.getElementById("app_annIncome").value;
    
        // Payment Type
        document.getElementById("review_payment").value = document.getElementById("app_payment").value;
    
        // Vehicle Information
        document.getElementById("review_desiredModel").value = document.getElementById("app_desiredModel").value;
        document.getElementById('review_model_srp').value = document.getElementById('app_srp').value
    
        // Checkbox (Terms and Conditions)
        document.getElementById("review_agree").checked = document.getElementById("app_agree").checked;
    
        // Scroll to the review form
        document.querySelector('.step_3').scrollIntoView({ behavior: 'smooth' });
    
        event.preventDefault;
    
        return false;
    }
    
    // Initially display only the first step
    manageCheckoutSteps();
    //////////////////////////////////////////////////////////////////////
    
    
    
    
    
    
    
    //////////////////////////////////////////////////////////////////////
    function printDetails(){
    
    
        // Customer Details
         document.getElementById("print_name").value = document.getElementById("app_name").value;
         document.getElementById("print_email").value = document.getElementById("app_email").value;
         document.getElementById("print_birthday").value = document.getElementById("app_birthday").value;
         document.getElementById("print_phone").value = document.getElementById("app_phone").value;
         document.getElementById("print_date").innerHTML = document.getElementById("app_date").innerHTML;
     
         // Address
         document.getElementById("print_streetbrgy").value = document.getElementById("app_streetbrgy").value;
         document.getElementById("print_mun").value = document.getElementById("app_mun").value;
         document.getElementById("print_province").value = document.getElementById("app_province").value;
         document.getElementById("print_zip").value = document.getElementById("app_zip").value;
     
         // Employment Details
         document.getElementById("print_compName").value = document.getElementById("app_compName").value;
         document.getElementById("print_empType").value = document.getElementById("app_empType").value;
         document.getElementById("print_comNum").value = document.getElementById("app_comNum").value;
         document.getElementById("print_compAdd").value = document.getElementById("app_compAdd").value;
         document.getElementById("print_monIncome").value = document.getElementById("app_monIncome").value;
         document.getElementById("print_annIncome").value = document.getElementById("app_annIncome").value;
     
         //payment
         document.getElementById("print_payment").value = document.getElementById("app_payment").value;
    
     
         // Vehicle Information
         document.getElementById("print_desiredModel").value = document.getElementById("app_desiredModel").value;
         document.getElementById("print_srp").value = document.getElementById("app_srp").value;
     
     
     }
     //////////////////////////////////////////////////////////////////////
    
    
    
    
    
    
    //////////////////////////////////////////////////////////////////////
    //To make the form modal printable
    function printForm() {
        // Clone the form content
        let printableContent = document.getElementById('printableform').cloneNode(true);
     
        // Remove buttons from the cloned content
        let buttons = printableContent.querySelectorAll('button');
        buttons.forEach(button => button.remove());
     
        // Update the form values in the cloned content
        let formFields = printableContent.querySelectorAll('input, select, textarea');
        formFields.forEach(field => {
            let id = field.id.replace('print_', 'app_');
            let originalField = document.getElementById(id);
            if (originalField) {
                if (field.tagName === 'INPUT' || field.tagName === 'TEXTAREA') {
                    field.setAttribute('value', originalField.value);
                } else {
                    field.innerHTML = originalField.value;
                }
            }
        });
     
        // Create a new window
        let printWindow = window.open('', '_blank');
     
        // Include Bootstrap CSS in the new window
        printWindow.document.head.innerHTML = `
            <title>Print</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
            <style>
                /* Include any specific styles for print formatting if needed */
            </style>
        `;
     
        // Set the print content in the new window
        printWindow.document.body.innerHTML = `
            <div class="container-md">
                ${printableContent.outerHTML}
            </div>
        `;
    
        // Trigger the print function after a slight delay
        setTimeout(function () {
            // Perform the print action and close the window
            printWindow.print();
            printWindow.close();
        }, 1000);
    }
    //////////////////////////////////////////////////////////////////////
    
    
    
    const ORDERS_KEY = "salesAndOrdersData";
    
    //Function data to give data to admindashboard via local storage
    function submit(){
    
    
        
        let formData = {
            // Personal Details
            name: document.getElementById("app_name").value,
            email: document.getElementById("app_email").value,
            birthday: document.getElementById("app_birthday").value,
            phone: document.getElementById("app_phone").value,
            street: document.getElementById("app_streetbrgy").value,
            municipality: document.getElementById("app_mun").value,
            province: document.getElementById("app_province").value,
            zip: document.getElementById("app_zip").value,
            companyName: document.getElementById("app_compName").value,
            employmentType: document.getElementById("app_empType").value,
            companyPhone: document.getElementById("app_comNum").value,
            businessAdd: document.getElementById("app_compAdd").value,
            monthlyIncome: document.getElementById("app_monIncome").value,
            annualIncome: document.getElementById("app_annIncome").value,
            employmentType: document.getElementById("app_empType").value,
            paymentType: document.getElementById("app_payment").value,
            desiredModel: document.getElementById("app_desiredModel").value,
            modelSRP: document.getElementById("app_srp").value,
            status: 'On Progress',
        
            ordernumber: document.getElementById("order_number").innerText,
            orderdate: document.getElementById("app_date").innerText,
       
        };
    
        
    
       // Retrieve existing orders from local storage or initialize an empty array
       let existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    
       // Push the new order data into the array
       existingOrders.push(formData);
    
       // Save the updated array back to local storage
       localStorage.setItem(ORDERS_KEY, JSON.stringify(existingOrders));
    
       alert("Application Received! You'll be redirected back to homepage")
       window.location.href = "index.html";
    
    }