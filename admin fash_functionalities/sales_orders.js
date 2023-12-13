//Function to recieve customer details from every checkout transaction to sales and orders dashboard
function updateOrderTable() {

 // Retrieve existing orders from local storage
 let existingOrders = JSON.parse(localStorage.getItem('orders'));

 if (existingOrders && existingOrders.length > 0) {
     let tableBody = document.querySelector('#manage_sales_orders tbody');

     // Clear existing rows in the table
     tableBody.innerHTML = '';

     // Iterate through each order and create table rows
     existingOrders.forEach((order, index) => {
         let newRow = document.createElement('tr');
         newRow.innerHTML = `
             <td>${order.name}</td>
             <td>${order.ordernumber}</td>
             <td>${order.desiredModel}</td>
             <td>${order.orderdate}</td>
             <td>
                 <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#data_print">
                     See Order Details
                 </button>
             </td>
         `;
         tableBody.appendChild(newRow);
     });
 }
}

//For displaying customer details per customer Modal
function displayOrderDetails(index) {
    let existingOrders = JSON.parse(localStorage.getItem('orders'));

    if (existingOrders && existingOrders.length > index) {
        let order = existingOrders[index];

        // Mapping order data to modal fields
        document.getElementById('data_name').value = order.name;
        document.getElementById('data_email').value = order.email;
        document.getElementById('data_birthday').value = order.birthday;
        document.getElementById('data_phone').value = order.phone;
        document.getElementById('data_streetbrgy').value = order.street;
        document.getElementById('data_mun').value = order.municipality;
        document.getElementById('data_province').value = order.province;
        document.getElementById('data_zip').value = order.zip;
        document.getElementById('data_compName').value = order.companyName;
        document.getElementById('data_empType').value = order.employmentType;
        document.getElementById('data_comNum').value = order.companyPhone;
        document.getElementById('data_compAdd').value = order.businessAdd;
        document.getElementById('data_monIncome').value = order.monthlyIncome;
        document.getElementById('data_annIncome').value = order.annualIncome;
        document.getElementById('data_payment').value = order.paymentType;
        document.getElementById('data_desiredModel').value = order.desiredModel;
        document.getElementById('data_srp').value = order.modelSRP;
        document.getElementById('data_date').innerText = order.orderdate;

        // Open the modal to display order details
        $('#data_print').modal('show');
    }
}

window.onload = function () {
    updateOrderTable();

    // Assign event listeners to dynamically created buttons
    $('#manage_sales_orders tbody').on('click', 'button', function () {
        let index = $(this).closest('tr').index();
        displayOrderDetails(index);
    });
};