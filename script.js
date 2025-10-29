let currentPage = 0;
const totalPages = 7; // Portada = 0, luego 1–7
const pageNames = ['Portada', 'Our Moments', 'Things I Love', 'Our Month', 'Our Song', 'Mini Polaroids', 'A Letter for You', 'The End'];

function startReading() {
    currentPage = 1;
    showPage(currentPage);
    updateNavigation();
}

function showPage(pageNum) {
    // Oculta TODO (incluyendo portada)
    document.querySelectorAll('.magazine-cover, .page, .page7').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });

    // Muestra la página correspondiente
    if (pageNum === 0) {
        document.querySelector('.magazine-cover').style.display = 'flex';
    } else if (pageNum > 0 && pageNum <= 6) {
        const page = document.getElementById(`page${pageNum}`);
        if (page) {
            page.style.display = 'block';
            page.classList.add('active');
        }
    } else if (pageNum === 7) {
        const page = document.getElementById('page7');
        if (page) {
            page.style.display = 'block';
            page.classList.add('active');
        }
    }

    // Actualiza el nombre del indicador
    const indicator = document.getElementById('pageIndicator');
    if (indicator) {
        indicator.textContent = pageNames[pageNum];
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
        updateNavigation();
    }
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
        updateNavigation();
    } else if (currentPage === 1) {
        currentPage = 0;
        showPage(currentPage);
        updateNavigation();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!prevBtn || !nextBtn) return;

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages;

    nextBtn.textContent =
        currentPage === 0
            ? 'Empezar a leer →'
            : currentPage === totalPages
            ? 'Fin ♡'
            : 'Siguiente →';
}

// 📅 Genera calendario
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    if (!calendar) return;

    calendar.innerHTML = ''; // limpia por si acaso
    const daysInMonth = 31;

    const dayHeaders = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.className = 'calendar-day';
        header.style.background = '#ffc107';
        header.style.color = 'white';
        header.style.fontWeight = 'bold';
        header.textContent = day;
        calendar.appendChild(header);
    });

    const firstDayOfMonthWeekday = 3; 
    for (let i = 1; i < firstDayOfMonthWeekday; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        emptyDay.style.visibility = 'hidden';
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;

        if (day === 26) {
            dayEl.classList.add('anniversary-day');
            dayEl.innerHTML = `${day}<br>♡`;
        }

        dayEl.addEventListener('click', () => {
            document.querySelectorAll('.anniversary-day').forEach(el => {
                el.classList.remove('anniversary-day');
                el.innerHTML = el.textContent.trim();
            });

            dayEl.classList.add('anniversary-day');
            dayEl.innerHTML = `${day}<br>♡`;

            // Animación si día 30
            if (day === 30) {
                const heart = document.createElement('div');
                heart.classList.add('cute-heart');
                heart.textContent = '💖';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1500);
            }
        });

        calendar.appendChild(dayEl);
    }
}

// 💌 Añadir nueva razón
function addLoveReason() {
    const loveList = document.getElementById('loveList');
    if (!loveList) return;

    const newItem = document.createElement('li');
    newItem.className = 'love-item';
    newItem.contentEditable = true;
    newItem.textContent = 'Escribe aquí otra razón por la que te amo...';

    loveList.appendChild(newItem);
    newItem.focus();

    newItem.addEventListener('focus', function () {
        if (this.textContent.includes('Escribe aquí')) {
            this.textContent = '';
        }
    });
}

// 🎥 Sorpresa del video
document.addEventListener('DOMContentLoaded', function () {
    const sorpresaBtn = document.getElementById('sorpresaBtn');
    const rickVideo = document.getElementById('rickVideo');

    if (sorpresaBtn && rickVideo) {
        sorpresaBtn.addEventListener('click', () => {
            sorpresaBtn.style.display = 'none';
            rickVideo.style.display = 'block';
            setTimeout(() => {
                rickVideo.style.transition = "transform 0.6s ease-out";
                rickVideo.style.transform = "scale(1)";
            }, 50);
            rickVideo.src = "https://www.youtube.com/embed/PyoRdu-i0AQ?autoplay=1";
        });
    }

    generateCalendar();
    updateNavigation();

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPage === 0) {
                startReading();
            } else {
                nextPage();
            }
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', previousPage);

    // Auto-resize de carta
    document.addEventListener('input', e => {
        if (e.target.classList.contains('letter-text')) {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        }
    });
});

// Navegación con flechas
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextPage();
    if (e.key === 'ArrowLeft') previousPage();
});
