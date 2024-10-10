// Định nghĩa các văn bản thông báo tìm kiếm bằng nhiều ngôn ngữ
const searchMessages = {
    en: {
        noResults: "No results found",
        enterKeyword: "Please enter search keyword",
        resultsHere: "Results here "
    },
    vi: {
        noResults: "Không có kết quả",
        enterKeyword: "Vui lòng nhập từ khóa tìm kiếm",
        resultsHere: "Kết quả"
    },
    es: {
        noResults: "No se encontraron resultados",
        enterKeyword: "Por favor ingrese palabra clave",
        resultsHere: "Resultados aquí"
    },
    fr: {
        noResults: "Aucun résultat trouvé",
        enterKeyword: "Veuillez entrer un mot clé",
        resultsHere: "Résultats ici"
    },
    pt: {
        noResults: "Nenhum resultado encontrado",
        enterKeyword: "Por favor, insira a palavra-chave",
        resultsHere: "Resultados aqui"
    },
    ru: {
        noResults: "Результаты не найдены",
        enterKeyword: "Пожалуйста, введите ключевое слово",
        resultsHere: "Результаты здесь"
    },
    de: {
        noResults: "Keine Ergebnisse gefunden",
        enterKeyword: "Bitte Suchbegriff eingeben",
        resultsHere: "Ergebnisse hier"
    },
    ja: {
        noResults: "結果が見つかりません",
        enterKeyword: "検索キーワードを入力してください",
        resultsHere: "結果はこちら"
    },
    ko: {
        noResults: "결과를 찾을 수 없습니다",
        enterKeyword: "검색 키워드를 입력하세요",
        resultsHere: "결과 여기"
    },
    it: {
        noResults: "Nessun risultato trovato",
        enterKeyword: "Si prega di inserire la parola chiave di ricerca",
        resultsHere: "Risultati qui"
    },
    // Thêm ngôn ngữ mới nếu cần
    zh: {
        noResults: "未找到结果",
        enterKeyword: "请输入搜索关键字",
        resultsHere: "结果在这里"
    },
    ar: {
        noResults: "لم يتم العثور على نتائج",
        enterKeyword: "يرجى إدخال كلمة البحث",
        resultsHere: "النتائج هنا"
    }
};

// Tự động lấy ngôn ngữ của thiết bị hoặc trình duyệt
const userLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
const messages = searchMessages[userLanguage] || searchMessages['en'];

// Danh sách các trang wiki với tiêu đề và đường dẫn
const wikiPages = [
    { title: "Dino Sakura - Vtuber", url: "/html/wiki/vi/DinoSakura.html" },
    { title: "Trang 2", url: "/trang2.html" },
    { title: "Trang 3", url: "/trang3.html" }
];

// Hàm tìm kiếm
function searchWiki() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const resultsList = document.getElementById("resultsList");
    resultsList.innerHTML = ""; // Xóa kết quả cũ

    // Kiểm tra nếu ô tìm kiếm trống
    if (query.trim() === "") {
        resultsList.innerHTML = `<li>${messages.enterKeyword}</li>`;
        document.getElementById("searchResults").style.display = "block";
        return;
    }

    let found = false;

    // Tìm kiếm các trang wiki
    wikiPages.forEach(page => {
        if (page.title.toLowerCase().includes(query)) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = page.url;
            link.textContent = page.title;
            listItem.appendChild(link);
            resultsList.appendChild(listItem);
            found = true;
        }
    });

    // Hiển thị kết quả hoặc thông báo không tìm thấy
    if (found) {
    resultsList.innerHTML += `<li>${messages.resultsHere}</li>`;
        document.getElementById("searchResults").style.display = "block";
    } else {
        resultsList.innerHTML = `<li>${messages.noResults}</li>`;
        document.getElementById("searchResults").style.display = "block";
    }
}

// Sự kiện nhấn nút tìm kiếm
document.getElementById("searchButton").addEventListener("click", searchWiki);

