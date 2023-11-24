function totalNum(){
let numSrp = parseInt(document.getElementById("srp").value);
let numDown = parseInt(document.getElementById("downpayment").value);
let registration = parseInt(document.getElementById("reg").value);
let doc = parseInt(document.getElementById("doc_stamp").value);
let numResult = numDown + registration + doc;
let numResult2 = numSrp - numResult;

let formattedResult = numResult.toLocaleString();
let formattedResult2 = numResult2.toLocaleString();

document.getElementById("result").textContent = formattedResult;
document.getElementById("result1").textContent = formattedResult2;



let twelveMonth = parseInt(numResult2 / 12 * 1.2).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("twelveM").textContent = twelveMonth;

let eighteenM = parseInt(numResult2 / 18 * 1.3).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("eighteenM").textContent = eighteenM;

let twenty_four = parseInt(numResult2 / 24 * 1.4).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("twentyF").textContent = twenty_four;

let thirtyM = parseInt(numResult2 / 30 * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("thirty").textContent = thirtyM;

let thirtyS = parseInt(numResult2 / 36 * 1.6).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("thirty_six").textContent = thirtyS;


}
