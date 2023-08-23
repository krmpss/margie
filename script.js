function redirectUser() {
    window.location.href = 'https://www.google.com/search?q=first+aid+kit&sca_esv=559317661&tbm=isch&sxsrf=AB5stBi2AkgjH-GY4e_Ti8kbwbwgCRAIfw:1692772876667&source=lnms&sa=X&ved=2ahUKEwjV4f6vlvKAAxWGJcAKHU14BlIQ_AUoAnoECAUQBA&biw=1745&bih=910&dpr=1.1';
}

document.getElementById('scrolling-text-content').textContent = 'Do you dare to come to the party?';
document.getElementById('tvVideo').play();

let videoElement = document.getElementById('tvVideo');
videoElement.setAttribute('loop', 'true');
videoElement.muted = true;  // this mutes the video, remove if you want sound
