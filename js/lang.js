document.addEventListener('DOMContentLoaded', () => {
  const settingsButton = document.getElementById('settings-button');
  const settingsPopup = document.getElementById('settings-popup');
  const closePopup = document.getElementById('close-popup');
  const languageSelect = document.getElementById('language');

  // Đối tượng chứa URL của từng trang theo ngôn ngữ
  const languageUrls = {
    'index.html': {
      'en': 'index.html',
      'en': '',
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

    // Hàm dịch văn bản
    function translateText(text) {
      const lang = localStorage.getItem('selectedLanguage') || detectLanguage() || 'en';
      const translations = {
        'en': {
          'Please enter search keyword': 'Please enter search keyword'
        },
        'vi': {
          'Please enter search keyword': 'Vui lòng nhập từ khóa tìm kiếm'
        },
        // Thêm các ngôn ngữ khác tại đây
      };
      return translations[lang][text] || text; // Trả về văn bản gốc nếu không có bản dịch
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
        // Nếu không có URL mới, giữ nguyên URL hiện tại
        newUrl = currentPage;
      }

      // Chuyển hướng
      window.location.href = newUrl;
      localStorage.setItem('selectedLanguage', lang);
    });

    // Kiểm tra ngôn ngữ đã lưu trong localStorage hoặc dò tìm ngôn ngữ
    const savedLang = localStorage.getItem('selectedLanguage') || detectLanguage() || 'en';
    languageSelect.value = savedLang;

    const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại
    if (savedLang !== 'en') {
      // Chuyển hướng đến ngôn ngữ đã lưu nếu không ở trang đúng
      if (!currentPage.includes(`${savedLang}.html`) && languageUrls[currentPage]) {
        window.location.href = languageUrls[currentPage][savedLang]; // Chuyển hướng đến URL tương ứng
      }
    }
  }
});