// Sự kiện nhấn phím Enter để tìm kiếm
document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchWiki();
    }
});

// Lấy phần tử nút "Back to Top"
const topButton = document.getElementById('topBtn');

// Khi người dùng cuộn 20px từ trên xuống, hiển thị nút
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

// Khi nhấn vào nút, cuộn lên đầu trang với hiệu ứng mượt mà
topButton.addEventListener('click', function(event) {
    event.preventDefault(); // Ngăn việc chuyển trang do thuộc tính href
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Hiệu ứng cuộn mượt mà
    });
});

// Cập nhật bản quyền tự động theo năm hiện tại
function updateCopyright() {
    const currentYear = new Date().getFullYear();
    const copyrightText = `Copyright © 2021 - ${currentYear}`;
    document.getElementById('copyright').textContent = copyrightText;
}

updateCopyright();

// Lấy thời gian cập nhật cuối cùng từ document
const lastUpdated = new Date(document.lastModified);

// Hàm kiểm tra múi giờ người dùng để định dạng giờ 12h hoặc 24h
function is24HourFormat() {
    const userLocale = navigator.language || 'en-US'; // Lấy ngôn ngữ của người dùng
    const region = userLocale.split('-')[1] || 'US'; // Lấy quốc gia
    const regions24Hour = ['VN', 'FR', 'DE', 'RU', 'CN']; // Các quốc gia sử dụng định dạng 24h

    return regions24Hour.includes(region);
}

// Định nghĩa bản dịch đa ngôn ngữ
const translations = {
    en: {
        lastUpdated: 'Last updated by admin:',
        updatedAgo: 'Updated',
        secondsAgo: 'seconds ago',
        minutesAgo: 'minutes ago',
        hoursAgo: 'hours ago',
        daysAgo: 'days ago'
    },
    vi: {
        lastUpdated: 'Cập nhật lần cuối bởi quản trị viên:',
        updatedAgo: 'Cập nhật cách đây',
        secondsAgo: 'vài giây trước',
        minutesAgo: 'phút trước',
        hoursAgo: 'giờ trước',
        daysAgo: 'ngày trước'
    },
    fr: {
        lastUpdated: 'Dernière mise à jour par l\'admin:',
        updatedAgo: 'Mis à jour il y a',
        secondsAgo: 'secondes',
        minutesAgo: 'minutes',
        hoursAgo: 'heures',
        daysAgo: 'jours'
    }
};

// Lấy ngôn ngữ người dùng cho phần cập nhật cuối cùng
const currentLanguage = navigator.language.split('-')[0]; // Lấy phần đầu của ngôn ngữ, ví dụ: "en" từ "en-US"
const lang = translations[currentLanguage] ? currentLanguage : 'en'; // Nếu không có ngôn ngữ thì mặc định là tiếng Anh

// Định dạng thời gian theo quốc gia
const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: !is24HourFormat(), // Sử dụng 24h hay 12h dựa trên quốc gia
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
};

// Chuyển đổi thành chuỗi theo định dạng
const formattedDate = lastUpdated.toLocaleString(navigator.language, options);

// Tính thời gian hiện tại trừ thời gian cập nhật cuối
function timeSinceLastUpdate(lastUpdate) {
    const now = new Date();
    const timeDiff = now - lastUpdate;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
        return `${days} ${translations[lang].daysAgo}`;
    } else if (hours > 0) {
        return `${hours} ${translations[lang].hoursAgo}`;
    } else if (minutes > 0) {
        return `${minutes} ${translations[lang].minutesAgo}`;
    } else {
        return `${translations[lang].secondsAgo}`;
    }
}

// Chèn vào phần tử HTML khi trang tải
document.addEventListener("DOMContentLoaded", function() {
    const updateElement = document.getElementById('last-update');
    const timePassedElement = document.getElementById('time-passed');

    // Hiển thị thời gian cập nhật cuối cùng
    updateElement.textContent = `${translations[lang].lastUpdated} ${formattedDate}`;

    // Hiển thị thời gian đã trôi qua từ lần cập nhật cuối
    timePassedElement.textContent = `${translations[lang].updatedAgo}: ${timeSinceLastUpdate(lastUpdated)}`;
});

