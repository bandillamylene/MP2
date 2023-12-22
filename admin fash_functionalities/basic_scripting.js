function showContent(id, event){

    // Prevent the default behavior of the anchor tag
    event.preventDefault(); 

    //Declared variables equals to their given id per link
    let manage_accounts = document.getElementById('manage_accounts');
    let manage_models = document.getElementById('manage_models');
    let manage_sales = document.getElementById('manage_sales_orders');
    let manage_inquiry = document.getElementById("manage_inquiry");
    let manage_service = document.getElementById("manage_service");

    //Hide the manage_accounts contents 
    if (manage_accounts){

        manage_accounts.style.display = 'none';
    }
    //Hide the manage_models contents 
    if (manage_models){
        manage_models.style.display = 'none';
    }

    if(manage_sales){

        manage_sales.style.display = 'none';
    }

    if(manage_inquiry){

        manage_inquiry.style.display = 'none';
    }

    if(manage_service){

        manage_service.style.display = 'none';
    }

    //Shows the selected contents
    let selectedContent = document.getElementById(id);
    if(selectedContent){

        selectedContent.style.display = 'block';
    }

}

// admin_dashboard.js preventing to go back when logged out
document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = sessionStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
});