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
            safeCaptcha: "This website is protected by SafeCaptcha."
        },
        vi: {
            areYouRobot: "Bạn có phải là robot không?",
            verifying: "Đang xác minh bạn là người. Bạn hãy tick vào ô.",
            processing: "Đang xử lý...",
            securityCheck: "${domainName} cần đánh giá tính bảo mật kết nối của bạn trước khi tiếp tục.",
            notRobot: "Tôi không phải là robot",
            timeoutMessage: "Vui lòng xác thực lại!",
            safeCaptcha: "Trang web này được bảo vệ bởi SafeCaptcha."
        },
        es: {
            safeCaptcha: "Este sitio web está protegido por SafeCaptcha."
        },
        fr: {
            safeCaptcha: "Ce site Web est protégé par SafeCaptcha."
        },
        pt: {
            safeCaptcha: "Este site está protegido pelo SafeCaptcha."
        },
        ru: {
            safeCaptcha: "Этот сайт защищен SafeCaptcha."
        },
        de: {
            safeCaptcha: "Diese Website ist durch SafeCaptcha geschützt."
        },
        ja: {
            safeCaptcha: "このウェブサイトはSafeCaptchaによって保護されています。"
        },
        ko: {
            safeCaptcha: "이 웹사이트는 SafeCaptcha에 의해 보호됩니다."
        },
        it: {
            safeCaptcha: "Questo sito web è protetto da SafeCaptcha."
        },
    };

    // Lấy ngôn ngữ hiện tại của trình duyệt
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.startsWith("vi") ? "vi" : userLang.startsWith("es") ? "es" : userLang.startsWith("fr") ? "fr" : userLang.startsWith("pt") ? "pt" : userLang.startsWith("ru") ? "ru" : userLang.startsWith("de") ? "de" : userLang.startsWith("ja") ? "ja" : userLang.startsWith("ko") ? "ko" : userLang.startsWith("it") ? "it" : "en";
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
        <div style="text-align: center; font-family: Arial, sans-serif;">
            <h2>${domainName}</h2>
            <p>${translations[langCode].verifying}</p>
            <input type="checkbox" id="captcha-checkbox">
            <label for="captcha-checkbox">${translations[langCode].notRobot}</label>
            <p id="timeout-message" style="display:none; color:red;">${translations[langCode].timeoutMessage}</p>
            <p>${translations[langCode].securityCheck.replace("${domainName}", domainName)}</p>
            <p id="processing-message" style="display:none;">${translations[langCode].processing}</p>
        </div>
        <img src="path/to/logo.png" alt="Logo" style="position: absolute; bottom: 10px; right: 10px; width: 100px; height: auto;">
    `;

    document.body.appendChild(overlay);

    // Tạo nút thông báo
    const infoButton = document.createElement("button");
    infoButton.innerText = "?";
    infoButton.style.position = "fixed";
    infoButton.style.bottom = "20px";
    infoButton.style.right = "20px";
    infoButton.style.zIndex = "10000";
    infoButton.style.padding = "10px";
    infoButton.style.borderRadius = "50%";
    infoButton.style.backgroundColor = "#007BFF";
    infoButton.style.color = "white";
    infoButton.style.border = "none";
    infoButton.style.cursor = "pointer";
    infoButton.style.fontSize = "20px";
    document.body.appendChild(infoButton);

    infoButton.addEventListener("click", () => {
        const popup = document.createElement("div");
        popup.style.position = "fixed";
        popup.style.bottom = "80px";
        popup.style.right = "20px";
        popup.style.backgroundColor = "white";
        popup.style.border = "1px solid #ccc";
        popup.style.padding = "15px";
        popup.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        popup.innerHTML = `<p>${translations[langCode].safeCaptcha}</p>`;
        
        document.body.appendChild(popup);
        
        setTimeout(() => {
            popup.remove();
        }, 5000); // Tự động xóa sau 5 giây
    });

    // Kiểm tra nếu xác thực đã hết hạn sau 1 ngày
    const lastVerified = localStorage.getItem("lastVerified");
    const oneDayInMs = 24 * 60 * 60 * 1000;

    if (!lastVerified || Date.now() - new Date(lastVerified) > oneDayInMs) {
        localStorage.setItem("captchaPassed", "false");
    }

    // Đếm ngược thời gian cho 10 giây
    let timeoutID;
    function startTimeout() {
        timeoutID = setTimeout(function () {
            overlay.style.display = "flex";
            document.getElementById("timeout-message").style.display = "block";
        }, 10000); // 10 giây
    }

    // Bắt đầu đếm ngược
    startTimeout();

    // Xử lý khi checkbox được tick
    document.getElementById("captcha-checkbox").addEventListener("change", function () {
        if (this.checked) {
            document.getElementById("processing-message").style.display = "block";
            overlay.querySelector("div").style.pointerEvents = "none";

            setTimeout(function () {
                overlay.style.display = "none";
                localStorage.setItem("captchaPassed", "true");
                localStorage.setItem("lastVerified", new Date());
                clearTimeout(timeoutID);
            }, 2000); // 2 giây delay
        }
    });

    // Kiểm tra nếu đã xác thực trước đó
    window.onload = function () {
        if (localStorage.getItem("captchaPassed") !== "true") {
            overlay.style.display = "flex";
        } else {
            overlay.style.display = "none";
        }
    };

    // Theo dõi hoạt động của người dùng
    document.addEventListener('mousemove', resetTimeout);
    document.addEventListener('keydown', resetTimeout);

    function resetTimeout() {
        clearTimeout(timeoutID);
        startTimeout();
        document.getElementById("timeout-message").style.display = "none";
    }
})();