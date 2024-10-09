function showMaintenanceMessage() {
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 100)';
    overlay.style.zIndex = '1000';
    overlay.id = 'maintenance-overlay';

    const userLang = navigator.language || navigator.userLanguage; // Lấy ngôn ngữ
    let message;

    switch (userLang) {
        case 'vi':
            message = 'Trang web đang bảo trì, vui lòng quay lại sau.';
            break;
        case 'en':
            message = 'Website is under maintenance, please come back later.';
            break;
        case 'es':
            message = 'La página web está en mantenimiento, por favor regrese más tarde.';
            break;
        default:
            message = 'Website under maintenance, please come back later.';
            break;
    }

    const messageBox = document.createElement('div');
    messageBox.style.position = 'absolute';
    messageBox.style.top = '50%';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translate(-50%, -50%)';
    messageBox.style.color = '#fff';
    messageBox.style.textAlign = 'center';
    messageBox.style.fontSize = '24px';
    messageBox.style.padding = '20px';
    messageBox.style.backgroundColor = '#333';
    messageBox.style.borderRadius = '8px';
    messageBox.innerHTML = `
        <img src="https://img.icons8.com/ios-filled/50/ffffff/maintenance.png" alt="Maintenance Icon"/>
        <p>${message}</p>
    `;

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);
}

window.onload = function() {
    showMaintenanceMessage();
};