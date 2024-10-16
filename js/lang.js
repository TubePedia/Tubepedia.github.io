document.addEventListener("DOMContentLoaded", function () {
    // Danh sách các trang và các ngôn ngữ tương ứng
const languagePages = {
    'index.html': {
        'en': 'index.html',
        'vi': 'indexvi.html'
    },
    '/policies/terms-of-use.html': {
        'en': '/policies/terms-of-use.html',
        'vi': '/policies/terms-of-usevi.html'
    }
};

// Hàm lấy trang hiện tại
function getCurrentPage() {
    const path = window.location.pathname;
    return path.endsWith('.html') ? path : `${path}.html`;
}

// Hàm chuyển hướng dựa trên ngôn ngữ
function redirectToLanguage(language) {
    const currentPage = getCurrentPage();
    
    // Kiểm tra xem trang hiện tại có trong danh sách không
    if (languagePages[currentPage]) {
        const langPage = languagePages[currentPage][language];

        if (langPage) {
            // Nếu có trang cho ngôn ngữ đã chọn, chuyển hướng tới trang đó
            window.location.href = langPage;
        } else {
            // Nếu không có trang cho ngôn ngữ đó, chuyển hướng tới tiếng Anh và báo lỗi
            alert('Ngôn ngữ này không có, chuyển về English.');
            window.location.href = languagePages[currentPage]['en'];
        }
    } else {
        // Nếu trang hiện tại không có trong danh sách, kiểm tra trường hợp không có .html
        if (currentPage.endsWith('index.html')) {
            // Trang index, điều chỉnh nếu URL không có đuôi
            window.location.href = '/' + language + '/index.html';
        } else {
            // Báo lỗi và chuyển hướng tới trang tiếng Anh
            alert('Trang hiện tại không hỗ trợ chuyển đổi ngôn ngữ.');
        }
    }
}

// Mở và đóng popup
const settingsButton = document.getElementById('settings-button');
const settingsPopup = document.getElementById('settings-popup');
const closePopup = document.getElementById('close-popup');

settingsButton.addEventListener('click', () => {
    settingsPopup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
    settingsPopup.style.display = 'none';
});

// Xử lý sự kiện thay đổi ngôn ngữ
document.getElementById('language').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    redirectToLanguage(selectedLanguage);
});

// Khi trang được tải, kiểm tra ngôn ngữ trong URL
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const language = urlParams.get('lang');

    if (language) {
        redirectToLanguage(language);
    }
};