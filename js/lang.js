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
        const currentPage = window.location.pathname.split("/").pop(); // Lấy tên trang hiện tại (vd: index.html)
        if (supportedLanguages[currentPage] && supportedLanguages[currentPage][lang]) {
            const targetPage = supportedLanguages[currentPage][lang];
            if (currentPage !== targetPage) {
                window.location.href = targetPage;
            }
        }
    }
});