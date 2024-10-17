document.addEventListener('DOMContentLoaded', function() {
    // Danh sách các trang và ngôn ngữ tương ứng
    const pages = {
        'index.html': {
            'en': 'index.html',
            'vi': 'index.html'
        },
        'wiki/YouTube.html': {
            'en': 'wiki/YouTube.html',
            'vi': 'wiki/YouTubevi.html'
        }
    };

    // Lấy ngôn ngữ từ localStorage hoặc dò ngôn ngữ trình duyệt
    let language = localStorage.getItem('language') || navigator.language.split('-')[0];

    // Hàm kiểm tra trang hiện tại và điều hướng tới phiên bản ngôn ngữ tương ứng
    function redirectToLanguagePage() {
        let currentPath = window.location.pathname;
        let pageKey = currentPath.endsWith('.html') ? currentPath : currentPath + '.html';

        if (!pages[pageKey]) {
            console.warn('No language page found, redirecting to English.');
            pageKey = 'index.html'; // Mặc định nếu không có trang phù hợp
        }

        const languagePage = pages[pageKey][language] || pages[pageKey]['en'];
        if (currentPath !== '/' + languagePage) {
            window.location.href = '/' + languagePage;
        }
    }

    // Chuyển hướng khi vào trang lần đầu
    redirectToLanguagePage();

    // Xử lý khi người dùng chọn ngôn ngữ từ cài đặt
    const languageSelect = document.getElementById('language');
    languageSelect.value = language; // Đặt giá trị ngôn ngữ hiện tại
    languageSelect.addEventListener('change', function() {
        language = this.value;
        localStorage.setItem('language', language); // Lưu lại ngôn ngữ vào localStorage
        redirectToLanguagePage(); // Chuyển hướng tới trang ngôn ngữ mới
    });
