function redirectBasedOnSearch() {
    var searchInput = document.getElementById("search").value.trim().toLowerCase();
    var destinationPage = ""; // Initialize the destination page variable


    // Check for partial and case-insensitive matches in the search term

    //Honda Products
    if (searchInput.includes("click 125") || searchInput.includes("click")) {
        destinationPage = "./click125.html";
    } else if (searchInput.includes("beat 125") || searchInput.includes("beat")) {
        destinationPage = "./beat125.html";
    }
    else if (searchInput.includes("tmx supremo") || searchInput.includes("tmx") || searchInput.includes("supremo")) {
        destinationPage = "./tmxsupremo125.html";
    }

    else if (searchInput.includes("tmx supremo") || searchInput.includes("tmx") || searchInput.includes("supremo")) {
        destinationPage = "./tmxsupremo125.html";
    }
    
    else if (searchInput.includes("pcx 160") || searchInput.includes("pcx160") || searchInput.includes("pcx")) {
        destinationPage = "./pcx160.html";
    }

    else if (searchInput.includes("cbr 150r") || searchInput.includes("cbr") || searchInput.includes("cbr150r")) {
        destinationPage = "./cbr150r.html";
    }


    //Kawasaki Products
    if (searchInput.includes("barako ii") || searchInput.includes("barako") || searchInput.includes("barakoii")) {
        destinationPage = "./barakoii.html";
    }

    else if (searchInput.includes("ct 125") || searchInput.includes("ct") || searchInput.includes("ct125")) {
        destinationPage = "./ct125.html";
    }

    else if (searchInput.includes("rouser ns 200") || searchInput.includes("ns 200") || searchInput.includes("rouser") || searchInput.includes("ns200") || searchInput.includes("rouser 200")) {
        destinationPage = "./rouserns200.html";
    }

    else if (searchInput.includes("dominar 400") || searchInput.includes("dominar") || searchInput.includes("dominar400")) {
        destinationPage = "./dominar400.html";
    }


    
    //Yamaha Products
    if (searchInput.includes("xsr 155") || searchInput.includes("xsr") || searchInput.includes("xsr155")) {
        destinationPage = "./xsr155.html";
    }

    else if (searchInput.includes("sniper 155") || searchInput.includes("sniper") || searchInput.includes("sniper155")) {
        destinationPage = "./sniper155.html";
    }

    else if (searchInput.includes("mio aerox 155") || searchInput.includes("mio aerox") || searchInput.includes("aerox") || searchInput.includes("mio") || searchInput.includes("mioaerox") || searchInput.includes("mioaerox155")) {
        destinationPage = "./mioaerox.html";
    }

    if (searchInput.includes("mio soul 125") || searchInput.includes("mio soul") || searchInput.includes("soul") || searchInput.includes("miosoul") || searchInput.includes("mio125") || searchInput.includes("soul 125")) {
        destinationPage = "./miosoul.html";
    }

    else if (searchInput.includes("mt 15") || searchInput.includes("mt") || searchInput.includes("mt15")) {
        destinationPage = "./mt15.html";
    }


    //Motorstar Products
    if (searchInput.includes("cafe 150") || searchInput.includes("cafe150")) {
        destinationPage = "./cafe150.html";
    }

    else if (searchInput.includes("cafe 400") || searchInput.includes("cafe400")) {
        destinationPage = "./cafe400.html";
    }

     //Motorstar Products
     if (searchInput.includes("nk 400 ") || searchInput.includes("nk400")) {
        destinationPage = "./nk400.html";
    }

    else if (searchInput.includes("nk 650") || searchInput.includes("nk650")) {
        destinationPage = "./nk650.html";
    }

    
    else if (searchInput.includes("300 sr") || searchInput.includes("300sr") || searchInput.includes("sr")) {
        destinationPage = "./300sr.html";
    }




    // If destinationPage is still empty, show an alert
    if (!destinationPage) {
        alert("Product not found for this search term.");
        return false; // Prevent form submission
    }

    // Redirect to the corresponding product page
    window.location.href = destinationPage;
    return false; // Prevent form submission
}



