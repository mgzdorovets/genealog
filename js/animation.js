(() => {
    "use strict";

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
        console.warn("Animations are unavailable: GSAP or ScrollTrigger did not load.");
        return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
        gsap.set(".reveal-image, .tree__line, .person, .map__route, .map__point", {
            clearProps: "all"
        });
        return;
    }

    gsap.utils.toArray(".reveal-image").forEach((image) => {
        gsap.fromTo(image, {
            clipPath: "inset(0 100% 0 0)"
        }, {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: image,
                start: "top 80%",
                once: true,
                onLeave: () => gsap.set(image, { clearProps: "clipPath" })
            }
        });
    });

    const research = document.querySelector("#research");

    if (research) {
        const researchCards = research.querySelectorAll(".card");

        gsap.fromTo(researchCards, {
            opacity: 0,
            y: 60
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: {
                trigger: research.querySelector(".cards"),
                start: "top 80%",
                once: true
            }
        });
    }

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        gsap.utils.toArray(".card").forEach((card) => {
            const resetTilt = () => {
                gsap.to(card, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.5,
                    overwrite: "auto"
                });
            };

            card.addEventListener("mousemove", (event) => {
                const rect = card.getBoundingClientRect();
                const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
                const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -12;

                gsap.to(card, {
                    rotateX,
                    rotateY,
                    duration: 0.3,
                    ease: "power2.out",
                    transformPerspective: 800,
                    overwrite: "auto"
                });
            });

            card.addEventListener("mouseleave", resetTilt);
        });
    }

    gsap.utils.toArray(".stats strong").forEach((counter) => {
        const target = Number.parseInt(counter.textContent, 10);

        if (!Number.isFinite(target)) {
            return;
        }

        const state = { count: 0 };
        gsap.to(state, {
            count: target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 80%",
                once: true
            },
            onUpdate: () => {
                counter.textContent = `${Math.floor(state.count)}+`;
            },
            onComplete: () => {
                counter.textContent = `${target}+`;
            }
        });
    });

    const hero = document.querySelector(".hero");
    const scrollHint = document.querySelector(".hero__scroll");

    if (hero && scrollHint) {
        gsap.to(scrollHint, {
            opacity: 0,
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "+=300",
                scrub: true
            }
        });
    }

    const familyTree = document.querySelector(".family-tree");

    if (familyTree) {
        gsap.fromTo(familyTree.querySelectorAll(".tree__line"), {
            scaleY: 0,
            transformOrigin: "top center"
        }, {
            scaleY: 1,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: familyTree,
                start: "top 70%",
                once: true
            }
        });

        gsap.fromTo(familyTree.querySelectorAll(".person"), {
            opacity: 0,
            scale: 0.7,
            y: 50
        }, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            clearProps: "transform",
            scrollTrigger: {
                trigger: familyTree.querySelector(".tree"),
                start: "top 75%",
                once: true
            }
        });
    }

    const migration = document.querySelector(".migration");

    if (migration) {
        gsap.from(migration.querySelectorAll(".map__route"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.5,
            stagger: 0.4,
            scrollTrigger: {
                trigger: migration,
                start: "top 70%",
                once: true
            }
        });

        gsap.from(migration.querySelectorAll(".map__point"), {
            opacity: 0,
            scale: 0,
            duration: 0.8,
            stagger: 0.3,
            scrollTrigger: {
                trigger: migration,
                start: "top 70%",
                once: true
            }
        });
    }
})();
