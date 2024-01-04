const ORDERS_KEY = "salesAndOrdersData";

//Function to recieve customer details from every checkout transaction to sales and orders dashboard
function updateOrderTable() {
    let existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    let tableBody = document.querySelector('#manage_sales_orders tbody');
    tableBody.innerHTML = '';

    existingOrders.forEach((order, orderIndex) => {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${order.name}</td>
            <td>${order.ordernumber}</td>
            <td>${order.desiredModel}</td>
            <td>${order.orderdate}</td>
            <td>
                <select class="form-select" onchange="updateStatus(${orderIndex}, this)">
                    <option value="On Progress" ${order.status === 'On Progress' ? 'selected' : ''}>On Progress</option>
                    <option value="Loan Approved" ${order.status === 'Loan Approved' ? 'selected' : ''}>Loan Approved</option>
                    <option value="On Hold" ${order.status === 'On Hold' ? 'selected' : ''}>On Hold</option>
                    <option value="Transaction Completed" ${order.status === 'Transaction Completed' ? 'selected' : ''}>Transaction Completed</option>
                </select>
            </td>
            <td>
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#data_print" onclick="displayOrderDetails(${orderIndex})">
                    See Order Details
                </button>
            </td>
        `;
        tableBody.appendChild(newRow);
    });
}

//Function to update the status of select and option tags, then store it to Orders_key local storage
function updateStatus(orderIndex, selectElement) {
    let existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
    existingOrders[orderIndex].status = selectElement.value;
    localStorage.setItem(ORDERS_KEY, JSON.stringify(existingOrders));
}



//For displaying customer details per customer Modal
function displayOrderDetails(index) {
    let existingOrders = JSON.parse(localStorage.getItem(ORDERS_KEY));

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






//function to update the order table when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    updateOrderTable();

    // Assign event listeners to dynamically created buttons
    $('#manage_sales_orders tbody').on('click', 'button', function () {
        let index = $(this).closest('tr').index();
        displayOrderDetails(index);
    });
});







  //For Search Order Function
  function orderSearch() {
    const searchText = document.getElementById("search_orders").value.toLowerCase();
    const tableRows = document.querySelectorAll('#manage_sales_orders tbody tr');

    tableRows.forEach(row => {
        const orderNumber = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

        if (orderNumber.includes(searchText)) {
            row.style.display = 'table-row'; // Show the row if the order number matches the search text
        } else {
            row.style.display = 'none'; // Hide the row if the order number doesn't match the search text
        }
    });
}

//document.addEventListener("DOMContentLoaded", function () {
    //updateOrderTable();
//});







