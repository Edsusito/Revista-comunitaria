// ============================================
// ANIMACIONES - ENTRE VOCES Y TRADICIONES
// EXPERIENCIA VALLEDUPAR
// ============================================

// ---------- CARGA INICIAL ----------
document.addEventListener('DOMContentLoaded', function() {
    
    // Marcar body como cargado para fade-in
    document.body.classList.add('cargado');
    
    // ---------- ANIMACIÓN AL HACER SCROLL ----------
    const elementos = document.querySelectorAll('.portada-revista, .tarjeta, .contenido-turismo, .revista-derecha, .cita-destacada');
    
    const observer = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(40px)';
        elemento.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(elemento);
    });
    
    // ---------- RETRASO EN TARJETAS ----------
    const tarjetas = document.querySelectorAll('.tarjeta');
    tarjetas.forEach((tarjeta, index) => {
        tarjeta.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // ---------- EFECTO PORTADA AL SCROLL ----------
    const portada = document.getElementById('portada');
    const contenidoPortada = document.querySelector('.contenido-portada');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const alturaPortada = portada.offsetHeight;
        
        if (scrollY < alturaPortada) {
            const progreso = scrollY / alturaPortada;
            portada.style.opacity = 1 - (progreso * 0.5);
            const escala = 1 + (progreso * 0.03);
            contenidoPortada.style.transform = `scale(${escala})`;
            
            const luz = document.querySelector('.luz-cálida');
            if (luz) {
                luz.style.opacity = 0.6 + (progreso * 0.4);
            }
        }
    });
    
    // ---------- BOTÓN DE MÚSICA ----------
    const botonMusica = document.getElementById('botonMusica');
    let musicaActiva = false;
    let audio = null;
    
    if (botonMusica) {
        botonMusica.addEventListener('click', function() {
            if (!musicaActiva) {
                try {
                    audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
                    audio.loop = true;
                    audio.volume = 0.2;
                    audio.play().catch(() => {});
                    musicaActiva = true;
                    botonMusica.classList.add('activo');
                    botonMusica.innerHTML = '🔊';
                } catch(e) {
                    musicaActiva = true;
                    botonMusica.classList.add('activo');
                    botonMusica.innerHTML = '🔊';
                }
            } else {
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
                musicaActiva = false;
                botonMusica.classList.remove('activo');
                botonMusica.innerHTML = '🎵';
            }
        });
    }

    // ============================================================
    // SOLUCIÓN: SOPORTE PARA .jpg Y .jpeg EN LAS IMÁGENES
    // ============================================================
    
    // 1. Para las tarjetas
    const tarjetasConImagen = document.querySelectorAll('.imagen-tarjeta');
    
    tarjetasConImagen.forEach(function(elemento) {
        let ruta = elemento.style.backgroundImage;
        let url = ruta.replace(/url\(['"]?(.*?)['"]?\)/i, '$1');
        
        // Si termina en .jpg, probar .jpeg
        if (url.endsWith('.jpg')) {
            let urlAlternativa = url.replace('.jpg', '.jpeg');
            let img = new Image();
            img.onload = function() {
                elemento.style.backgroundImage = `url('${urlAlternativa}')`;
            };
            img.src = urlAlternativa;
        }
        // Si termina en .jpeg, probar .jpg
        else if (url.endsWith('.jpeg')) {
            let urlAlternativa = url.replace('.jpeg', '.jpg');
            let img = new Image();
            img.onload = function() {
                elemento.style.backgroundImage = `url('${urlAlternativa}')`;
            };
            img.src = urlAlternativa;
        }
    });

    // 2. Para la portada
    const portadaSection = document.getElementById('portada');
    if (portadaSection) {
        // Probar si portada.jpg existe, si no, usar .jpeg
        let imgPortada = new Image();
        imgPortada.onerror = function() {
            // Si falla .jpg, intentar con .jpeg
            portadaSection.style.setProperty('--imagen-portada', 'url(../img/portada.jpeg)');
        };
        imgPortada.src = 'img/portada.jpg';
    }
});

// ---------- SCROLL SUAVE ----------
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function(e) {
        e.preventDefault();
        const destino = document.querySelector(this.getAttribute('href'));
        if (destino) {
            destino.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});