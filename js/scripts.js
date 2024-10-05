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

// Lấy ngôn ngữ người dùng
const userLanguage = navigator.language.split('-')[0]; // Lấy phần đầu của ngôn ngữ, ví dụ: "en" từ "en-US"
const lang = translations[userLanguage] ? userLanguage : 'en'; // Nếu không có ngôn ngữ thì mặc định là tiếng Anh

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