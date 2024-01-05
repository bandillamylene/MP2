const PRINT_DATA = "printDatas";

function print_data(){

    let existingPrintData = JSON.parse(localStorage.getItem(PRINT_DATA));
    
    if (existingPrintData && existingPrintData.length > 0) {
       
        // Retrieve the latest data from the array (assuming it's the last added data)
        let latestPrintData = existingPrintData[existingPrintData.length - 1];
  
        document.getElementById('print_name').value = latestPrintData.printName;
        document.getElementById('print_email').value = latestPrintData.printEmail;
        document.getElementById('print_birthday').value = latestPrintData.printBday;
        document.getElementById('print_phone').value = latestPrintData.printPhone; 
        document.getElementById('print_streetbrgy').value = latestPrintData.printStreet; 
        document.getElementById('print_mun').value = latestPrintData.printMunicipality; 
        document.getElementById('print_province').value = latestPrintData.printProvince; 
        document.getElementById('print_zip').value = latestPrintData.printZip; 
        document.getElementById('print_compName').value = latestPrintData.printCompanyName; 
        document.getElementById('print_empType').value = latestPrintData.printEmploymentType; 
        document.getElementById('print_comNum').value = latestPrintData.printCompanyPhone; 
        document.getElementById('print_compAdd').value = latestPrintData.printBusinessAdd;
        document.getElementById('print_monIncome').value = latestPrintData.printMonthlyIncome;
        document.getElementById('print_annIncome').value = latestPrintData.printAnnualIncome;
        document.getElementById('print_payment').value = latestPrintData.printPaymentType;
        document.getElementById('print_desiredModel').value = latestPrintData.printDesiredModel;
        document.getElementById('print_srp').value = latestPrintData.printModelSRP;
        document.getElementById('print_date').innerText = latestPrintData.printOrderdate;

    }

    window.print();
}


