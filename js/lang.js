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
    // Thêm các trang khác tại đây nếu cần
  };

  // Hàm dò tìm ngôn ngữ trình duyệt
  function detectLanguage() {
    const lang = navigator.language || navigator.userLanguage;
    return lang.split('-')[0]; // Lấy mã ngôn ngữ (ví dụ "vi" từ "vi-VN")
  }

  // Hàm lấy tên trang hiện tại
  function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html'; // Mặc định là 'index.html'
  }

  // Hàm xử lý chuyển hướng ngôn ngữ
  function handleLanguageRedirection(lang) {
    const currentPage = getCurrentPage();

    // Kiểm tra xem trang hiện tại có hỗ trợ ngôn ngữ đã chọn không
    if (languageUrls[currentPage] && languageUrls[currentPage][lang]) {
      const newUrl = languageUrls[currentPage][lang];
      // Lưu ngôn ngữ vào localStorage và chuyển hướng
      localStorage.setItem('selectedLanguage', lang);
      if (window.location.href !== newUrl) {
        window.location.href = newUrl;
      }
    } else {
      alert(`The selected language "${lang}" is not supported. Defaulting to English.`);
      // Đặt lại ngôn ngữ về tiếng Anh
      languageSelect.value = 'en';
      localStorage.setItem('selectedLanguage', 'en');
      // Chuyển hướng về trang tiếng Anh
      if (languageUrls[currentPage] && languageUrls[currentPage]['en']) {
        window.location.href = languageUrls[currentPage]['en'];
      } else {
        alert('No English version available for this page.');
      }
    }
  }

  if (settingsButton && settingsPopup && closePopup && languageSelect) {
    // Mở popup cài đặt
    settingsButton.addEventListener('click', () => {
      settingsPopup.style.display = 'block';
    });

    // Đóng popup cài đặt
    closePopup.addEventListener('click', () => {
      settingsPopup.style.display = 'none';
    });

    // Khi người dùng chọn ngôn ngữ khác
    languageSelect.addEventListener('change', (event) => {
      const selectedLanguage = event.target.value;
      handleLanguageRedirection(selectedLanguage);
    });

    // Kiểm tra ngôn ngữ đã lưu hoặc dò tìm ngôn ngữ trình duyệt
    const savedLanguage = localStorage.getItem('selectedLanguage') || detectLanguage() || 'en';
    languageSelect.value = savedLanguage;

    // Chuyển hướng nếu trang không khớp với ngôn ngữ đã lưu
    handleLanguageRedirection(savedLanguage);
  }
});