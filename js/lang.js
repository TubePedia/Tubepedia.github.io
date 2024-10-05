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

    // Hàm phát hiện ngôn ngữ trình duyệt
    function detectLanguage() {
      const lang = navigator.language || navigator.userLanguage; // Dò tìm ngôn ngữ
      const langCode = lang.split('-')[0]; // Lấy mã ngôn ngữ (ví dụ: "vi" từ "vi-VN")
      return langCode;
    }

    // Xử lý khi chọn ngôn ngữ
    languageSelect.addEventListener('change', (event) => {
      const lang = event.target.value;
      const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại

      // Kiểm tra nếu có URL cho ngôn ngữ tương ứng
      if (languageUrls[currentPage] && languageUrls[currentPage][lang]) {
        const newUrl = languageUrls[currentPage][lang]; // Lấy URL mới từ đối tượng

        if (window.location.href.includes(newUrl)) {
          // Nếu trang hiện tại đã đúng với ngôn ngữ đã chọn, không chuyển hướng
          alert(`You are already on the ${lang.toUpperCase()} version of this page.`);
        } else {
          // Nếu chưa ở trang đúng, lưu ngôn ngữ và chuyển hướng
          localStorage.setItem('selectedLanguage', lang);
          window.location.href = newUrl;
        }
      } else {
        // Nếu không có URL cho ngôn ngữ được chọn
        const availableLanguages = Object.keys(languageUrls[currentPage] || {}).join(', ');
        alert(`The selected language "${lang}" is not supported for this page. Available languages are: ${availableLanguages}.`);
      }
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

    // Nếu không phải tiếng Anh và URL hiện tại không khớp với ngôn ngữ đã lưu
    if (savedLang !== 'en' && !window.location.href.includes(languageUrls[currentPage][savedLang])) {
      window.location.href = languageUrls[currentPage][savedLang]; // Chuyển hướng đến URL tương ứng
    }
  }
});