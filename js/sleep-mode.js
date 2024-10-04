// Chức năng nhắc nhở nghỉ ngơi
function showReminder() {
    const now = new Date();
    const hours = now.getHours();
    const reminder = document.getElementById('reminder');

    // Kiểm tra giờ và khóa/mở khóa các script
    if (hours >= 21 || hours < 6) {
        reminder.style.display = 'block';
        disableOtherScripts(); // Khóa các script khác
    } else {
        reminder.style.display = 'none';
        enableOtherScripts(); // Mở khóa các script khác
    }
}

// Hàm khóa các tập lệnh khác
function disableOtherScripts() {
    const scripts = document.querySelectorAll('script.other-script');
    scripts.forEach(script => {
        script.type = 'javascript/blocked'; // Tạm thời thay đổi type để không thực thi
    });
}

// Hàm mở khóa các tập lệnh khác
function enableOtherScripts() {
    const blockedScripts = document.querySelectorAll('script[type="javascript/blocked"]');
    blockedScripts.forEach(script => {
        script.type = 'text/javascript'; // Đổi lại type để tiếp tục thực thi
    });
}

// Kiểm tra khi tải trang
document.addEventListener('DOMContentLoaded', function() {
    showReminder(); // Chạy khi DOM đã sẵn sàng
});

// Kiểm tra mỗi phút
setInterval(showReminder, 60000);