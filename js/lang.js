document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settings-button');
    const settingsPopup = document.getElementById('settings-popup');
    const closePopup = document.getElementById('close-popup');
    const languageSelect = document.getElementById('language');

    if (settingsButton && settingsPopup && closePopup && languageSelect) {
        // Mở popup cài đặt
        settingsButton.addEventListener('click', () => {
            settingsPopup.style.display = 'block';
        });

        // Đóng popup cài đặt
        closePopup.addEventListener('click', () => {
            settingsPopup.style.display = 'none';
        });

        // Hàm phát hiện ngôn ngữ
        function detectLanguage() {
            const lang = navigator.language || navigator.userLanguage; // Dò tìm ngôn ngữ
            return lang.split('-')[0]; // Lấy mã ngôn ngữ (ví dụ: "vi" từ "vi-VN")
        }

        // Xử lý khi chọn ngôn ngữ
        languageSelect.addEventListener('change', (event) => {
            const lang = event.target.value;
            const currentUrl = window.location.pathname;
            let newUrl;

            // Chuyển đổi URL dựa trên ngôn ngữ đã chọn
            if (lang === 'en') {
                // Khi chọn tiếng Anh, bỏ phần id ngôn ngữ cũ nếu có
                newUrl = currentUrl.replace(/\/(vi|es|fr|pt|ru|de|ja|ko|it)(\.html)?$/, ''); // Xóa ngôn ngữ cuối cùng
                if (newUrl === '' || newUrl === '/' || newUrl === 'indexvi.html') {
                    newUrl = 'index.html'; // Chuyển về trang gốc
                }
            } else {
                // Chuyển sang trang ngôn ngữ tương ứng
                const baseUrl = currentUrl.replace(/\/(vi|es|fr|pt|ru|de|ja|ko|it)(\.html)?$/, ''); // Loại bỏ ngôn ngữ cũ
                newUrl = `${baseUrl}/${lang}.html`; // Thêm ngôn ngữ mới vào đường dẫn
            }

            // Chuyển hướng
            window.location.href = newUrl;
            localStorage.setItem('selectedLanguage', lang);
        });

        // Kiểm tra ngôn ngữ đã lưu trong localStorage hoặc dò tìm ngôn ngữ
        const savedLang = localStorage.getItem('selectedLanguage') || detectLanguage() || 'en';
        languageSelect.value = savedLang;

        const currentUrl = window.location.pathname;

        // Kiểm tra và chuyển hướng nếu chưa có ID ngôn ngữ trong URL
        if (savedLang !== 'en') {
            if (!currentUrl.includes(`/${savedLang}.html`)) {
                let newUrl;
                if (currentUrl === '/' || currentUrl === '' || currentUrl.includes('index.html')) {
                    newUrl = `index${savedLang}.html`; // Chuyển hướng sang trang ngôn ngữ
                } else {
                    const baseUrl = currentUrl.replace(/\.html$/, ''); // Loại bỏ .html nếu có
                    newUrl = `${baseUrl}/${savedLang}.html`;
                }
                window.location.href = newUrl;
            }
        }

        // Kiểm tra nếu URL không có "index" và bổ sung "index.html" nếu cần
        if (!currentUrl.includes('index') && (currentUrl === '/' || currentUrl === '')) {
            window.location.href = 'index.html'; // Chuyển hướng đến index.html
        }
    }
});