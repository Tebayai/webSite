// mettre un bg color lors du scroll sur le header
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    const originalBgColor = getComputedStyle(header).backgroundColor;

    window.addEventListener("scroll", function() {
        if (window.scrollY > 0) {
            header.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
            // changer l'img logo du header img 
            const logo = document.querySelector('.logo');
                logo.src = "assets/LogoBis.png"; // Changer le src de l'image
                logo.style.width = "130px"; // Ajuster la taille de l'image
                logo.style.height = "60px"; // Ajuster la taille de l'image
        } else {
            header.style.backgroundColor = originalBgColor;
            // remettre l'img logo du header img
            const logo = document.querySelector('.logo');
            logo.src = "assets/Logo.png"; // Changer le src de l'image
            logo.style.width = "60px"; // Ajuster la taille de l'image
        }
    });
});

//animate Gsap
//navbar
gsap.from('header', {opacity:0, duration: 3, delay: .5, y: 30, ease:'expo.out'});
//hero
gsap.from('.hero .hero-content h1', {opacity:0, duration: 3, delay: 1.3, y: 35, ease:'expo.out'});
gsap.from('.hero .hero-content p', {opacity:0, duration: 3, delay: 1.1 , y: 35, ease:'expo.out'});
gsap.from('.hero .hero-content .text-hero', {opacity:0, duration: 3, delay: 1.1 , y: 35, ease:'expo.out'});

//hero img
gsap.from('.hero .home__scroll', {opacity:0, duration: 3, delay: 1.5, y: 25, ease:'expo.out'});
// submarine and navbar
gsap.from('.submarine', {opacity:0, duration: 3, delay: 1.5, y: 25, ease:'expo.out'});
gsap.from('.depth-nav', {opacity:0, duration: 3, delay: 1.5, y: 25, ease:'expo.out'});

gsap.registerPlugin(ScrollTrigger);

/* animation des blocs */


/* === PROFONDEUR : sous-marin qui suit le scroll === */
gsap.registerPlugin(ScrollTrigger);

const navLinks   = gsap.utils.toArray(".depth-nav a");
const submarine  = document.querySelector(".submarine");

/* utilitaire : déplacer le carré au bon lien */
function moveSubmarineTo(link) {
  // distance du lien par rapport au conteneur .depth-nav
    const navRect  = document.querySelector(".depth-nav").getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const topPos   = linkRect.top - navRect.top;        // position relative
    submarine.style.top = `${topPos - submarine.offsetHeight / 2}px`;
    }

    /* utilitaire : ajouter la classe active */
    function setActive(link) {
    navLinks.forEach(l => l.classList.toggle("active", l === link));
    }

    /* ----------- ScrollTrigger pour chaque ancre ----------- */
    const headerHeight = document.querySelector("header").offsetHeight;

    navLinks.forEach(link => {
    const targetId = link.getAttribute("href");
    const targetEl = document.querySelector(targetId);

    ScrollTrigger.create({
        trigger: targetEl,
        start: "top center",
        end: "bottom center",
        onEnter()     { setActive(link); moveSubmarineTo(link); },
        onEnterBack() { setActive(link); moveSubmarineTo(link); }
    });

    link.addEventListener("click", e => {
        e.preventDefault();
        const offset = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
        top: offset,
        behavior: "smooth"
        });

        setActive(link);
        moveSubmarineTo(link);
    });
});


/* positionne le sous-marin au chargement (0 m) */
moveSubmarineTo(navLinks[0]);
setActive(navLinks[0]);


// target les img

document.querySelectorAll('.animal img').forEach((img) => {
    const caption = img.nextElementSibling;

    img.addEventListener('mousemove', (e) => {
        const bounds = img.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top;

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');

        const image = new Image();
        image.src = img.src;
        image.onload = () => {
            ctx.drawImage(image, 0, 0);
            const pixel = ctx.getImageData(
                x * image.naturalWidth / bounds.width,
                y * image.naturalHeight / bounds.height,
                1, 1
            ).data;
            if (pixel[3] > 10) {
                caption.style.opacity = 1;
                img.style.cursor = 'pointer';
            } else {
                caption.style.opacity = 0;
                img.style.cursor = 'default';
            }
        };
    });

    img.addEventListener('mouseleave', () => {
        caption.style.opacity = 0;
    });
});