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
