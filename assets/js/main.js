function maskPhone(value) {
    return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d{4})/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
}

const phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', (e) => {
    e.target.value = maskPhone(e.target.value);
});

document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;

    document.getElementById('form-section').classList.add('d-none');
    document.getElementById('product-page').classList.remove('d-none');
    document.getElementById('user-name').textContent = `Welcome, ${name}`;
});

window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Gallery Modal
const galleryImages = document.querySelectorAll('.gallery-img');
let currentImageIndex;
const galleryModal = document.createElement('div');
galleryModal.classList.add('modal', 'fade');
galleryModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <img id="modal-image" src="" class="img-fluid" alt="Image Gallery">
        <div class="d-flex justify-content-center my-2">
            <button type="button" class="btn btn-modal-nav me-2 prev-btn">Previous</button>
            <button type="button" class="btn btn-modal-nav next-btn">Next</button>
        </div>
      </div>
    </div>
  `;

document.body.appendChild(galleryModal);

galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        document.getElementById('modal-image').src = img.src;
        var modal = new bootstrap.Modal(galleryModal);
        modal.show();
    });
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('modal-image').src = galleryImages[currentImageIndex].src;
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('modal-image').src = galleryImages[currentImageIndex].src;
});

// Testmonial Slider
document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.slider-dot');
    const slider = document.querySelector('.testimonials-slider');
    const sliderWrapper = document.querySelector('.slider-wrapper');

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let animationID = 0;

    function showSlide(index) {
        slider.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    showSlide(currentSlide);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    slider.addEventListener('mousedown', touchStart);
    slider.addEventListener('mouseup', touchEnd);
    slider.addEventListener('mousemove', touchMove);
    slider.addEventListener('mouseleave', touchEnd);

    slider.addEventListener('touchstart', touchStart);
    slider.addEventListener('touchend', touchEnd);
    slider.addEventListener('touchmove', touchMove);

    function touchStart(event) {
        isDragging = true;
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        slider.classList.add('grabbing');
    }

    function touchMove(event) {
        if (!isDragging) return;
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPos;
        currentTranslate = (diff / sliderWrapper.offsetWidth) * 100;
    }

    function touchEnd() {
        cancelAnimationFrame(animationID);
        isDragging = false;

        if (currentTranslate < -25 && currentSlide < testimonials.length - 1) {
            currentSlide += 1;
        }

        if (currentTranslate > 25 && currentSlide > 0) {
            currentSlide -= 1;
        }

        showSlide(currentSlide);

        slider.classList.remove('grabbing');

        currentTranslate = 0;
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        slider.style.transform = `translateX(calc(-${currentSlide * 100}% + ${currentTranslate}%))`;
        if (isDragging) requestAnimationFrame(animation);
    }

    window.addEventListener('resize', () => {
        showSlide(currentSlide);
    });
});


// Timer Countdown
let time = 300;
const timerElement = document.getElementById('timer');

const countdown = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerElement.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    time--;

    if (time < 0) {
        clearInterval(countdown);
        timerElement.textContent = '00:00';
    }
}, 1000);