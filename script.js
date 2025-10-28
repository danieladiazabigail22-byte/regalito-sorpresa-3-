let currentPage = 0;
const totalPages = 7; // Las páginas van de 1 a 7 (total 7 páginas después de la portada)
// Index 0: Portada, 1: page1, ..., 7: page7
const pageNames = ['Portada', 'Our Moments', 'Things I Love', 'Our Month', 'Our Song', 'Mini Polaroids', 'A Letter for You', 'The End'];

function startReading() {
    document.querySelector('.magazine-cover').style.display = 'none';
    currentPage = 1;
    showPage(currentPage);
    updateNavigation();
}

function showPage(pageNum) {
    // Oculta todas las páginas
    document.querySelectorAll('.page, .page7').forEach(page => {
        page.classList.remove('active');
    });

    // Muestra la página actual
    if (pageNum > 0 && pageNum <= 6) {
        document.getElementById(`page${pageNum}`).classList.add('active');
    } else if (pageNum === 7) {
        document.getElementById('page7').classList.add('active');
    }

    // Actualiza indicador
    document.getElementById('pageIndicator').textContent = pageNames[pageNum];
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
        document.querySelector('.magazine-cover').style.display = 'flex';
        document.querySelectorAll('.page, .page7').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById('pageIndicator').textContent = pageNames[0]; // Indicador en 'Portada'
        updateNavigation();
    }
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentPage === 0;
    nextBtn.disabled = currentPage === totalPages;

    // Cambia texto según página
    if (currentPage === 0) {
        nextBtn.textContent = 'Empezar a leer →';
    } else {
        nextBtn.textContent = currentPage === totalPages ? 'Fin ♡' : 'Siguiente →';
    }
}

// Genera calendario
function generateCalendar() {
    const calendar = document.getElementById('calendar');
    const daysInMonth = 31;

    // Encabezados de día
    const dayHeaders = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day';
        dayHeader.style.background = '#ffc107';
        dayHeader.style.color = 'white';
        dayHeader.style.fontWeight = 'bold';
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Días vacíos antes del 1
    const firstDayOfMonthWeekday = 3; 
    for (let i = 1; i < firstDayOfMonthWeekday; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        emptyDay.style.visibility = 'hidden';
        emptyDay.style.cursor = 'default';
        calendar.appendChild(emptyDay);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;

        // Día 26 con corazón
        if (day === 26) {
            dayElement.classList.add('anniversary-day');
            dayElement.innerHTML = day + '<br>♡';
            dayElement.style.fontSize = '0.9rem';
        }

        dayElement.addEventListener('click', function() {
            // Quitar corazón anterior
            document.querySelectorAll('.anniversary-day').forEach(el => {
                el.classList.remove('anniversary-day');
                const dayNum = el.textContent.replace('♡', '').trim();
                el.innerHTML = dayNum;
            });

            // Agregar nuevo corazón
            this.classList.add('anniversary-day');
            this.innerHTML = this.textContent + '<br>♡';
            this.style.fontSize = '0.9rem';

            // Animación tierna si día 30
            if (parseInt(this.textContent) === 30) {
                const heart = document.createElement('div');
                heart.classList.add('cute-heart');
                heart.innerHTML = '💖';
                document.body.appendChild(heart);
                setTimeout(() => heart.remove(), 1500);
            }
        });

        calendar.appendChild(dayElement);
    }
}

// Agregar razón de amor
function addLoveReason() {
    const loveList = document.getElementById('loveList');
    const newItem = document.createElement('li');
    newItem.className = 'love-item';
    newItem.contentEditable = true;
    newItem.textContent = 'Escribe aquí otra razón por la que te amo...';

    loveList.appendChild(newItem);
    newItem.focus();

    newItem.addEventListener('focus', function() {
        if (this.textContent === 'Escribe aquí otra razón por la que te amo...') {
            this.textContent = '';
        }
    });
}

// Sorpresa del video
const sorpresaBtn = document.getElementById('sorpresaBtn');
const rickVideo = document.getElementById('rickVideo');

if (sorpresaBtn) {
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

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
    generateCalendar();
    updateNavigation();

    // Auto-resize de textarea
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('letter-text')) {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
        }
    });

    // Botones de navegación fijos
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    nextBtn.addEventListener('click', () => {
        if (currentPage === 0) {
            startReading();
        } else if (currentPage < totalPages) {
            nextPage();
        }
    });

    prevBtn.addEventListener('click', previousPage);
});

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' && currentPage < totalPages) {
        nextPage();
    } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        previousPage();
    }
});
