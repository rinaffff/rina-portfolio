document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("cursor");
    const cursorRing = document.getElementById("cursor-ring");
    const revealElements = document.querySelectorAll(".reveal");

    // Custom Cursor Logic
    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursorRing.style.left = `${e.clientX}px`;
        cursorRing.style.top = `${e.clientY}px`;
    });

    document.addEventListener("mousedown", () => {
        cursor.classList.add("big");
    });

    document.addEventListener("mouseup", () => {
        cursor.classList.remove("big");
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // Marquee Animation Duplication for seamless loop
    const marqueeTrack = document.querySelector(".marquee-track");
    if (marqueeTrack) {
        const marqueeItems = Array.from(marqueeTrack.children);
        marqueeItems.forEach(item => {
            const clone = item.cloneNode(true);
            marqueeTrack.appendChild(clone);
        });
    }

    // Form Submission (Basic example, needs backend for full functionality)
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Message sent! (This is a demo. A backend integration is required for full functionality.)");
            contactForm.reset();
        });
    }

    // Video Playback (ensure autoplay works on some browsers)
    document.querySelectorAll(".vid-wrap video").forEach(video => {
        video.play().catch(error => {
            console.log("Autoplay prevented:", error);
            // Fallback for autoplay restrictions: show play button or mute
            video.muted = true; // Try muting to enable autoplay
            video.play().catch(e => console.log("Muted autoplay also prevented:", e));
        });
    });
});
