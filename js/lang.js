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
      'ko': 'indexko.html',
    },
    'about.html': {
      'en': 'about.html',
      'vi': 'aboutvi.html',
    },
    // Thêm các trang khác tại đây nếu cần
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
      const lang = navigator.language || navigator.userLanguage;
      const langCode = lang.split('-')[0]; // Lấy mã ngôn ngữ (vd: "vi" từ "vi-VN")
      return langCode;
    }

    // Xử lý khi chọn ngôn ngữ
    languageSelect.addEventListener('change', (event) => {
      const lang = event.target.value;
      const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại

      // Kiểm tra nếu có URL cho ngôn ngữ tương ứng
      if (languageUrls[currentPage] && languageUrls[currentPage][lang]) {
        const newUrl = languageUrls[currentPage][lang]; // Lấy URL mới từ đối tượng

        // Lưu ngôn ngữ vào localStorage và chuyển hướng
        localStorage.setItem('selectedLanguage', lang);
        window.location.href = newUrl;
      } else {
        // Nếu không có URL cho ngôn ngữ được chọn, chuyển về trang tiếng Anh
        alert(`The selected language "${lang}" is not supported. Defaulting to English.`);
        
        languageSelect.value = 'en'; // Đặt lại ngôn ngữ về tiếng Anh
        localStorage.setItem('selectedLanguage', 'en');
        
        // Kiểm tra và chuyển hướng đến phiên bản tiếng Anh nếu có
        if (languageUrls[currentPage] && languageUrls[currentPage]['en']) {
          window.location.href = languageUrls[currentPage]['en'];
        } else {
          alert(`No English version available for this page.`);
        }
      }
    });

    // Kiểm tra ngôn ngữ đã lưu trong localStorage hoặc dò tìm ngôn ngữ
    const savedLang = localStorage.getItem('selectedLanguage') || detectLanguage() || 'en';
    languageSelect.value = savedLang;

    const currentPage = window.location.pathname.split('/').pop(); // Lấy tên trang hiện tại

    // Nếu trang hiện tại không khớp với ngôn ngữ đã lưu
    if (languageUrls[currentPage] && !window.location.href.includes(languageUrls[currentPage][savedLang])) {
      const newUrl = languageUrls[currentPage][savedLang];
      if (newUrl) {
        window.location.href = newUrl; // Chuyển hướng đến URL tương ứng
      } else {
        alert('No version of this page is available for the selected language.');
      }
    }
  }
});