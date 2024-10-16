// script.js
document.getElementById('settings-button').onclick = function() {
    document.getElementById('settings-popup').style.display = 'block';
};

document.getElementById('close-popup').onclick = function() {
    document.getElementById('settings-popup').style.display = 'none';
};

// Danh sách trang ngôn ngữ
const languagePages = {
    'en': {
        'index': 'index.html',
        'policies/terms-of-use': 'policies/terms-of-use.html',
    },
    'vi': {
        'index': 'indexvi.html',
        'policies/terms-of-use': 'policies/terms-of-usevi.html',
    },
    // Thêm các ngôn ngữ khác tương tự
};

// Chức năng chuyển đổi ngôn ngữ
document.getElementById('language').addEventListener('change', function() {
    const selectedLang = this.value;
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop().split('.')[0]; // Lấy tên file mà không có đuôi

    // Kiểm tra xem trang hiện tại có ngôn ngữ tương ứng trong danh sách không
    if (languagePages[selectedLang] && languagePages[selectedLang][currentPage]) {
        // Nếu đang ở đúng trang ngôn ngữ, không chuyển hướng
        if (currentPath === `/${languagePages[selectedLang][currentPage]}`) {
            alert('Bạn đã ở trang này.');
        } else {
            // Chuyển hướng đến trang ngôn ngữ đã chọn
            window.location.href = `/${languagePages[selectedLang][currentPage]}`;
        }
    } else {
        // Nếu không có trang tương ứng, chuyển về tiếng Anh và thông báo
        alert('Ngôn ngữ này không có, chuyển về tiếng Anh.');
        window.location.href = `/${languagePages['en'][currentPage] || 'index.html'}`;
    }
});

// Tự động phát hiện ngôn ngữ
const detectLanguage = () => {
    const userLang = navigator.language || navigator.userLanguage; // Dò tìm ngôn ngữ người dùng
    const langCode = userLang.split('-')[0]; // Lấy mã ngôn ngữ chính
    const languageSelect = document.getElementById('language');

    // Kiểm tra nếu ngôn ngữ được hỗ trợ
    if (languagePages[langCode]) {
        languageSelect.value = langCode; // Chọn ngôn ngữ tương ứng
    }
};

// Gọi hàm phát hiện ngôn ngữ khi tải trang
window.onload = detectLanguage;