document.querySelector('.clickMe').addEventListener('click', function() {
    // Hide the element with the class 'click-cards'
document.querySelector('.click-cards').style.display = 'none';
});

function startBlinking() {
    const blinkingText = document.getElementById('blinkingText');

    function blink() {
        blinkingText.style.visibility = (blinkingText.style.visibility === 'hidden') ? 'visible' : 'hidden';
    }

    setInterval(blink, 1000); //time interval (in milliseconds)
}

startBlinking(); //function to start blinking
