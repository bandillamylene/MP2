// Get elements
const deleteAvatarIcon = document.getElementById('deleteAvatarIcon');
const saveAvatarBtn = document.getElementById('saveAvatarBtn');
const editImageBtn = document.getElementById('editImageBtn');
const avatarInput = document.createElement('input');
const username = sessionStorage.getItem('username');
avatarInput.setAttribute('type', 'file');
avatarInput.setAttribute('accept', '.png, .jpg, .jpeg');
avatarInput.style.display = 'none';
document.querySelector('.profSection').appendChild(avatarInput);

// Placeholder avatar image URL
const placeholderImage = 'https://via.placeholder.com/150';

// Function to update the profile picture
function updateProfilePicture(src) {
    const profileIcon = document.querySelector('.profile_icon');
    profileIcon.src = src;
}

// Function to save the avatar to localStorage
function saveAvatarToStorage(src, username) {
    localStorage.setItem(`avatar_${username}`, src);
}

// Function to load the avatar from localStorage
function loadAvatarFromStorage(username) {
    const storedAvatar = localStorage.getItem(`avatar_${username}`);
    if (storedAvatar) {
        updateProfilePicture(storedAvatar);
        // Show delete icon when avatar is loaded
        deleteAvatarIcon.style.display = 'inline-block';
    } else {
        // Show placeholder image if avatar is not available
        updateProfilePicture(placeholderImage);
    }
}

// Hide Save button initially
saveAvatarBtn.style.display = 'none';

// Trigger image upload on button click
editImageBtn.addEventListener('click', function() {
    avatarInput.click();
});

// Change profile picture on file selection
avatarInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newAvatarSrc = e.target.result;
            updateProfilePicture(newAvatarSrc);
            
            // Save avatar to localStorage with the specific username
            saveAvatarToStorage(newAvatarSrc, username);

            // Show delete icon after image selection
            deleteAvatarIcon.style.display = 'inline-block';
            saveAvatarBtn.style.display = 'inline-block';
        };
        reader.readAsDataURL(file);
    }
});

// Save button functionality
saveAvatarBtn.addEventListener('click', function() {
    // hide the button after clicking "Save"
    saveAvatarBtn.style.display = 'none';
    alert('Avatar saved successfully.');
});

// Delete button functionality
deleteAvatarIcon.addEventListener('click', function() {
    //delete the avatar
    localStorage.removeItem(`avatar_${username}`);
    alert('Avatar deleted successfully.');
    deleteAvatarIcon.style.display = 'none';
    saveAvatarBtn.style.display = 'none';
    updateProfilePicture(placeholderImage); // Show placeholder image after deletion
});

// Load the avatar when the page loads
window.addEventListener('load', function() {
    loadAvatarFromStorage(username);
});
