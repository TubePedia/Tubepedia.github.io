// Language redirection logic
const languageMap = {
    'en': {
        'index.html': 'index.html',
        'policies/terms-of-use.html': 'policies/terms-of-use.html',
    },
    'vi': {
        'index.html': 'indexvi.html',
        'policies/terms-of-use.html': 'policies/terms-of-usevi.html',
    },
    // Add other languages similarly
};

const currentPage = window.location.pathname.split('/').pop();
const languageSelector = document.getElementById('language');

languageSelector.addEventListener('change', (event) => {
    const selectedLanguage = event.target.value;
    let redirectPage = '';

    // Check if the current page exists in the selected language
    if (languageMap[selectedLanguage]) {
        redirectPage = languageMap[selectedLanguage][currentPage] || languageMap['en'][currentPage];
    } else {
        // If the selected language doesn't exist, fallback to English
        redirectPage = languageMap['en'][currentPage];
        alert('Ngôn ngữ này không có, chuyển sang Tiếng Anh.');
    }

    if (redirectPage) {
        window.location.href = redirectPage;
    }
});

// Show/Hide settings popup
document.getElementById('settings-button').onclick = () => {
    document.getElementById('settings-popup').style.display = 'block';
};

document.getElementById('close-popup').onclick = () => {
    document.getElementById('settings-popup').style.display = 'none';
};

// Auto-detect language and set the selector
const userLanguage = navigator.language || navigator.userLanguage;
const defaultLanguage = userLanguage.split('-')[0];
if (languageMap[defaultLanguage]) {
    languageSelector.value = defaultLanguage;
}