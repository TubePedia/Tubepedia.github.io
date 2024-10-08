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
(function () {
    // Định nghĩa các ngôn ngữ hỗ trợ
    const translations = {
        en: {
            areYouRobot: "Are you a robot?",
            verifying: "Verifying you're human. Please tick the box.",
            processing: "Processing...",
            securityCheck: "${domainName} needs to assess your connection security before continuing.",
            notRobot: "I am not a robot",
            timeoutMessage: "Please verify again!",
            authenticationSuccess: "Authentication successful",
        authenticationFailed: "Authentication failed please try again",
        authenticationConfirmed: "Authentication successful. Now you can view the website.",
            safeCaptcha: "This website is protected by SafeCaptcha."
        },
        vi: {
            areYouRobot: "Bạn có phải là robot không?",
            verifying: "Đang xác minh bạn là người. Bạn hãy tick vào ô.",
            processing: "Đang xử lý...",
            securityCheck: "${domainName} cần đánh giá tính bảo mật kết nối của bạn trước khi tiếp tục.",
            notRobot: "Tôi không phải là robot",
            timeoutMessage: "Vui lòng xác thực lại!",
            authenticationSuccess: "Xác thực thành công",
authenticationFailed: "Xác thực không thành công, vui lòng thử lại",
authenticationConfirmed: "Xác thực thành công. Bây giờ bạn có thể xem trang web.",
            safeCaptcha: "Trang web này được bảo vệ bởi SafeCaptcha."
        },
        es: {
        	areYouRobot: "¿Eres un robot?",
verifying: "Verificando que eres humano. Por favor, marca la casilla.",
processing: "Procesando...",
securityCheck: "${domainName} necesita evaluar la seguridad de tu conexión antes de continuar.",
notRobot: "No soy un robot",
timeoutMessage: "¡Por favor, verifica de nuevo!",
authenticationSuccess: "Autenticación exitosa",
authenticationFailed: "Autenticación fallida, por favor inténtelo de nuevo",
authenticationConfirmed: "Autenticación exitosa. Ahora puedes ver el sitio web.",
            safeCaptcha: "Este sitio web está protegido por SafeCaptcha."
        },
        fr: {
        	areYouRobot: "Êtes-vous un robot ?",
verifying: "Vérification que vous êtes humain. Veuillez cocher la case.",
processing: "Traitement en cours...",
securityCheck: "${domainName} doit évaluer la sécurité de votre connexion avant de continuer.",
notRobot: "Je ne suis pas un robot",
timeoutMessage: "Veuillez vérifier à nouveau !",
authenticationSuccess: "Authentification réussie",
authenticationFailed: "Échec de l'authentification, veuillez réessayer",
authenticationConfirmed: "Authentification réussie. Vous pouvez maintenant consulter le site Web.",
            safeCaptcha: "Ce site Web est protégé par SafeCaptcha."
        },
        pt: {
        	areYouRobot: "Você é um robô?",
verifying: "Verificando que você é humano. Por favor, marque a caixa.",
processing: "Processando...",
securityCheck: "${domainName} precisa avaliar a segurança da sua conexão antes de continuar.",
notRobot: "Não sou um robô",
timeoutMessage: "Por favor, verifique novamente!",
authenticationSuccess: "Autenticação bem-sucedida",
authenticationFailed: "Autenticação falhou, por favor tente novamente",
authenticationConfirmed: "Autenticação bem-sucedida. Agora você pode visualizar o site.",
            safeCaptcha: "Este site está protegido pelo SafeCaptcha."
        },
        ru: {
        	areYouRobot: "Вы робот?",
verifying: "Проверяем, что вы человек. Пожалуйста, поставьте галочку.",
processing: "Обработка...",
securityCheck: "${domainName} нужно проверить безопасность вашего соединения перед продолжением.",
notRobot: "Я не робот",
timeoutMessage: "Пожалуйста, подтвердите снова!",
authenticationSuccess: "Аутентификация прошла успешно",
authenticationFailed: "Аутентификация не удалась, пожалуйста, попробуйте еще раз",
authenticationConfirmed: "Аутентификация прошла успешно. Теперь вы можете просматривать веб-сайт.",
            safeCaptcha: "Этот сайт защищен SafeCaptcha."
        },
        de: {
        	areYouRobot: "Sind Sie ein Roboter?",
verifying: "Überprüfen, ob Sie ein Mensch sind. Bitte das Kästchen ankreuzen.",
processing: "Verarbeitung...",
securityCheck: "${domainName} muss die Sicherheit Ihrer Verbindung überprüfen, bevor Sie fortfahren.",
notRobot: "Ich bin kein Roboter",
timeoutMessage: "Bitte erneut verifizieren!",
authenticationSuccess: "Authentifizierung erfolgreich",
authenticationFailed: "Authentifizierung fehlgeschlagen, bitte versuchen Sie es erneut",
authenticationConfirmed: "Authentifizierung erfolgreich. Jetzt können Sie die Website anzeigen.",
            safeCaptcha: "Diese Website ist durch SafeCaptcha geschützt."
        },
        ja: {
        	areYouRobot: "あなたはロボットですか？",
verifying: "人間であることを確認しています。ボックスにチェックを入れてください。",
processing: "処理中...",
securityCheck: "${domainName} は、続行する前に接続の安全性を評価する必要があります。",
notRobot: "私はロボットではありません",
timeoutMessage: "もう一度確認してください！",
authenticationSuccess: "認証成功",
authenticationFailed: "認証に失敗しました。もう一度お試しください。",
authenticationConfirmed: "認証成功。これでウェブサイトを閲覧できます。",
            safeCaptcha: "このウェブサイトはSafeCaptchaによって保護されています。"
        },
        ko: {
        	areYouRobot: "당신은 로봇입니까?",
verifying: "인간인지 확인 중입니다. 상자를 체크하세요.",
processing: "처리 중...",
securityCheck: "${domainName}은 계속하기 전에 연결 보안을 평가해야 합니다.",
notRobot: "나는 로봇이 아닙니다",
timeoutMessage: "다시 확인해 주세요!",
authenticationSuccess: "인증 성공",
authenticationFailed: "인증에 실패했습니다. 다시 시도하십시오.",
authenticationConfirmed: "인증 성공. 이제 웹사이트를 볼 수 있습니다.",
            safeCaptcha: "이 웹사이트는 SafeCaptcha에 의해 보호됩니다."
        },
        it: {
        	areYouRobot: "Sei un robot?",
verifying: "Verificando che sei umano. Si prega di spuntare la casella.",
processing: "Elaborazione...",
securityCheck: "${domainName} deve valutare la sicurezza della tua connessione prima di continuare.",
notRobot: "Non sono un robot",
timeoutMessage: "Per favore, verifica di nuovo!",
authenticationSuccess: "Autenticazione riuscita",
authenticationFailed: "Autenticazione fallita, riprova per favore",
authenticationConfirmed: "Autenticazione riuscita. Ora puoi visualizzare il sito web.",
            safeCaptcha: "Questo sito web è protetto da SafeCaptcha."
        },
        ar: {
        	areYouRobot: "هل أنت روبوت؟",
verifying: "يتم التحقق من أنك إنسان. يرجى وضع علامة في المربع.",
processing: "معالجة...",
securityCheck: "يحتاج ${domainName} إلى تقييم أمان اتصالك قبل المتابعة.",
notRobot: "أنا لست روبوتًا",
timeoutMessage: "يرجى التحقق مرة أخرى!",
authenticationSuccess: "تم التحقق بنجاح",
authenticationFailed: "فشلت المصادقة، يرجى المحاولة مرة أخرى",
authenticationConfirmed: "تم التحقق بنجاح. يمكنك الآن عرض الموقع.",
            safeCaptcha: "هذا الموقع محمي بواسطة SafeCaptcha."
        },
        hi: {
            areYouRobot: "क्या आप रोबोट हैं?",
            verifying: "आपकी मानवता की पुष्टि की जा रही है। कृपया बॉक्स पर टिक करें।",
            processing: "प्रक्रिया हो रही है...",
            securityCheck: "${domainName} को आगे बढ़ने से पहले आपके कनेक्शन की सुरक्षा का मूल्यांकन करना होगा।",
            notRobot: "मैं रोबोट नहीं हूँ",
            timeoutMessage: "कृपया फिर से सत्यापित करें!",
            authenticationSuccess: "प्रमाणन सफल",
authenticationFailed: "प्रमाणन विफल रहा, कृपया फिर से प्रयास करें",
authenticationConfirmed: "प्रमाणन सफल। अब आप वेबसाइट देख सकते हैं।",
            safeCaptcha: "यह वेबसाइट SafeCaptcha द्वारा सुरक्षित है।"
        },
        tr: {
            areYouRobot: "Robot musun?",
            verifying: "İnsan olduğunuz doğrulanıyor. Lütfen kutucuğu işaretleyin.",
            processing: "İşleniyor...",
            securityCheck: "${domainName}, devam etmeden önce bağlantı güvenliğinizi değerlendirmelidir.",
            notRobot: "Ben robot değilim",
            timeoutMessage: "Lütfen tekrar doğrulayın!",
            authenticationSuccess: "Kimlik doğrulama başarılı",
authenticationFailed: "Kimlik doğrulama başarısız oldu, lütfen tekrar deneyin",
authenticationConfirmed: "Kimlik doğrulama başarılı. Artık web sitesini görüntüleyebilirsiniz.",
            safeCaptcha: "Bu web sitesi SafeCaptcha ile korunmaktadır."
        },
        th: {
            areYouRobot: "คุณเป็นหุ่นยนต์หรือเปล่า?",
            verifying: "กำลังตรวจสอบว่าคุณเป็นมนุษย์ กรุณาเลือกกล่องนี้",
            processing: "กำลังประมวลผล...",
            securityCheck: "${domainName} ต้องประเมินความปลอดภัยการเชื่อมต่อของคุณก่อนที่จะดำเนินการต่อ",
            notRobot: "ฉัน不是หุ่นยนต์",
            timeoutMessage: "กรุณายืนยันอีกครั้ง!",
            authenticationSuccess: "การตรวจสอบสิทธิ์สำเร็จ",
authenticationFailed: "การตรวจสอบสิทธิ์ล้มเหลว กรุณาลองอีกครั้ง",
authenticationConfirmed: "การตรวจสอบสิทธิ์สำเร็จ ตอนนี้คุณสามารถดูเว็บไซต์ได้",
            safeCaptcha: "เว็บไซต์นี้ได้รับการป้องกันโดย SafeCaptcha."
        },
        el: {
            areYouRobot: "Είσαι ρομπότ;",
            verifying: "Ελέγχεται αν είστε άνθρωπος. Παρακαλώ τσεκάρετε το κουτί.",
            processing: "Επεξεργασία...",
            securityCheck: "Το ${domainName} πρέπει να αξιολογήσει την ασφάλεια της σύνδεσής σας πριν συνεχίσει.",
            notRobot: "Δεν είμαι ρομπότ",
            timeoutMessage: "Παρακαλώ επιβεβαιώστε ξανά!",
            authenticationSuccess: "Η αυθεντικοποίηση ήταν επιτυχής",
authenticationFailed: "Αποτυχία αυθεντικοποίησης, παρακαλώ δοκιμάστε ξανά",
authenticationConfirmed: "Η αυθεντικοποίηση ήταν επιτυχής. Τώρα μπορείτε να δείτε τον ιστότοπο.",
            safeCaptcha: "Αυτή η ιστοσελίδα προστατεύεται από το SafeCaptcha."
        },
        sv: {
            areYouRobot: "Är du en robot?",
            verifying: "Verifierar att du är människa. Vänligen markera rutan.",
            processing: "Bearbetar...",
            securityCheck: "${domainName} måste bedöma din anslutningssäkerhet innan du fortsätter.",
            notRobot: "Jag är inte en robot",
            timeoutMessage: "Var god verifiera igen!",
            authenticationSuccess: "Autentisering lyckades",
authenticationFailed: "Autentisering misslyckades, vänligen försök igen",
authenticationConfirmed: "Autentisering lyckades. Nu kan du visa webbplatsen.",
            safeCaptcha: "Denna webbplats är skyddad av SafeCaptcha."
        },
        cs: {
            areYouRobot: "Jste robot?",
            verifying: "Ověřujeme, že jste člověk. Zaškrtněte prosím políčko.",
            processing: "Zpracovávání...",
            securityCheck: "${domainName} potřebuje zhodnotit zabezpečení vašeho připojení před pokračováním.",
            notRobot: "Nejsem robot",
            timeoutMessage: "Ověřte prosím znovu!",
            authenticationSuccess: "Autentizace byla úspěšná",
authenticationFailed: "Autentizace se nezdařila, zkuste to prosím znovu",
authenticationConfirmed: "Autentizace byla úspěšná. Nyní můžete zobrazit webové stránky.",
            safeCaptcha: "Tato webová stránka je chráněna SafeCaptcha."
        },
    };

    // Lấy ngôn ngữ hiện tại của trình duyệt
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.startsWith("vi") ? "vi" : userLang.startsWith("es") ? "es" : userLang.startsWith("fr") ? "fr" : userLang.startsWith("pt") ? "pt" : userLang.startsWith("ru") ? "ru" : userLang.startsWith("de") ? "de" : userLang.startsWith("ja") ? "ja" : userLang.startsWith("ko") ? "ko" : userLang.startsWith("it") ? "it" : userLang.startsWith("ar") ? "ar" : userLang.startsWith("hi") ? "hi" : userLang.startsWith("tr") ? "tr" : userLang.startsWith("th") ? "th" : userLang.startsWith("el") ? "el" : userLang.startsWith("sv") ? "sv" : userLang.startsWith("cs") ? "cs" : "en";
    const domainName = window.location.hostname;

// Tạo lớp che nội dung
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 1)";
overlay.style.display = "flex";
overlay.style.alignItems = "center";
overlay.style.justifyContent = "center";
overlay.style.zIndex = "9999";
overlay.innerHTML = `
    <div style="text-align: center; font-family: Arial, sans-serif; position: relative;">
        <h2>${domainName}</h2>
        <p>${translations[langCode].verifying}</p>
        
        <!-- Thay thế checkbox bằng reCAPTCHA -->
        <div class="g-recaptcha" data-sitekey="6LecO1sqAAAAAITajVDCHKih4RvqKVZkIvxWWSBp" data-callback="onCaptchaVerified"></div>
        
        <p id="timeout-message" style="display:none; color:red;">${translations[langCode].timeoutMessage}</p>
       
        <p id="authentication-message" style="display:none;"></p> <!-- Thêm nơi hiển thị thông báo xác thực -->
        <p>${translations[langCode].securityCheck.replace("${domainName}", domainName)}</p>
    </div>
    <img src="path/to/logo.png" alt="Logo" style="position: absolute; bottom: 10px; right: 10px; width: 100px; height: auto;">
`;

document.body.appendChild(overlay);

// Hàm xử lý khi reCAPTCHA thành công
function onCaptchaVerified(token) {
    document.getElementById("processing-message").style.display = "block";
    document.getElementById("processing-message").innerText = translations[langCode].authenticationSuccess;
    overlay.style.display = "none";
    
    // Lưu trạng thái xác thực vào localStorage
    localStorage.setItem("captchaPassed", "true");
    localStorage.setItem("lastVerified", new Date());
}

// Kiểm tra nếu xác thực đã hết hạn sau 1 ngày
const lastVerified = localStorage.getItem("lastVerified");
const oneDayInMs = 24 * 60 * 60 * 1000;

if (!lastVerified || Date.now() - new Date(lastVerified) > oneDayInMs) {
    localStorage.setItem("captchaPassed", "false");
}

// Đoạn mã sau đây kiểm tra trạng thái khi trang được tải lại
window.onload = function() {
    // Kiểm tra nếu đã xác thực
    if (localStorage.getItem("captchaPassed") === "true") {
        document.getElementById("processing-message").innerHTML = translations[langCode].authenticationConfirmed;
        document.getElementById("processing-message").style.color = "green";
        document.getElementById("processing-message").style.display = "block";
        overlay.style.display = "none";
    } else {
        overlay.style.display = "flex";
    }
};