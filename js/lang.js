// script.js
document.getElementById('settings-button').onclick = function() {
    document.getElementById('settings-popup').style.display = 'block';
};

document.getElementById('close-popup').onclick = function() {
    document.getElementById('settings-popup').style.display = 'none';
};

// Danh sách trang ngôn ngữ
const languagePages = {
    'index.html': {
        'en': 'index.html',
        'vi': 'indexvi.html',
    },
    'policies/terms-of-use.html': {
        'en': 'policies/terms-of-use.html',
        'vi': 'policies/terms-of-usevi.html',
    },
    // Thêm các trang khác tương tự
};

// Chức năng chuyển đổi ngôn ngữ
document.getElementById('language').addEventListener('change', function() {
    const selectedLang = this.value;
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop(); // Lấy tên file bao gồm đuôi

    // Kiểm tra xem trang hiện tại có ngôn ngữ tương ứng trong danh sách không
    if (languagePages[currentPage] && languagePages[currentPage][selectedLang]) {
        // Nếu đang ở đúng trang ngôn ngữ, không chuyển hướng
        if (currentPath === `/${languagePages[currentPage][selectedLang]}`) {
            alert('Bạn đã ở trang này.');
        } else {
            // Chuyển hướng đến trang ngôn ngữ đã chọn
            window.location.href = `/${languagePages[currentPage][selectedLang]}`;
        }
    } else {
        // Nếu không có trang tương ứng, chuyển về tiếng Anh và thông báo
        alert('Ngôn ngữ này không có, chuyển về tiếng Anh.');
        window.location.href = `/${languagePages[currentPage]['en'] || 'index.html'}`;
    }
});

// Tự động phát hiện ngôn ngữ
const detectLanguage = () => {
    const userLang = navigator.language || navigator.userLanguage; // Dò tìm ngôn ngữ người dùng
    const langCode = userLang.split('-')[0]; // Lấy mã ngôn ngữ chính
    const languageSelect = document.getElementById('language');

    // Kiểm tra nếu ngôn ngữ được hỗ trợ
    if (languagePages[Object.keys(languagePages).find(page => currentPath.includes(page))]) {
        languageSelect.value = langCode; // Chọn ngôn ngữ tương ứng
    }
};

// Gọi hàm phát hiện ngôn ngữ khi tải trang
window.onload = detectLanguage;