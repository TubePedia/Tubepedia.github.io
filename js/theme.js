window.onload = function() {
    const settingsButton = document.getElementById('settings-button');
    const settingsPopup = document.getElementById('settings-popup');
    const closePopupButton = document.getElementById('close-popup');
    const themeSelect = document.getElementById('theme');
    const topButtonImage = document.querySelector('#topBtn img'); // Lấy phần tử hình ảnh

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
            topButtonImage.src = "https://lh3.googleusercontent.com/pw/AP1GczODCFmHt1qLFhf925sJ8_8DDrKc3roq1_dywm52wpr8Ey2G9WqSnDr4lUbVczeFfn1VnCFA-iC64YJ8SVrPoB-KKFPZ2YlUK_O1wnTm3uzm11UTh9X5UzxIkd6KOV0vdiP8xSZZERT8Qy6g4UCIvSdr=w200-h200-s-no-gm?authuser=0"; // Thay đổi đường dẫn tới biểu tượng màu trắng
        } else if (theme === 'light') {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
            topButtonImage.src = "https://lh3.googleusercontent.com/pw/AP1GczNrSpRLMcko9ckLj-72fJLwQrtt8K5OnuRV0-RhdGiE6yjTkZ-kkkM4_Ze7Sy1NIJ_0TRGoece_H9fh5_GOJLUuMakhP-Bs67jHGeMncwwi_VSFXXNTnSbAKq_VlBRM1J0-zqf62-Jib_ZVPGmU364t=w200-h200-s-no-gm?authuser=0"; // Thay đổi đường dẫn tới biểu tượng màu đen
        } else if (theme === 'automatic') {
            const currentHour = new Date().getHours();
            if (currentHour >= 6 && currentHour < 18) {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        } else if (theme === 'system') {
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            applyTheme(prefersDark ? 'dark' : 'light');
        }
        localStorage.setItem('theme', theme);
        themeSelect.value = theme; // Cập nhật phần chọn để phản ánh chế độ đã chọn
    }

    // Load theme đã lưu hoặc mặc định là 'system'
    const savedTheme = localStorage.getItem('theme') || 'system';
    applyTheme(savedTheme);

    // Đảm bảo phần chọn phản ánh theme đã lưu
    themeSelect.value = savedTheme;

    // Mở popup cài đặt
    settingsButton.onclick = function() {
        settingsPopup.style.display = 'block';
    };

    // Đóng popup cài đặt
    closePopupButton.onclick = function() {
        settingsPopup.style.display = 'none';
    };

    // Xử lý chọn theme
    themeSelect.onchange = function() {
        applyTheme(this.value);
    };

    // Lắng nghe thay đổi trong sở thích hệ thống
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (themeSelect.value === 'system') {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
};