document.addEventListener("DOMContentLoaded", function() {
            const link = document.querySelector(".link");
            const popup = document.getElementById("popup");
            const safetyMessage = document.getElementById("safetyMessage");
            const openLink = document.getElementById("openLink");
            const copyLink = document.getElementById("copyLink");
            const popupTitle = document.getElementById("popupTitle");

            // Danh sách các trang web uy tín
            const trustedSites = [
                "example.com",
                "google.com",
                "wikipedia.org",
                "github.com",
                "youtube.com",
                "facebook.com",
                "instagram.com",
                "twitter.com",
                "x.com",
                "linkedin.com",
                "tiktok.com",
                "pinterest.com",
                "snapchat.com",
                "reddit.com",
                "tumblr.com",
                "whatsapp.com",
                "discord.com",
                "wechat.com",
                "vimeo.com",
                "quora.com",
                "chatgpt.com",
                "openai.com",
                "ai.google",
                "microsoft.com/en-us/ai",
                "ibm.com/watson",
                "huggingface.co",
                "deepmind.com",
                "chat.openai.com",
                "chatgpt.com",
                "nvidia.com/en-us/deep-learning-ai",
                "c3.ai",
                "aidungeon.io",
                "runwayml.com",
                "lattice.ai",
                "wikipedia.org",
                "fandom.com",
                "mail.google.com",
                "drive.google.com",
                "docs.google.com",
                "sheets.google.com",
                "slides.google.com",
                "calendar.google.com",
                "maps.google.com",
                "photos.google.com",
                "keep.google.com",
                "meet.google.com",
                "play.google.com",
                "tubepedia.github.io"
            ];

            // Tự động chọn ngôn ngữ dựa trên ngôn ngữ trình duyệt
            const userLang = navigator.language || navigator.userLanguage;

            // Đối tượng ngôn ngữ
            const translations = {
                "en": {
                    "checkingSafety": "Checking safety...",
                    "safe": "This link is safe.",
                    "unsafe": "This link is unsafe.",
                    "openLink": "Open link",
                    "copyLink": "Copy link",
                    "copied": "Link has been copied!"
                },
                "vi": {
                    "checkingSafety": "Đang kiểm tra an toàn...",
                    "safe": "Liên kết này an toàn.",
                    "unsafe": "Liên kết này không an toàn.",
                    "openLink": "Mở liên kết",
                    "copyLink": "Sao chép liên kết",
                    "copied": "Liên kết đã được sao chép!"
                },
                "es": {
    "checkingSafety": "Verificando seguridad...",
    "safe": "Este enlace es seguro.",
    "unsafe": "Este enlace no es seguro.",
    "openLink": "Abrir enlace",
    "copyLink": "Copiar enlace",
    "copied": "¡El enlace ha sido copiado!"
},
"fr": {
    "checkingSafety": "Vérification de la sécurité...",
    "safe": "Ce lien est sûr.",
    "unsafe": "Ce lien n'est pas sûr.",
    "openLink": "Ouvrir le lien",
    "copyLink": "Copier le lien",
    "copied": "Le lien a été copié !"
},
"pt": {
    "checkingSafety": "Verificando segurança...",
    "safe": "Este link é seguro.",
    "unsafe": "Este link não é seguro.",
    "openLink": "Abrir link",
    "copyLink": "Copiar link",
    "copied": "O link foi copiado!"
},
"ru": {
    "checkingSafety": "Проверка безопасности...",
    "safe": "Эта ссылка безопасна.",
    "unsafe": "Эта ссылка небезопасна.",
    "openLink": "Открыть ссылку",
    "copyLink": "Скопировать ссылку",
    "copied": "Ссылка скопирована!"
},
"de": {
    "checkingSafety": "Sicherheit prüfen...",
    "safe": "Dieser Link ist sicher.",
    "unsafe": "Dieser Link ist unsicher.",
    "openLink": "Link öffnen",
    "copyLink": "Link kopieren",
    "copied": "Link wurde kopiert!"
},
"ja": {
    "checkingSafety": "安全性を確認しています...",
    "safe": "このリンクは安全です。",
    "unsafe": "このリンクは安全ではありません。",
    "openLink": "リンクを開く",
    "copyLink": "リンクをコピー",
    "copied": "リンクがコピーされました！"
},
"ko": {
    "checkingSafety": "안전성 확인 중...",
    "safe": "이 링크는 안전합니다.",
    "unsafe": "이 링크는 안전하지 않습니다.",
    "openLink": "링크 열기",
    "copyLink": "링크 복사",
    "copied": "링크가 복사되었습니다!"
},
"it": {
    "checkingSafety": "Controllo della sicurezza...",
    "safe": "Questo link è sicuro.",
    "unsafe": "Questo link non è sicuro.",
    "openLink": "Apri link",
    "copyLink": "Copia link",
    "copied": "Il link è stato copiato!"
},
"ar": {
    "checkingSafety": "جارٍ التحقق من الأمان...",
    "safe": "هذا الرابط آمن.",
    "unsafe": "هذا الرابط غير آمن.",
    "openLink": "فتح الرابط",
    "copyLink": "نسخ الرابط",
    "copied": "تم نسخ الرابط!"
}
            };

            // Chọn ngôn ngữ dựa trên ngôn ngữ trình duyệt, mặc định là tiếng Anh
            const lang = translations[
    userLang.includes("vi") ? "vi" :
    userLang.includes("es") ? "es" :
    userLang.includes("fr") ? "fr" :
    userLang.includes("pt") ? "pt" :
    userLang.includes("ru") ? "ru" :
    userLang.includes("de") ? "de" :
    userLang.includes("ja") ? "ja" :
    userLang.includes("ko") ? "ko" :
    userLang.includes("it") ? "it" :
    userLang.includes("ar") ? "ar" :
    "en"
];

            // Cập nhật văn bản dựa trên ngôn ngữ đã chọn
            safetyMessage.textContent = lang.checkingSafety;
            openLink.textContent = lang.openLink;
            copyLink.textContent = lang.copyLink;

            link.addEventListener("click", function(event) {
                event.preventDefault();
                const url = link.getAttribute("data-url");

                // Hiển thị popup tại vị trí của liên kết
                const rect = link.getBoundingClientRect();
                popup.style.top = rect.bottom + "px";
                popup.style.left = rect.left + "px";
                popup.style.display = "block";

                // Cập nhật tiêu đề với tên miền
                const domain = new URL(url).hostname; // Lấy tên miền từ URL
                popupTitle.textContent = domain + "/"; // Cập nhật tiêu đề

                // Cập nhật hành động cho các nút
                openLink.href = url;

                // Kiểm tra an toàn liên kết
                checkLinkSafety(url);
                
                copyLink.onclick = function() {
                    navigator.clipboard.writeText(url);
                    alert(lang.copied);
                };
            });

            // Hàm kiểm tra an toàn liên kết dựa trên danh sách các URL uy tín
            function checkLinkSafety(url) {
                const isSafe = trustedSites.some(trustedSite => url.includes(trustedSite));

                if (isSafe) {
                    safetyMessage.textContent = lang.safe;
                    safetyMessage.classList.add("safe");
                    safetyMessage.classList.remove("unsafe");
                } else {
                    safetyMessage.textContent = lang.unsafe;
                    safetyMessage.classList.add("unsafe");
                    safetyMessage.classList.remove("safe");
                }
            }

            // Đóng popup khi nhấp bên ngoài
            document.addEventListener("click", function(event) {
                if (!popup.contains(event.target) && event.target !== link) {
                    popup.style.display = "none";
                }
            });
        });