(function () {
    "use strict";

    var WA_NUM = "989123665400";

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

    function qs(selector, parent) {
        return (parent || document).querySelector(selector);
    }

    function qsa(selector, parent) {
        return Array.from(
            (parent || document).querySelectorAll(selector)
        );
    }

    function refreshScrollTrigger() {
        if (
            window.ScrollTrigger &&
            typeof window.ScrollTrigger.refresh === "function"
        ) {
            window.ScrollTrigger.refresh();
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Generic Filters
    |--------------------------------------------------------------------------
    */

    function initFilter(
        buttonSelector,
        cardSelector,
        buttonKey,
        cardKey
    ) {
        const buttons = qsa(buttonSelector);
        const cards = qsa(cardSelector);

        if (!buttons.length || !cards.length) {
            return;
        }

        buttons.forEach(function (button) {
            button.addEventListener(
                "click",
                function () {
                    const selected =
                        button.dataset[buttonKey];

                    buttons.forEach(function (item) {
                        const active =
                            item === button;

                        item.classList.toggle(
                            "is-active",
                            active
                        );

                        item.setAttribute(
                            "aria-selected",
                            active
                                ? "true"
                                : "false"
                        );
                    });

                    cards.forEach(function (card) {
                        const match =
                            selected === "all" ||
                            card.dataset[cardKey] ===
                                selected;

                        card.hidden = !match;

                        card.setAttribute(
                            "aria-hidden",
                            match
                                ? "false"
                                : "true"
                        );
                    });

                    refreshScrollTrigger();
                }
            );
        });
    }

    function initFilters() {
        initFilter(
            "[data-class-tab]",
            "[data-class-category]",
            "classTab",
            "classCategory"
        );

        initFilter(
            "[data-schedule-filter]",
            "[data-schedule-type]",
            "scheduleFilter",
            "scheduleType"
        );

        initFilter(
            "[data-pricing-filter]",
            "[data-pricing-type]",
            "pricingFilter",
            "pricingType"
        );

        initFilter(
            "[data-coach-filter]",
            "[data-coach-type]",
            "coachFilter",
            "coachType"
        );

        initFilter(
            "[data-gallery-filter]",
            "[data-gallery-category]",
            "galleryFilter",
            "galleryCategory"
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Blog
    |--------------------------------------------------------------------------
    */

    function initBlog() {
        const categoryButtons = qsa(
            "[data-blog-category]"
        );

        const cards = qsa(
            "[data-blog-type]"
        );

        const delayedCards = qsa(
            ".blog-page__card--delayed"
        );

        const status = qs(
            "#blog-infinite-status, .blog-infinite-status"
        );

        if (!categoryButtons.length && !cards.length) {
            return;
        }

        let selected = "all";

        function matches(card) {
            return (
                selected === "all" ||
                card.dataset.blogType === selected
            );
        }

        function updateCards() {
            cards.forEach(function (card) {
                const delayed =
                    card.classList.contains(
                        "blog-page__card--delayed"
                    );

                const revealed =
                    card.classList.contains(
                        "is-delayed-revealed"
                    );

                if (delayed && !revealed) {
                    card.hidden = true;
                    card.setAttribute(
                        "aria-hidden",
                        "true"
                    );
                    return;
                }

                const visible = matches(card);

                card.hidden = !visible;

                card.setAttribute(
                    "aria-hidden",
                    visible
                        ? "false"
                        : "true"
                );
            });
        }

        categoryButtons.forEach(function (button) {
            button.addEventListener(
                "click",
                function () {
                    selected =
                        button.dataset.blogCategory;

                    categoryButtons.forEach(
                        function (item) {
                            const active =
                                item === button;

                            item.classList.toggle(
                                "is-active",
                                active
                            );

                            item.setAttribute(
                                "aria-selected",
                                active
                                    ? "true"
                                    : "false"
                            );
                        }
                    );

                    updateCards();
                    refreshScrollTrigger();
                }
            );
        });

        delayedCards.forEach(function (card) {
            card.hidden = true;

            card.setAttribute(
                "aria-hidden",
                "true"
            );
        });

        if (delayedCards.length) {
            window.setTimeout(function () {
                const revealed = [];

                delayedCards.forEach(function (card) {
                    card.classList.add(
                        "is-delayed-revealed"
                    );

                    const visible = matches(card);

                    card.hidden = !visible;

                    card.setAttribute(
                        "aria-hidden",
                        visible
                            ? "false"
                            : "true"
                    );

                    if (visible) {
                        revealed.push(card);
                    }
                });

                if (status) {
                    status.textContent =
                        "مقالات بیشتری برای مطالعه نمایش داده شد.";
                }

                document.dispatchEvent(
                    new CustomEvent(
                        "danesh:blog-reveal",
                        {
                            detail: {
                                cards: revealed,
                            },
                        }
                    )
                );

                refreshScrollTrigger();
            }, 4000);
        }

        updateCards();
    }

    /*
    |--------------------------------------------------------------------------
    | FAQ Accordion
    |--------------------------------------------------------------------------
    */

    function initAccordion(
        toggleSelector,
        itemSelector,
        answerSelector,
        openClass
    ) {
        const toggles = qsa(toggleSelector);

        if (!toggles.length) {
            return;
        }

        toggles.forEach(function (toggle) {
            toggle.addEventListener(
                "click",
                function () {
                    const item =
                        toggle.closest(itemSelector);

                    if (!item) {
                        return;
                    }

                    const answerId =
                        toggle.getAttribute(
                            "aria-controls"
                        );

                    const answer =
                        answerId
                            ? document.getElementById(
                                  answerId
                              )
                            : qs(
                                  answerSelector,
                                  item
                              );

                    if (!answer) {
                        return;
                    }

                    const opened =
                        toggle.getAttribute(
                            "aria-expanded"
                        ) === "true";

                    const group =
                        item.closest(
                            ".faq-preview__list, .faq-page__accordion"
                        ) || document;

                    qsa(
                        toggleSelector,
                        group
                    ).forEach(function (otherToggle) {
                        const otherItem =
                            otherToggle.closest(
                                itemSelector
                            );

                        if (!otherItem) {
                            return;
                        }

                        const otherAnswerId =
                            otherToggle.getAttribute(
                                "aria-controls"
                            );

                        const otherAnswer =
                            otherAnswerId
                                ? document.getElementById(
                                      otherAnswerId
                                  )
                                : qs(
                                      answerSelector,
                                      otherItem
                                  );

                        if (!otherAnswer) {
                            return;
                        }

                        otherToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        otherItem.classList.remove(
                            openClass
                        );

                        otherAnswer.hidden = true;
                    });

                    if (!opened) {
                        toggle.setAttribute(
                            "aria-expanded",
                            "true"
                        );

                        item.classList.add(
                            openClass
                        );

                        answer.hidden = false;
                    }
                }
            );
        });
    }

    function initFAQ() {
        initAccordion(
            ".faq-item__toggle",
            ".faq-item",
            ".faq-item__answer",
            "faq-item--open"
        );

        initAccordion(
            ".faq-page__toggle",
            ".faq-page__item",
            ".faq-page__answer",
            "faq-page__item--open"
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Gallery Lightbox
    |--------------------------------------------------------------------------
    */

    function initLightbox() {
        const triggers = qsa(
            "[data-gallery-open]"
        );

        const lightbox = qs(
            "#gallery-lightbox"
        );

        if (!triggers.length || !lightbox) {
            return;
        }

        const image = qs(
            ".gallery-lightbox__image",
            lightbox
        );

        const closeButtons = qsa(
            "[data-gallery-close]",
            lightbox
        );

        let lastTrigger = null;

        function close() {
            if (lightbox.hidden) {
                return;
            }

            lightbox.hidden = true;

            if (image) {
                image.src = "";
                image.alt = "";
            }

            document.body.classList.remove(
                "menu-is-open"
            );

            if (lastTrigger) {
                lastTrigger.focus();
            }
        }

        function open(trigger) {
            if (!image) {
                return;
            }

            const source =
                trigger.dataset.galleryImage;

            if (!source) {
                return;
            }

            image.src = source;

            image.alt =
                trigger.dataset.galleryAlt ||
                "تصویر گالری";

            lightbox.hidden = false;
            lastTrigger = trigger;

            document.body.classList.add(
                "menu-is-open"
            );

            const closeButton = qs(
                ".gallery-lightbox__close",
                lightbox
            );

            if (closeButton) {
                closeButton.focus();
            }
        }

        triggers.forEach(function (trigger) {
            trigger.addEventListener(
                "click",
                function () {
                    open(trigger);
                }
            );
        });

        closeButtons.forEach(function (button) {
            button.addEventListener(
                "click",
                close
            );
        });

        document.addEventListener(
            "keydown",
            function (event) {
                if (event.key === "Escape") {
                    close();
                }
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Contact Form
    |--------------------------------------------------------------------------
    */

    function initContactForm() {
        const form = qs(
            "#contact-form"
        );

        if (!form) {
            return;
        }

        const status = qs(
            "#contact-form-status",
            form
        );

        form.addEventListener(
            "submit",
            function (event) {
                event.preventDefault();

                let valid = true;

                qsa(
                    "[required]",
                    form
                ).forEach(function (field) {
                    const error = field.id
                        ? qs(
                              `[data-error-for="${field.id}"]`,
                              form
                          )
                        : null;

                    field.classList.remove(
                        "is-invalid"
                    );

                    if (!field.value.trim()) {
                        valid = false;

                        field.classList.add(
                            "is-invalid"
                        );

                        if (error) {
                            error.textContent =
                                "تکمیل این فیلد الزامی است.";
                        }
                    } else if (error) {
                        error.textContent = "";
                    }
                });

                const phone = qs(
                    "#contact-phone",
                    form
                );

                if (
                    phone &&
                    phone.value.trim()
                ) {
                    const normalized =
                        phone.value.replace(
                            /[\s-]/g,
                            ""
                        );

                    if (normalized.length < 10) {
                        valid = false;

                        phone.classList.add(
                            "is-invalid"
                        );

                        const error = qs(
                            '[data-error-for="contact-phone"]',
                            form
                        );

                        if (error) {
                            error.textContent =
                                "شماره تماس را صحیح وارد کنید.";
                        }
                    }
                }

                if (!status) {
                    return;
                }

                if (!valid) {
                    status.textContent =
                        "لطفاً اطلاعات فرم را بررسی کنید.";

                    status.style.color = "#c53030";
                } else {
                    const nameField = qs(
                        "#contact-name",
                        form
                    );

                    const subjectField = qs(
                        "#contact-subject",
                        form
                    );

                    const messageField = qs(
                        "#contact-message",
                        form
                    );

                    const subjectText =
                        subjectField &&
                        subjectField.options &&
                        subjectField.selectedIndex >= 0
                            ? subjectField.options[
                                  subjectField.selectedIndex
                              ].text
                            : "";

                    const text =
                        "سلام، پیام جدید از فرم تماس وب‌سایت استخر صدف:\n\n" +
                        "نام: " +
                        (nameField
                            ? nameField.value.trim()
                            : "") +
                        "\n" +
                        "شماره تماس: " +
                        phone.value.trim() +
                        "\n" +
                        "موضوع: " +
                        subjectText +
                        "\n" +
                        "متن پیام: " +
                        (messageField
                            ? messageField.value.trim()
                            : "");

                    window.open(
                        "https://wa.me/" + WA_NUM + "?text=" +
                            encodeURIComponent(text),
                        "_blank",
                        "noopener"
                    );

                    status.textContent =
                        "در حال انتقال به واتساپ… لطفاً پیام را ارسال کنید.";

                    status.style.color = "#218739";
                }
            }
        );
    }

    ready(function () {
        initFilters();
        initBlog();
        initFAQ();
        initLightbox();
        initContactForm();
    });
})();