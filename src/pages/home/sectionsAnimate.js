export const SectionsAnimate = () => {
    // ✅ Global Animators
    function animateSectionContentOnly({ trigger, content = [], y = 25, id }) {
        if (!trigger || !content.length) return;

        log("info", `🎯 Triggering content-only section: ${id}`, { trigger, content });

        gsap.timeline({
            scrollTrigger: {
                trigger,
                start: () => {
                    const offset = trigger.offsetHeight * 0.4;
                    const screenRatio = offset / window.innerHeight;
                    return `top ${Math.min(90, 100 - screenRatio * 100)}%`;
                },
                end: "bottom bottom",
                toggleActions: "play none none none",
            }
        }).from(content, {
            y,
            opacity: 0,
            ease: "back.out",
            stagger: { each: 0.05 }
        });

        log("success", `✅ Animated content-only section: ${id}`, trigger);
    }

    function animateSectionWithCards({ trigger, content = [], cards = [], yContent = 25, yCards = 50, delay = "<+=0.3", id }) {
        if (!trigger || !content.length) return;

        log("info", `🎯 Triggering section with cards: ${id}`, { trigger, content, cards });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: () => {
                    const offset = trigger.offsetHeight * 0.4;
                    const screenRatio = offset / window.innerHeight;
                    return `top ${Math.min(90, 100 - screenRatio * 100)}%`;
                },
                end: "bottom bottom",
                toggleActions: "play none none none",
            }
        });

        tl.from(content, {
            y: yContent,
            opacity: 0,
            ease: "back.out",
            stagger: { each: 0.05 }
        });

        if (cards.length) {
            tl.from(cards, {
                y: yCards,
                opacity: 0,
                ease: "back.out",
                stagger: { each: 0.05 }
            }, delay);
        }

        log("success", `✅ Animated section with cards: ${id}`, trigger);
    }

    function animateSectionWithImage({ trigger, content = [], image = null, delay = "<0.3", id }) {
        if (!trigger || !content.length || !image) return;

        log("info", `🎯 Triggering section with image: ${id}`, { trigger, content, image });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger,
                start: () => {
                    const offset = trigger.offsetHeight * 0.4;
                    const screenRatio = offset / window.innerHeight;
                    return `top ${Math.min(90, 100 - screenRatio * 100)}%`;
                },
                end: "bottom bottom",
                toggleActions: "play none none none",
            }
        });

        tl.from(content, {
            scale: 0,
            opacity: 0,
            transformOrigin: "center center",
            ease: "power1.inOut",
            stagger: 0.25
        }, "+=0.2");

        tl.from(image, {
            scale: 0,
            opacity: 0,
            transformOrigin: "center center",
            ease: "back.out",
            duration: 1
        }, delay);

        log("success", `✅ Animated section with image: ${id}`, trigger);
    }

    // ✅ Individual Section Setups
    function intro_Section_animation() {
        animateSectionContentOnly({
            id: "intro",
            trigger: document.querySelector("#section_intro"),
            content: [document.querySelector("#section_intro .container-large")]
        });
    }

    function feature_Section_animation() {
        animateSectionWithCards({
            id: "features",
            trigger: document.querySelector("#section_features"),
            content: gsap.utils.toArray("#section_features_content > *"),
            cards: gsap.utils.toArray("#section_features_cards_wrapper > *")
        });
    }

    function feature_Section_animation_tablet() {
        animateSectionWithCards({
            id: "features_tablet",
            trigger: document.querySelector("#section_features"),
            content: gsap.utils.toArray("#section_features_content > *"),
            cards: gsap.utils.toArray(".features_grid-tablet > *")
        });
    }

    function outcome_section_animation() {
        animateSectionWithCards({
            id: "outcome",
            trigger: document.querySelector("#section_outcome"),
            content: gsap.utils.toArray("#section_outcome_content > *"),
            cards: gsap.utils.toArray("#section_outcome_cards > *")
        });
    }

    function teams_section_animation() {
        animateSectionWithImage({
            id: "teams",
            trigger: document.querySelector("#section_teams"),
            content: gsap.utils.toArray("#section_teams_content > *"),
            image: document.querySelector("#section_teams_img")
        });
    }

    function journey_section_animation() {
        animateSectionContentOnly({
            id: "journey",
            trigger: document.querySelector("#section_journey"),
            content: gsap.utils.toArray("#section_journey_content > *")
        });
    }

    function pricings_section_animation() {
        animateSectionWithCards({
            id: "pricing",
            trigger: document.querySelector("#section_pricings"),
            content: gsap.utils.toArray("#section_pricings_content > *"),
            cards: gsap.utils.toArray("#section_pricings_cards > *")
        });
    }

    function blogs_section_animation() {
        animateSectionWithCards({
            id: "blogs",
            trigger: document.querySelector("#section_blogs"),
            content: gsap.utils.toArray("#section_blogs_content > *"),
            cards: gsap.utils.toArray('[data-target="blog"]')
        });
    }

    function FAQ_section_animation() {
        animateSectionWithCards({
            id: "faq",
            trigger: document.querySelector("#section_FAQs"),
            content: gsap.utils.toArray("#section_FAQs_content > *"),
            cards: gsap.utils.toArray('[data-target="according"]')
        });
    }

    // ✅ Match Media Settings
    ScrollTrigger.matchMedia({
        // Desktop only
        "(min-width: 1200px)": function () {
            log("info", "🖥️ Desktop view detected. Animating...");
            feature_Section_animation();
        },

        // Tablet only
        "(min-width: 768px) and (max-width: 1199px)": function () {
            log("info", "💻 Tablet view detected. Animating...");
            feature_Section_animation_tablet();
        },

        // Tablet + Desktop
        "(min-width: 768px)": function () {
            log("info", "🖥️💻 Tablet + Desktop view detected. Shared logic...");
            intro_Section_animation();
            outcome_section_animation();
            teams_section_animation();
            journey_section_animation();
            pricings_section_animation();
            blogs_section_animation();
            FAQ_section_animation();
        },

        // Mobile only
        "(max-width: 767px)": function () {
            log("info", "📱 Mobile view detected. Animations skipped.");
        }
    });
};
