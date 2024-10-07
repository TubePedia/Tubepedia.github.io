document.addEventListener("DOMContentLoaded", function () {
    const languageSelect = document.getElementById("language");
    const supportedLanguages = {
        "index.html": {
            en: "index.html",
            vi: "indexvi.html"
        },
        "aboutme.html": {
            en: "aboutme.html",
            vi: "aboutmevi.html"
        }
    };

    // Kiểm tra xem ngôn ngữ có được lưu trong localStorage không
    const savedLanguage = localStorage.getItem("lang");
    if (savedLanguage) {
        languageSelect.value = savedLanguage; // Hiển thị ngôn ngữ đã lưu trong select
        // Kiểm tra và chuyển hướng đến ngôn ngữ đã lưu nếu không phải trang đúng
        redirectToLanguage(savedLanguage);
    } else {
        // Dò tìm ngôn ngữ trình duyệt và tự động chuyển hướng
        const browserLang = navigator.language.substring(0, 2); // Lấy mã ngôn ngữ đầu tiên, vd: 'en', 'vi'
        if (supportedLanguages["index.html"][browserLang]) {
            redirectToLanguage(browserLang);
        }
    }

    // Sự kiện thay đổi ngôn ngữ
    languageSelect.addEventListener("change", function () {
        const selectedLang = languageSelect.value;
        localStorage.setItem("lang", selectedLang);
        redirectToLanguage(selectedLang);
    });

    // Hàm để chuyển hướng đến trang ngôn ngữ tương ứng
    function redirectToLanguage(lang) {
        const currentPath = window.location.pathname; // Lấy đường dẫn hiện tại
        const currentPage = currentPath.split("/").pop(); // Lấy tên trang hiện tại (vd: index.html)

        // Kiểm tra nếu URL không có .html
        const cleanCurrentPage = currentPage.endsWith('.html') ? currentPage : currentPage || 'index.html';

        if (supportedLanguages[cleanCurrentPage] && supportedLanguages[cleanCurrentPage][lang]) {
            const targetPage = supportedLanguages[cleanCurrentPage][lang];
            if (cleanCurrentPage !== targetPage) {
                window.location.href = targetPage;
            }
        }
    }

    // Kiểm tra xem trang có đường dẫn gốc không có '.html' hay không
    if (!window.location.pathname.endsWith('.html') && window.location.pathname !== '/') {
        redirectToLanguage(savedLanguage || 'en'); // Chọn ngôn ngữ đã lưu hoặc mặc định là 'en'
    }
});