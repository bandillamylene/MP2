  // handle the removal of the message

    const removableMessage = document.getElementById('removableMessage');
    const closeButton = removableMessage.querySelector('.btn-close');

    closeButton.addEventListener('click', function () {
        removableMessage.style.display = 'none';
    });