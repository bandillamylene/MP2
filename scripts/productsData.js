const products = [{
    id : 'honda_1',
    image : 'images/motorcycles/honda/main_page/click125.png',
    name : 'Honda Click 125',
    srp : 'SRP: 80,900',
    downpayment : 'Downpayment: 5,500',
    monthly : 'Monthly: 3,229',
},
{
    id : 'honda_2',
    image : 'images/motorcycles/honda/main_page/pcx160.png',
    name : 'Honda PCX160',
    srp : 'SRP: 152,890',
    downpayment : 'Downpayment: 18,000',
    monthly : 'Monthly: 5,901',
},

{
    id : 'honda_3',
    image : 'images/motorcycles/honda/main_page/beat 125.png',
    name : 'Honda Beat Fashion Sport',
    srp : 'SRP: 70,670',
    downpayment : 'Downpayment: 3,700',
    monthly : 'Monthly: 2,883',
},

{
    id : 'honda_4',
    image : 'images/motorcycles/honda/main_page/tmx supremo.png',
    name : 'Honda TMX Supremo',
    srp : 'SRP: 78,900',
    downpayment : 'Downpayment: 4,500',
    monthly : 'Monthly: 3,213',
},

{
    id : 'honda_5',
    image : 'images/motorcycles/honda/main_page/cbr150.png',
    name : 'Honda CBR150R',
    srp : 'SRP: 183,900',
    downpayment : 'Downpayment: 27,500',
    monthly : 'Monthly: 6,857',
},

{
    image : '',
    name : '',
    srp : '',
    downpayment : '',
    monthly : '',
},

{
    image : '',
    name : '',
    srp : '',
    downpayment : '',
    monthly : '',
},

{
    image : '',
    name : '',
    srp : '',
    downpayment : '',
    monthly : '',
},

{
    image : '',
    name : '',
    srp : '',
    downpayment : '',
    monthly : '',
},

{
    image : '',
    name : '',
    srp : '',
    downpayment : '',
    monthly : '',
},

];

let productsHTML = '';

products.forEach( (product) => {
    productsHTML += `

            <div class="card" style="width: 20rem">

            <div class="img-hover-zoom card-img-top">

                <a href="click125.html">

                    <img class="img-fluid" src="${product.image}">

                </a>

            </div>

            <div class="card-body">

                <div class="model-title card-title">

                    <a href="click125.html">

                        <h5 class="m-title" id="click125_title_brand">${product.name}</h5>

                    </a>

                </div>
            
                </div>

                <div class="mc--footer card-footer">

                    <a href="click125.html" class="mc--honda">

                        <h4 class="h5" id="click125_modelSRP_brand">${product.srp}</h4>

                        <h4 class="h6" id="click125_modelDP_brand">${product.downpayment}</h4>

                        <h4 class="h6 pb-3" id="click125_modelmonthly_brand">${product.monthly}</h4>

                    </a>

                    <a href="click125.html" class="btn btn-outline-light btn-sm" role="button">See More</a>

                    <a href="#" class="save-icon fa-lg" style="position: absolute; bottom: 10px; right: 15px; color: #FFFFFF;"
                        onclick="addToSavedItems(this.closest('.mc_card'))">
                        <i class="far fa-bookmark"></i>

                </div>

            </div>


   `;

});


console.log(productsHTML);

document.querySelector('.row');