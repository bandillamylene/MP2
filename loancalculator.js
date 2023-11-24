function totalNum(){
let numSrp = parseInt(document.getElementById("srp").value);
let numDown = parseInt(document.getElementById("downpayment").value);
let registration = parseInt(document.getElementById("reg").value);
let doc = parseInt(document.getElementById("doc_stamp").value);
let numResult = numSrp - numDown + registration + doc;

let formattedResult = numResult.toLocaleString();

document.getElementById("result").textContent = formattedResult;

let twelveMonth = parseInt(numResult / 12 * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("twelveM").textContent = twelveMonth;

let eighteenM = parseInt(numResult / 18 * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("eighteenM").textContent = eighteenM;

let twenty_four = parseInt(numResult / 24 * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("twentyF").textContent = twenty_four;

let thirtyM = parseInt(numResult / 30 * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("thirty").textContent = thirtyM;

let thirtyS = parseInt(numResult / 36 * 1.5).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
document.getElementById("thirty_six").textContent = thirtyS;


}
