let slideIndex = 1;

/* 1. Theme Toggle */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";

    if (isDark) {
        html.removeAttribute("data-theme"); // back to light
    } else {
        html.setAttribute("data-theme", "dark");
    }
}

/* 2. Filter Logic */
function filterSelection(category) {
    const items = document.getElementsByClassName("gallery-item");
    const buttons = document.getElementsByClassName("btn");

    // Show / hide images
    for (let i = 0; i < items.length; i++) {
        if (category === "all" || items[i].classList.contains(category)) {
            items[i].style.display = "block";
        } else {
            items[i].style.display = "none";
        }
    }

    // Active button state
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove("active");
    }

    event.currentTarget.classList.add("active");
}

/* 3. Lightbox Logic */
function openLightbox() {
    document.getElementById("myLightbox").style.display = "block";
}

function closeLightbox() {
    document.getElementById("myLightbox").style.display = "none";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const galleryImgs = document.querySelectorAll(".gallery-item img");
    const captionText = document.getElementById("caption");

    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
    captionText.innerHTML = galleryImgs[slideIndex - 1].alt;
}
