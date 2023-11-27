function changeImage(clickedImage){

let mainImage = document.getElementById("main_image");

mainImage.src = clickedImage.src;

}

//Modal image
function changeImage_modal(chosenImage){
    
const modalImage = document.getElementById("main_image_modal");

modalImage.src = chosenImage.src;

}