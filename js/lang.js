document.addEventListener('DOMContentLoaded', function () {
    const langSelect = document.getElementById('language');
    const supportedLanguages = {
        "index.html": {
            "en": "index.html",
            "vi": "indexvi.html"
        },
        "aboutme.html": {
            "en": "aboutme.html",
            "vi": "aboutmevi.html"
        }
    };

    // Lấy ngôn ngữ từ localStorage hoặc từ ngôn ngữ trình duyệt
    let userLang = localStorage.getItem('lang') || navigator.language.slice(0, 2);
    
    // Kiểm tra ngôn ngữ người dùng có trong danh sách hỗ trợ
    if (!langSelect.querySelector(`option[value="${userLang}"]`)) {
        userLang = 'en'; // Mặc định là tiếng Anh nếu không tìm thấy ngôn ngữ phù hợp
    }

    // Đặt ngôn ngữ đã chọn trong dropdown
    langSelect.value = userLang;

    // Xử lý sự kiện khi thay đổi ngôn ngữ
    langSelect.addEventListener('change', function () {
        const selectedLang = langSelect.value;
        localStorage.setItem('lang', selectedLang);
        const currentPage = window.location.pathname.split('/').pop();
        if (supportedLanguages[currentPage] && supportedLanguages[currentPage][selectedLang]) {
            window.location.href = supportedLanguages[currentPage][selectedLang];
        }
    });

    // Nếu lần đầu truy cập, tự động chuyển đến trang ngôn ngữ người dùng
    const currentPage = window.location.pathname.split('/').pop();
    if (supportedLanguages[currentPage] && supportedLanguages[currentPage][userLang]) {
        window.location.href = supportedLanguages[currentPage][userLang];
    }
});