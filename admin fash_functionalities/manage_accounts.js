function populateUserData() {
    // Retrieve user data for admin from local storage
    const adminData = JSON.parse(localStorage.getItem("adminUsers")) || [];

    const userDataBody = document.getElementById("userDataBody");
    userDataBody.innerHTML = ""; // Clear any existing data in the table

    // Function to create a row and cells for user data
    const createRow = (username, role) => {
      const row = document.createElement("tr");
      const usernameCell = document.createElement("td");
      const roleCell = document.createElement("td");
      const operationsCell = document.createElement("td");

      usernameCell.textContent = username;
      roleCell.textContent = role;

      // Implement delete functionality for each user
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn", "btn-danger");
      deleteButton.onclick = function () {
        deleteUserData(username);
      };

      operationsCell.appendChild(deleteButton);

      row.appendChild(usernameCell);
      row.appendChild(roleCell);
      row.appendChild(operationsCell);

      return row;
    };

    // Display all users in the table
    adminData.forEach(({ username, role }) => {
      userDataBody.appendChild(createRow(username, role));
    });
  }



  

  function deleteUserData(username) {
    let adminUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
    adminUsers = adminUsers.filter((user) => user.username !== username);
    localStorage.setItem("adminUsers", JSON.stringify(adminUsers));
    populateUserData(); // Refresh the table after deletion
  }







  //For adduser function
  function addUser() {
    const username = document.getElementById("addUser_name").value;
    const role = document.getElementById("addUser_role").value;
    const password = document.getElementById("addUser_password").value;

    let adminUsers = JSON.parse(localStorage.getItem("adminUsers")) || [];
    adminUsers.push({ username, role, password });
    localStorage.setItem("adminUsers", JSON.stringify(adminUsers));
    populateUserData(); // Refresh the table after addition
  }

  // Call the function to populate user data when the admin dashboard loads
  window.onload = populateUserData;