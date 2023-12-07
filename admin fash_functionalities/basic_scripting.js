function showContent(id, event){

    // Prevent the default behavior of the anchor tag
    event.preventDefault(); 

    //Declared variables equals to their given id per link
    let manage_accounts = document.getElementById('manage_accounts');
    let manage_models = document.getElementById('manage_models');

    //Hide the manage_accounts contents 
    if (manage_accounts){

        manage_accounts.style.display = 'none';
    }
    //Hide the manage_models contents 
    if (manage_models){
        manage_models.style.display = 'none';
    }

    //Shows the selected contents
    let selectedContent = document.getElementById(id);
    if(selectedContent){

        selectedContent.style.display = 'block';
    }

}

// admin_dashboard.js preventing to go back when logged in
document.addEventListener("DOMContentLoaded", () => {
    const loggedIn = sessionStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        window.location.href = "login.html";
    }
});