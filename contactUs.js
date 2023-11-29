function enableSpecific() {
    var inquiryType = document.getElementById("inquiryType");
    var specificInquiry = document.getElementById("specificInquiry");
  
    // Enable the "Please be more specific" dropdown if a selection is made in the first dropdown
    specificInquiry.disabled = false;
    specificInquiry.innerHTML = ''; // Clear previous options
  
    if (inquiryType.value === "general") {
      // Add specific options for General Inquiry
      var options = ["Specific Inquiry A", "Specific Inquiry B", "Specific Inquiry C"];
      addOptions(options);
    } else if (inquiryType.value === "support") {
      // Add specific options for Support
      var options = ["Specific Inquiry X", "Specific Inquiry Y", "Specific Inquiry Z"];
      addOptions(options);
    }
   else if (inquiryType.value === "sales") {
    // Add specific options for Support
    var options = ["Specific Inquiry 1", "Specific Inquiry 2", "Specific Inquiry 3"];
    addOptions(options);
  }
  else if (inquiryType.value === "feedback") {
    // Add specific options for Support
    var options = ["Specific Inquiry E", "Specific Inquiry F", "Specific Inquiry G"];
    addOptions(options);
  }
    
  }
  
  function addOptions(options) {
    var specificInquiry = document.getElementById("specificInquiry");
  
    options.forEach(function(option) {
      var opt = document.createElement("option");
      opt.value = option;
      opt.textContent = option;
      specificInquiry.appendChild(opt);
    });
  }
  