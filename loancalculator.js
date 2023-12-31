//Selection fields functions
let brandSelect = document.getElementById("brands");
let mcSelect = document.getElementById("motorcycles");
let srpInput = document.getElementById("srp");
let dpinput = document.getElementById("downpayment");

//Declaring MC datas
let mcData = {
    honda: ["Click 125", "Beat 125", "TMX Supremo", "PCX160", "CBR150R"],
    kawasaki: ["Barako II", "CT 125", "Rouser NS200fi", "Dominar 400"],
    yamaha: ["XSR 155", "Sniper 155", "Mio Aerox", "Mio Soul 125i", "MT15"],
    motorstar: ["Cafe 150", "Cafe 400"],
    cfmoto: ["300SR", "NK400", "650NK"],
}

//Declaring Models srp
let mcSRP = {
    honda: {
        "Click 125": 80900,
        "Beat 125": 70670,
        "TMX Supremo": 78900,
        "PCX160": 135020,
        "CBR150R": 183900
    },

    kawasaki: {
        "Barako II": 95000,
        "CT 125": 58700,
        "Rouser NS200fi": 129800,
        "Dominar 400": 199900,
    },

    yamaha: {
        "XSR 155": 175000,
        "Sniper 155": 129900,
        "Mio Aerox": 124000,
        "Mio Soul 125i": 79900,
        "MT15": 178000
    },

    motorstar: {
        "Cafe 150": 59000,
        "Cafe 400": 170000,
    },
   
    cfmoto: {
        "300SR": 162000,
        "NK400": 248900,
        "650NK": 295000,
    }

}

let mcDP ={
    honda: {
        "Click 125": 5500,
        "Beat 125": 3700,
        "TMX Supremo": 4500,
        "PCX160": 18000,
        "CBR150R": 27500,
    },

    kawasaki: {
        "Barako II": 5000,
        "CT 125": 3000,
        "Rouser NS200fi": 17000,
        "Dominar 400": 42000,
    },

    yamaha: {
        "XSR 155": 21000,
        "Sniper 155": 16000,
        "Mio Aerox": 17000,
        "Mio Soul 125i": 7500,
        "MT15": 29000,
    },

    motorstar: {
        "Cafe 150": 4320,
        "Cafe 400": 60000,
    },
   
    cfmoto: {
        "300SR": 33000,
        "NK400": 43800,
        "650NK": 59000,
    }

}



//To update MC options
function updateMC(){
    //For Choosing Brands
    let selectBrand = brandSelect.value;//declaring selectBrand varibale then equal to variable "brand select"
    mcSelect.innerHTML = "<option selected disabled>Open to choose</option>";//to disable the "Open to choose"

    //if conditional statement for Choose Motorcycles
    if(selectBrand !== "Open to choose"){
        mcData[selectBrand].forEach(model => {//Use foreach to detect multiple strings inside array
            let option = document.createElement("option");//Creating an options 
            option.textContent = model;
            mcSelect.appendChild(option);//used appendChild to displays the models of specific brand
        })
    }


}


//Function to update specific model's price to Motorcycle SRP input field
function updateSRP(){

    let selectBrand = brandSelect.value;//declaring varibale selectBrand equal to brandSelect
    let selectmodel = mcSelect.value;//declaring varibale selectmodel equal to mcSelect

    //If conditional if the chosen brand and chosen model is true, it will display the SRP of the model
    if(selectBrand !== "Open to choose" && selectmodel !== "Open To Choose"){
        
        srpInput.value = mcSRP[selectBrand][selectmodel];//To display the SRP of the model.

    }else {
        // Handle the case when values are undefined or not valid
        srpInput.value = "";
    }

}


//Function to update specific model's price to Motorcycle DP input field
function updateDP(){

    let selectBrand = brandSelect.value;//declaring varibale selectBrand equal to brandSelect
    let selectmodel = mcSelect.value;//declaring varibale selectmodel equal to mcSelect

     //If conditional if the chosen brand and chosen model is true, it will display the DP of the model
    if(selectBrand !== "Open to choose" && selectmodel !== "Open to Choose"){

        dpinput.value = mcDP[selectBrand][selectmodel];//To display the DP of the model.
        dpinput.min = mcDP[selectBrand][selectmodel];


    }else {
        // Handle the case when values are undefined or not valid
        dpinput.value = "";
        dpinput.min = "";
    }


}

// Add an event listener to restrict the input value
dpinput.addEventListener('input', function (){

    if(parseFloat(dpinput.value) < parseFloat(dpinput.min)){
    
        dpinput.setCustomValidity(`Minimum downpayment allowed is ${dpinput.min}`)
    }else{
        dpinput.setCustomValidity('');
    }
    
    });
    


//Event listeners for changes in brand and motorcycle options
brandSelect.addEventListener("change", () => {
    updateMC();
    updateSRP();
    updateDP();
});

mcSelect.addEventListener("change", () => {
    updateSRP();
    updateDP();
});


//To CLear Data
function clearData(){

 let clear_dataIds = ["result", "result1", "twelveM", "eighteenM", "twentyF", "thirty", "thirty_six"];
    clear_dataIds.forEach(function(id){//Used foreach to detect multiple ID inside the array
        document.getElementById(id).textContent = "0";
        document.getElementById(id).value = "0";

    });
    
}


//Loan calculator 
function totalNum(){
let numSrp = parseInt(document.getElementById("srp").value);
let numDown = parseInt(document.getElementById("downpayment").value);
let registration = parseInt(document.getElementById("reg").value);
let doc = parseInt(document.getElementById("doc_stamp").value);
let numResult = numDown + registration + doc;
let numResult2 = numSrp - numResult;

let formattedResult = numResult.toLocaleString();
let formattedResult2 = numResult2.toLocaleString();



//Total cash out and Approvable loan amount
if(formattedResult = numResult){
    document.getElementById("result").textContent = formattedResult.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });;
}else {
    document.getElementById("result").textContent = "0";
}

if(formattedResult2 = numResult2){
    document.getElementById("result1").textContent = formattedResult2.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}else{
    document.getElementById("result1").textContent = "0";

}



//Months
if(twelveMonth = numResult2 / 12 * 1.2){
    document.getElementById("twelveM").textContent = twelveMonth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}else{
    document.getElementById("twelveM").textContent = "0";
}


if(eighteenM = numResult2 / 18 * 1.3){
    document.getElementById("eighteenM").textContent = eighteenM.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}else{
    document.getElementById("eighteenM").textContent = "0";
}

if(twenty_four = numResult2 / 24 * 1.4){
    document.getElementById("twentyF").textContent = twenty_four.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}else{
    document.getElementById("twentyF").textContent = "0";
}

if(thirtyM  = numResult2 / 30 * 1.5){
    document.getElementById("thirty").textContent = thirtyM.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}else{
    document.getElementById("thirty").textContent = "0";
}


if(thirtyS = numResult2 / 36 * 1.6){
    document.getElementById("thirty_six").textContent = thirtyS.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}else{
    document.getElementById("thirty_six").textContent = "0";
}



}

