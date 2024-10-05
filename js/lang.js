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
    'about.html': {
      'en': 'about.html',
      'vi': 'aboutvi.html',
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

    // Hàm kiểm tra URL theo trang
    function findPageUrl(page, lang) {
      if (languageUrls[page] && languageUrls[page][lang]) {
        return languageUrls[page][lang];
      } else if (languageUrls[page] && lang === 'en') {
        // Nếu ngôn ngữ là 'en' thì luôn tồn tại
        return languageUrls[page]['en'];
      } else {
        // Kiểm tra thông minh nếu trang không có ngôn ngữ khác ngoài 'en'
        if (languageUrls[page]) {
          alert(`The language "${lang}" for this page is not supported. Defaulting to English.`);
          return languageUrls[page]['en'];
        } else {
          alert('Page not found in any language. Redirecting to homepage.');
          return 'index.html';
        }
      }
    }

    // Xử lý khi chọn ngôn ngữ
    languageSelect.addEventListener('change', (event) => {
      const lang = event.target.value;
      const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại

      const newUrl = findPageUrl(currentPage, lang);
      localStorage.setItem('selectedLanguage', lang); // Lưu ngôn ngữ đã chọn

      // Chuyển hướng đến trang mới
      window.location.href = newUrl;
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

    // Chuyển hướng đến trang đúng ngôn ngữ nếu không phải tiếng Anh
    if (savedLang !== 'en') {
      const newUrl = findPageUrl(currentPage, savedLang);
      if (newUrl !== window.location.href) {
        window.location.href = newUrl; // Chuyển hướng đến URL tương ứng
      }
    }
  }
});