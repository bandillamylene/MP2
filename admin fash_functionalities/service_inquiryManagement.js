let SERVICE_KEY = "serviceInquiryData";

//Function to data details from every inquiries transaction to service inquiries dashboard
function updateServiceTable() {
    let existingServiceData = JSON.parse(localStorage.getItem(SERVICE_KEY)) || [];
    let tableBodyElement = document.querySelector('#manage_service tbody');
    tableBodyElement.innerHTML = '';

    existingServiceData.forEach((service, serviceIndex) => {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${service.firstName}</td>
            <td>${service.lastName}</td>
            <td>${service.emailAddress}</td>
            <td>
                <select class="form-select" onchange="serviceStatus(${serviceIndex}, this)">
                    <option value="Waiting" ${service.status === 'Waiting' ? 'selected' : ''}>Waiting</option>
                    <option value="Service Done" ${service.status === 'Service Done' ? 'selected' : ''}>Service Done</option>
                    <option value="On Hold" ${service.status === 'On Hold' ? 'selected' : ''}>On Hold</option>
                    <option value="Cancelled" ${service.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#serviceModal" onclick="displayServiceDetails(${serviceIndex})">
                    See Service Details
                </button>
            </td>
        `;
        tableBodyElement.appendChild(newRow);
    });
}


  //Function to update the status of select and option tags, then store it to SERVICE_KEY local storage
  function serviceStatus(serviceIndex, selectElement) {
    let existingServiceData = JSON.parse(localStorage.getItem(SERVICE_KEY)) || [];
    existingServiceData[serviceIndex].status = selectElement.value;
    localStorage.setItem(SERVICE_KEY, JSON.stringify(existingServiceData));
}

//For displaying customer inquiry per customer Modal
function displayServiceDetails(index) {
    let existingServiceData = JSON.parse(localStorage.getItem(SERVICE_KEY));

    if (existingServiceData && existingServiceData.length > index) {
        let service = existingServiceData[index];

        // Mapping order data to modal fields
        document.getElementById('dataService_firstName').value = service.firstName;
        document.getElementById('dataService_middleName').value = service.middleName;
        document.getElementById('dataService_lastName').value = service.lastName;
        document.getElementById('dataService_emailAddress').value = service.emailAddress;
        document.getElementById('dataService_phoneNumber').value = service.mobilePhone;
        document.getElementById('dataService_address').value = service.addressLocation;
        document.getElementById('dataService_schedule').value = service.schedule;
        document.getElementById('dataService_message').value = service.serviceMessage;
        document.getElementById('service_checkbox').value = service.agreement;

        // Open the modal to display order details
        $('#inquiryModal').modal('show');
    }
}




//function to update the order table when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    updateServiceTable();

    // Assign event listeners to dynamically created buttons
    $('#inquiryModal tbody').on('click', 'button', function () {
        let index = $(this).closest('tr').index();
        displayServiceDetails(index);
    });
});



// For Search Inquiry Function
function serviceSearch() {
    const searchText = document.getElementById("search_service").value.toLowerCase().trim();

    const userDataRows = document.querySelectorAll('#manage_service tbody tr');

    userDataRows.forEach(row => {
        const firstName = row.querySelector('td:nth-child(1)').textContent.toLowerCase(); //To search by firstname
        const lastName = row.querySelector('td:nth-child(2)').textContent.toLowerCase(); //To search by lastname

        if (firstName.includes(searchText) || lastName.includes(searchText)) {
            row.style.display = 'table-row'; // Show the row if first name or last name matches the search text
        } else {
            row.style.display = 'none'; // Hide the row if neither first name nor last name matches the search text
        }
    });
}
