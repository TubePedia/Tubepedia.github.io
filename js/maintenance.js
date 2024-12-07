function showMaintenanceMessage() {
    // Xóa toàn bộ nội dung hiện có trong body
    document.body.innerHTML = '';

    // Tạo overlay
    const overlay = document.createElement('div');
    overlay.id = 'maintenance-overlay';
    overlay.className = 'overlay';

    // Chuẩn bị thông điệp đa ngôn ngữ
    const messages = {
        vi: 'Trang web đang bảo trì, vui lòng quay lại sau.',
        en: 'Website is under maintenance, please come back later.',
        es: 'La página web está en mantenimiento, por favor regrese más tarde.',
        default: 'Website under maintenance, please come back later.'
    };

    // Lấy thông điệp dựa trên ngôn ngữ trình duyệt
    const userLang = (navigator.language || navigator.userLanguage || '').split('-')[0];
    const message = messages[userLang] || messages.default;

    // Tạo nội dung
    overlay.innerHTML = `
        <div class="message-box" role="dialog" aria-labelledby="maintenance-title" aria-describedby="maintenance-message">
            <img src="https://img.icons8.com/ios-filled/50/ffffff/maintenance.png" alt="Maintenance Icon" />
            <p id="maintenance-title" class="title">Maintenance</p>
            <p id="maintenance-message" class="message">${message}</p>
        </div>
    `;

    // Thêm overlay vào DOM
    document.body.appendChild(overlay);
}

// Thêm CSS bằng JavaScript
function addMaintenanceStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .message-box {
            text-align: center;
            color: #fff;
            font-size: 24px;
            padding: 20px;
            background-color: #333;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
        }
        .message-box img {
            margin-bottom: 10px;
        }
        .message-box .title {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .message-box .message {
            font-size: 20px;
        }
    `;
    document.head.appendChild(style);
}

// Gọi hàm khi tải trang
window.onload = function () {
    addMaintenanceStyles();
    showMaintenanceMessage();
};