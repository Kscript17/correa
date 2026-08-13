document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Dynamic Typing Effect
    const roles = ["Web Developer", "UI/UX Designer", "Project Manager", "Graphic Designer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        const targetElement = document.getElementById("typing-text");
        if (!targetElement) return;

        if (isDeleting) {
            targetElement.innerHTML = `I specialize in building web and mobile solutions as a <strong>${currentRole.substring(0, charIndex-1)}</strong>.`;
            charIndex--;
        } else {
            targetElement.innerHTML = `I specialize in building web and mobile solutions as a <strong>${currentRole.substring(0, charIndex+1)}</strong>.`;
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();


    // 2. Scroll-Triggered Fade-In Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const panels = document.querySelectorAll('.glass-panel');
    panels.forEach(panel => observer.observe(panel));


    // 3. Click-to-Copy Email Functionality
    const emailElement = document.getElementById("copy-email");
    
    if (emailElement) {
        emailElement.addEventListener("click", () => {
            const emailText = emailElement.textContent;
            navigator.clipboard.writeText(emailText).then(() => {
                const originalText = emailElement.textContent;
                emailElement.textContent = "Copied to clipboard! ✨";
                emailElement.style.color = "#ffffff";
                
                setTimeout(() => {
                    emailElement.textContent = originalText;
                    emailElement.style.color = ""; 
                }, 2000);
            });
        });
    }

});