let link = document.getElementsByClassName("link");

let currentValue = 1;

function activeLink(){
  for(l of link){
    l.classList.remove("active");
  }
  event.target.classList.add("active");
  currentValue = event.target.value;
}