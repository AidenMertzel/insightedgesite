document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        document.getElementById('main-content').style.display = 'flex';
    }, 5000);

    document.querySelectorAll('#navbar a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    window.onscroll = function () {
        var navbar = document.getElementById('navbar');
        if (window.pageYOffset > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    };

    const cursorDot = document.querySelector('.cursor-dot');
    const cursorDotOutline = document.querySelector('.cursor-dot-outline');
    let cursorVisible = true;
    let cursorEnlarged = false;
    let _x = 0, _y = 0, endX = window.innerWidth / 2, endY = window.innerHeight / 2;

    document.addEventListener('mousemove', (e) => {
        cursorVisible = true;
        toggleCursorVisibility();
        endX = e.pageX;
        endY = e.pageY;
        cursorDot.style.top = `${endY}px`;
        cursorDot.style.left = `${endX}px`;
        cursorDotOutline.style.top = `${endY}px`;
        cursorDotOutline.style.left = `${endX}px`;
    });

    document.addEventListener('mouseenter', () => {
        cursorVisible = true;
        toggleCursorVisibility();
    });

    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        toggleCursorVisibility();
    });

    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorEnlarged = true;
            toggleCursorSize();
        });
        el.addEventListener('mouseout', () => {
            cursorEnlarged = false;
            toggleCursorSize();
        });
    });

    document.addEventListener('mousedown', () => {
        cursorEnlarged = true;
        toggleCursorSize();
    });

    document.addEventListener('mouseup', () => {
        cursorEnlarged = false;
        toggleCursorSize();
    });

    function animateCursor() {
        _x += (endX - _x) / 8;
        _y += (endY - _y) / 8;
        cursorDotOutline.style.top = `${_y}px`;
        cursorDotOutline.style.left = `${_x}px`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    function toggleCursorSize() {
        if (cursorEnlarged) {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.2)';
            cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    }

    function toggleCursorVisibility() {
        if (cursorVisible) {
            cursorDot.classList.add('visible');
            cursorDotOutline.classList.add('visible');
        } else {
            cursorDot.classList.remove('visible');
            cursorDotOutline.classList.remove('visible');
        }
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                const textContent = entry.target.querySelector('.text-content');
                textContent.classList.add('visible');
            } else {
                entry.target.classList.remove('active');
                const textContent = entry.target.querySelector('.text-content');
                textContent.classList.remove('visible');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section').forEach(section => observer.observe(section));

    function openMenu(evt, menuName) {
        var i, x, tablinks;
        x = document.getElementsByClassName("menu");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablink");
        for (i = 0; i < x.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" w3-dark-grey", "");
        }
        document.getElementById(menuName).style.display = "block";
        evt.currentTarget.firstElementChild.className += " w3-dark-grey";
    }

    

    document.getElementById("myLink").click();
});
