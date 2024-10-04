document.addEventListener('DOMContentLoaded', () => {
  const settingsButton = document.getElementById('settings-button');
  const settingsPopup = document.getElementById('settings-popup');
  const closePopup = document.getElementById('close-popup');
  const languageSelect = document.getElementById('language');

  // Đối tượng chứa URL của từng trang theo ngôn ngữ
  const languageUrls = {
    'index.html': {
      'en': 'index.html',
      'vi': 'indexvi.html',
    },
    '404.html': {
      'en': '404.html',
      'vi': '404.html',
    },
    // Thêm các trang khác tại đây
  };

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
      const langCode = lang.split('-')[0]; // Lấy mã ngôn ngữ (ví dụ: "vi" từ "vi-VN")
      return langCode;
    }

    // Xử lý khi chọn ngôn ngữ
    languageSelect.addEventListener('change', (event) => {
      const lang = event.target.value;
      const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại
      let newUrl;

      // Kiểm tra nếu có URL cho ngôn ngữ tương ứng
      if (languageUrls[currentPage] && languageUrls[currentPage][lang]) {
        newUrl = languageUrls[currentPage][lang]; // Lấy URL mới từ đối tượng
      } else {
        // Nếu không có URL mới, hiển thị thông báo và chuyển ngôn ngữ về tiếng Anh
        alert('The language for this wiki is not supported or not yet available.');
        newUrl = languageUrls[currentPage] ? languageUrls[currentPage]['en'] : 'index.html'; // Chuyển về tiếng Anh
      }

      // Chuyển hướng
      window.location.href = newUrl;
      localStorage.setItem('selectedLanguage', lang);
    });

    // Kiểm tra ngôn ngữ đã lưu trong localStorage hoặc dò tìm ngôn ngữ
    const savedLang = localStorage.getItem('selectedLanguage') || detectLanguage() || 'en';
    languageSelect.value = savedLang;

    const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại

    // Điều chỉnh URL nếu không có .html
    if (!currentPage.endsWith('.html')) {
      const indexUrl = currentPage === '' || currentPage === 'index' ? 'index.html' : `${currentPage}.html`;
      window.location.href = indexUrl; // Chuyển hướng đến URL mới
      return; // Dừng xử lý thêm
    }

    if (savedLang !== 'en') {
      // Chuyển hướng đến ngôn ngữ đã lưu nếu không ở trang đúng
      if (!currentPage.includes(`${savedLang}.html`) && languageUrls[currentPage]) {
        window.location.href = languageUrls[currentPage][savedLang]; // Chuyển hướng đến URL tương ứng
      }
    }
  }
});