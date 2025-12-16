// ==========================================
// ЧАСТИНА 1: МОБІЛЬНЕ МЕНЮ (Запускається після завантаження)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ЗМІННІ ---
    const menuBtn = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');
    
    // Перевірка, чи існують елементи меню, щоб не було помилок на інших сторінках
    if (!menuBtn || !menu) return;

    const btnText = menuBtn.querySelector('.btn-text');
    const btnIcon = menuBtn.querySelector('.btn-icon');
    const toggles = document.querySelectorAll('.submenu-toggle');

    // --- 1. Кнопка МЕНЮ (Відкрити/Закрити) ---
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (menu.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // --- 2. Закриття при кліку ПОЗА межами меню ---
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active')) {
            if (!menu.contains(e.target)) {
                closeMenu();
            }
        }
    });

    // --- 3. Логіка підменю (Акордеон) ---
    toggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault(); 
            const parentLi = toggle.closest('.menu-item');
            
            if (parentLi.classList.contains('open')) {
                closeSubmenu(parentLi);
            } else {
                closeAllSubmenus();
                openSubmenu(parentLi);
            }
        });
    });

    // --- ДОПОМІЖНІ ФУНКЦІЇ МЕНЮ ---
    function openMenu() {
        menu.classList.add('active');
        menuBtn.classList.add('active');
        if(btnText) btnText.textContent = "ЗАКРИТИ";
        if(btnIcon) btnIcon.textContent = "✕";
    }

    function closeMenu() {
        menu.classList.remove('active');
        menuBtn.classList.remove('active');
        if(btnText) btnText.textContent = "МЕНЮ";
        if(btnIcon) btnIcon.textContent = "☰";
        setTimeout(() => { closeAllSubmenus(); }, 300);
    }

    function openSubmenu(item) {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            item.classList.add('open');
            submenu.style.height = submenu.scrollHeight + "px";
            submenu.style.opacity = "1";
        }
    }

    function closeSubmenu(item) {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            item.classList.remove('open');
            submenu.style.height = "0px";
            submenu.style.opacity = "0";
        }
    }

    function closeAllSubmenus() {
        document.querySelectorAll('.menu-item.open').forEach(item => {
            closeSubmenu(item);
        });
    }
});


// ==========================================
// ЧАСТИНА 2: ВІДПРАВКА ФОРМИ (Глобальна функція)
// Ця функція має бути ПОЗА межами 'DOMContentLoaded'
// ==========================================
function sendData() {
    console.log("Спроба відправки...");

    // 1. Беремо текст
    var input = document.getElementById('feedback-text');
    
    // Якщо елемента немає на сторінці (наприклад, ми на іншій вкладці)
    if (!input) return; 

    var message = input.value;

    if (!message || message.trim() === "") {
        alert("Напишіть хоч щось!");
        return;
    }

    // 2. Налаштування (Ваші дані)
    var GOOGLE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScpa3jCXlfllSwVtHhf1nNrQVvBF0OJyZZF9MU6A1-ZeSF4Ew/formResponse';
    var formData = new FormData();
    formData.append('entry.292388831', message);

    // 3. Блокуємо кнопку
    var btn = document.querySelector('.btn-primary'); // Шукаємо кнопку по класу
    var originalText = "Надіслати відгук";
    
    if (btn) {
        originalText = btn.innerText;
        btn.innerText = "Відправка...";
        btn.disabled = true;
    }

    // 4. Відправка
    fetch(GOOGLE_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    })
    .then(function() {
        alert("✅ Відправлено успішно!");
        input.value = ""; // Очистити поле
    })
    .catch(function(err) {
        alert("Помилка відправки");
        console.error(err);
    })
    .finally(function() {
        // Повертаємо кнопку до життя
        if (btn) {
            btn.innerText = originalText;
            btn.disabled = false;
        }
    });


















    
}