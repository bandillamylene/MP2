let INQUIRY_KEY = "inquirydata";

//Function to recieve customer details from every checkout transaction to sales and orders dashboard
function updateInquiryTable() {
    let existingData = JSON.parse(localStorage.getItem(INQUIRY_KEY)) || [];
    let tableBodyElement = document.querySelector('#manage_inquiry tbody');
    tableBodyElement.innerHTML = '';

    existingData.forEach((inquiry, inquiryIndex) => {
        let newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${inquiry.firstname}</td>
            <td>${inquiry.surname}</td>
            <td>${inquiry.emailAddress}</td>
            <td>
                <select class="form-select" onchange="inquireStatus(${inquiryIndex}, this)">
                    <option value="Not Yet Replied" ${inquiry.status === 'Not Yet Replied' ? 'selected' : ''}>Not Yet Replied</option>
                    <option value="Replied" ${inquiry.status === 'Replied' ? 'selected' : ''}>Replied</option>
                </select>
            </td>
            <td>
                <button type="button" class="btn btn-dark btn-sm" data-bs-toggle="modal" data-bs-target="#inquiryModal" onclick="displayInquiryDetails(${inquiryIndex})">
                    See Inquiry Details
                </button>
            </td>
        `;
        tableBodyElement.appendChild(newRow);
    });
}



    //Function to update the status of select and option tags, then store it to INQUIRY_KEY local storage
function inquireStatus(inquireIndex, selectElement) {
    let existingData = JSON.parse(localStorage.getItem(INQUIRY_KEY)) || [];
    existingData[inquireIndex].status = selectElement.value;
    localStorage.setItem(INQUIRY_KEY, JSON.stringify(existingData));
}



//For displaying customer inquiry per customer Modal
function displayInquiryDetails(index) {
    let existingData = JSON.parse(localStorage.getItem(INQUIRY_KEY));

    if (existingData && existingData.length > index) {
        let inquiry = existingData[index];

        // Mapping order data to modal fields
        document.getElementById('inquiry_type').value = inquiry.type;
        document.getElementById('inquiry_specific').value = inquiry.inquiry;
        document.getElementById('inquiry_info').value = inquiry.message;
        document.getElementById('inquiry_firstName').value = inquiry.firstname;
        document.getElementById('inquiry_lastName').value = inquiry.surname;
        document.getElementById('inquiry_email').value = inquiry.emailAddress;
        document.getElementById('inquiry_phone').value = inquiry.phoneNumber;
        document.getElementById('inquiry_address').value = inquiry.addressLocation

        // Open the modal to display order details
        $('#inquiryModal').modal('show');
    }
}




//function to update the order table when the document is ready
document.addEventListener("DOMContentLoaded", function () {
    updateInquiryTable();

    // Assign event listeners to dynamically created buttons
    $('#inquiryModal tbody').on('click', 'button', function () {
        let index = $(this).closest('tr').index();
        displayInquiryDetails(index);
    });
});







// For Search Inquiry Function
function inquirySearch() {
    const searchText = document.getElementById("search_inquiries").value.toLowerCase().trim();

    const userDataRows = document.querySelectorAll('#manage_inquiry tbody tr');

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


//document.addEventListener("DOMContentLoaded", function () {
    //updateOrderTable();
//});







