(function () {
    "use strict";

    function ready(callback) {
        if (document.readyState === "loading") {
            document.addEventListener(
                "DOMContentLoaded",
                callback,
                { once: true }
            );
        } else {
            callback();
        }
    }

    function qsa(selector) {
        return Array.from(
            document.querySelectorAll(selector)
        );
    }

    function firstExisting(selector) {
        if (!selector) {
            return null;
        }

        const selectors = selector.split(",");

        for (const item of selectors) {
            const clean = item.trim();

            if (!clean) {
                continue;
            }

            const element =
                document.querySelector(clean);

            if (element) {
                return element;
            }
        }

        return null;
    }

    function safeFrom(
        selector,
        options,
        triggerSelector
    ) {
        if (
            typeof window.gsap === "undefined"
        ) {
            return;
        }

        const targets = qsa(selector);

        if (!targets.length) {
            return;
        }

        const config = {
            ...options,
        };

        if (config.scrollTrigger) {
            if (
                typeof window.ScrollTrigger ===
                "undefined"
            ) {
                delete config.scrollTrigger;
            } else {
                const trigger =
                    firstExisting(
                        triggerSelector
                    ) || targets[0];

                config.scrollTrigger = {
                    ...config.scrollTrigger,
                    trigger: trigger,
                };
            }
        }

        window.gsap.from(
            targets,
            config
        );
    }

    function safeTo(
        selector,
        options,
        triggerSelector
    ) {
        if (
            typeof window.gsap === "undefined"
        ) {
            return;
        }

        const targets = qsa(selector);

        if (!targets.length) {
            return;
        }

        const config = {
            ...options,
        };

        if (config.scrollTrigger) {
            if (
                typeof window.ScrollTrigger ===
                "undefined"
            ) {
                delete config.scrollTrigger;
            } else {
                const trigger =
                    firstExisting(
                        triggerSelector
                    ) || targets[0];

                config.scrollTrigger = {
                    ...config.scrollTrigger,
                    trigger: trigger,
                };
            }
        }

        window.gsap.to(
            targets,
            config
        );
    }

    function safeFromTo(
        targets,
        fromVars,
        toVars
    ) {
        if (
            typeof window.gsap ===
            "undefined"
        ) {
            return;
        }

        if (!targets || !targets.length) {
            return;
        }

        window.gsap.fromTo(
            targets,
            fromVars,
            toVars
        );
    }

    function initAnimations() {
        const reducedMotion =
            window.DaneshPool &&
            window.DaneshPool.reducedMotion;

        if (
            reducedMotion ||
            typeof window.gsap ===
                "undefined"
        ) {
            return;
        }

        if (
            typeof window.ScrollTrigger !==
            "undefined"
        ) {
            window.gsap.registerPlugin(
                window.ScrollTrigger
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Hero
        |--------------------------------------------------------------------------
        */

        safeFrom(
            ".hero-section__content, [class*='__hero-content']",
            {
                y: 42,
                opacity: 0,
                duration: 0.85,
                ease: "power3.out",
            }
        );

        safeFrom(
            "[class*='__breadcrumbs']",
            {
                y: 18,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
            }
        );

        safeFrom(
            ".hero-section__image-wrapper",
            {
                x: -45,
                opacity: 0,
                scale: 0.95,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
            }
        );

        /*
        |--------------------------------------------------------------------------
        | سکشن‌ها و کارت‌ها
        |--------------------------------------------------------------------------
        */

        safeFrom(
            [
                ".about-preview .section-heading",
                ".facilities-preview__heading",
                ".schedule-preview__heading",
                ".classes-preview__heading",
                ".coaches-preview__heading",
                ".gallery-preview__heading",
                ".faq-preview .section-heading",
                ".blog-page__heading",
                ".schedule-page__heading",
                ".pricing-page__heading",
                ".classes-page__heading",
                ".coaches-page__heading",
                ".gallery-page__heading",
                ".faq-page__heading",
            ].join(","),
            {
                y: 30,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    start: "top 88%",
                    once: true,
                },
            }
        );

        safeFrom(
            [
                ".facility-card",
                ".schedule-slot",
                ".class-card",
                ".coach-card",
                ".gallery-preview__item",
                ".gallery-page__item",
                ".faq-item",
                ".faq-page__item",
                ".booking-option-card",
                ".pricing-card",
                ".schedule-page__card",
                ".classes-page__course-card",
                ".coaches-page__card",
                ".facility-detail-card",
                ".about-value-card",
                ".contact-info-card",
                ".blog-page__card:not(.blog-page__card--delayed)",
            ].join(","),
            {
                y: 28,
                opacity: 0,
                scale: 0.97,
                stagger: 0.08,
                duration: 0.65,
                ease: "power3.out",
                scrollTrigger: {
                    start: "top 86%",
                    once: true,
                },
            },
            [
                ".facilities-preview__grid",
                ".schedule-preview__list",
                ".classes-preview__grid",
                ".coaches-preview__grid",
                ".gallery-preview__grid",
                ".gallery-page__grid",
                ".faq-preview__list",
                ".faq-page__accordion",
                ".reservation-page__cards",
                ".pricing-page__cards",
                ".schedule-page__cards",
                ".classes-page__grid",
                ".coaches-page__grid",
                ".facilities-page__grid",
                ".contact-page__info-grid",
                ".blog-page__grid",
            ].join(",")
        );

        /*
        |--------------------------------------------------------------------------
        | باکس‌های داخلی
        |--------------------------------------------------------------------------
        */

        safeFrom(
            [
                ".about-preview__media",
                ".about-preview__content",
                ".about-preview__actions",
                ".facilities-preview__footer",
                ".schedule-preview__bottom",
                ".classes-preview__footer",
                ".coaches-preview__footer",
                ".gallery-preview__footer",
                ".faq-preview__intro-card",
                ".faq-preview__footer",
                ".final-cta__box",
                ".reservation-page__notice",
                ".reservation-page__links-box",
                ".schedule-page__notice",
                ".schedule-page__related-box",
                ".pricing-page__notice",
                ".pricing-page__guide-box",
                ".pricing-page__cta",
                ".classes-page__intro-content",
                ".classes-page__intro-card",
                ".classes-page__guide-box",
                ".classes-page__cta",
                ".coaches-page__intro-content",
                ".coaches-page__intro-card",
                ".coaches-page__related-box",
                ".coaches-page__cta",
                ".facilities-page__intro-content",
                ".facilities-page__intro-media",
                ".facilities-page__experience-box",
                ".facilities-page__cta",
                ".gallery-page__info-box",
                ".about-page__intro-media",
                ".about-page__intro-content",
                ".about-page__links-box",
                ".about-page__cta",
                ".contact-page__form-wrapper",
                ".contact-page__map-wrapper",
                ".contact-page__related-box",
                ".faq-page__sidebar-card",
                ".faq-page__quick-links",
                ".faq-page__main",
                ".faq-page__cta",
                ".blog-page__cta",
            ].join(","),
            {
                y: 24,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                    start: "top 88%",
                    once: true,
                },
            }
        );

        /*
        |--------------------------------------------------------------------------
        | کارت‌های شناور
        |--------------------------------------------------------------------------
        */

        safeFrom(
            ".floating-card--schedule, .floating-card--training",
            {
                y: 22,
                opacity: 0,
                scale: 0.86,
                stagger: 0.15,
                duration: 0.7,
                ease: "power3.out",
            }
        );

        safeTo(
            ".floating-card--schedule",
            {
                y: -12,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            }
        );

        safeTo(
            ".floating-card--training",
            {
                y: 11,
                duration: 2.6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.2,
            }
        );

        /*
        |--------------------------------------------------------------------------
        | اشکال پس‌زمینه
        |--------------------------------------------------------------------------
        */

        safeTo(
            ".hero-section__background-shape--one, .final-cta__shape--one",
            {
                x: -24,
                y: 25,
                rotation: 8,
                duration: 6,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            }
        );

        safeTo(
            ".hero-section__background-shape--two, .final-cta__shape--two",
            {
                x: 20,
                y: -18,
                duration: 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            }
        );

        /*
        |--------------------------------------------------------------------------
        | Parallax
        |--------------------------------------------------------------------------
        */

        safeTo(
            ".hero-section__image-wrapper",
            {
                y: 55,
                ease: "none",
                scrollTrigger: {
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                },
            },
            ".hero-section"
        );

        safeTo(
            ".about-preview__image-frame, .about-page__image-frame",
            {
                y: -18,
                ease: "none",
                scrollTrigger: {
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                },
            },
            ".about-preview, .about-page__intro-section"
        );

        /*
        |--------------------------------------------------------------------------
        | نمایش سه مقاله تأخیری
        |--------------------------------------------------------------------------
        */

        document.addEventListener(
            "danesh:blog-reveal",
            function (event) {
                const cards =
                    event.detail &&
                    event.detail.cards
                        ? event.detail.cards
                        : [];

                if (!cards.length) {
                    return;
                }

                safeFromTo(
                    cards,
                    {
                        opacity: 0,
                        y: 32,
                        scale: 0.97,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.12,
                        ease: "power3.out",
                        clearProps:
                            "transform,opacity",
                    }
                );
            }
        );

        window.addEventListener(
            "load",
            function () {
                if (
                    window.ScrollTrigger
                ) {
                    window.ScrollTrigger.refresh();
                }
            },
            { once: true }
        );
    }

    ready(initAnimations);
})();