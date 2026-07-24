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

    function qs(selector, parent) {
        return (parent || document).querySelector(selector);
    }

    function qsa(selector, parent) {
        return Array.from(
            (parent || document).querySelectorAll(selector)
        );
    }

    function normalizePath(path) {
        let result = path
            .split("?")[0]
            .split("#")[0]
            .replace(/\\/g, "/");

        result = result.replace(
            /\/index\.html?$/i,
            "/"
        );

        result = result.replace(
            /^\/([^/]+)\/\1\.html?$/i,
            "/$1/"
        );

        result = result.replace(
            /^\/([^/]+)\.html?$/i,
            "/$1/"
        );

        if (
            result.length > 1 &&
            !result.endsWith("/")
        ) {
            result += "/";
        }

        return result || "/";
    }

    window.DaneshPool = {
        qs: qs,
        qsa: qsa,
        reducedMotion: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches,
    };

    /*
    |--------------------------------------------------------------------------
    | Header Scroll
    |--------------------------------------------------------------------------
    */

    function initHeaderScroll() {
        const header = qs(
            "#site-header, .site-header"
        );

        if (!header) {
            return;
        }

        function updateHeader() {
            header.classList.toggle(
                "is-scrolled",
                window.scrollY > 20
            );
        }

        updateHeader();

        window.addEventListener(
            "scroll",
            updateHeader,
            { passive: true }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Active Navigation
    |--------------------------------------------------------------------------
    */

    function initActiveNavigation() {
        const links = qsa(
            ".main-navigation__list a"
        );

        if (!links.length) {
            return;
        }

        const currentPath = normalizePath(
            window.location.pathname
        );

        links.forEach(function (link) {
            const item = link.closest("li");

            if (!item) {
                return;
            }

            item.classList.remove("is-active");
            link.removeAttribute("aria-current");

            const href = link.getAttribute("href");

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("tel:") ||
                href.startsWith("mailto:") ||
                href.startsWith("http://") ||
                href.startsWith("https://")
            ) {
                return;
            }

            let linkPath;

            try {
                linkPath = normalizePath(
                    new URL(
                        href,
                        document.baseURI
                    ).pathname
                );
            } catch (error) {
                return;
            }

            if (linkPath === currentPath) {
                item.classList.add("is-active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );
            }
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Mobile Menu
    |--------------------------------------------------------------------------
    */

    function initMobileMenu() {
        const toggle = qs(
            ".menu-toggle, .mobile-menu-toggle"
        );

        const navigation = qs(
            "#main-navigation, .main-navigation"
        );

        const overlay = qs(
            ".navigation-overlay"
        );

        const closeButtons = qsa(
            "[data-menu-close]"
        );

        if (!toggle || !navigation) {
            return;
        }

        function closeMenu() {
            toggle.classList.remove("is-active");
            navigation.classList.remove("is-open");

            if (overlay) {
                overlay.classList.remove(
                    "is-visible"
                );
            }

            toggle.setAttribute(
                "aria-expanded",
                "false"
            );

            toggle.setAttribute(
                "aria-label",
                "باز کردن منوی سایت"
            );

            document.body.classList.remove(
                "menu-is-open"
            );
        }

        function openMenu() {
            toggle.classList.add("is-active");
            navigation.classList.add("is-open");

            if (overlay) {
                overlay.classList.add(
                    "is-visible"
                );
            }

            toggle.setAttribute(
                "aria-expanded",
                "true"
            );

            toggle.setAttribute(
                "aria-label",
                "بستن منوی سایت"
            );

            document.body.classList.add(
                "menu-is-open"
            );
        }

        toggle.addEventListener(
            "click",
            function () {
                const isOpen =
                    toggle.getAttribute(
                        "aria-expanded"
                    ) === "true";

                isOpen ? closeMenu() : openMenu();
            }
        );

        closeButtons.forEach(function (button) {
            button.addEventListener(
                "click",
                closeMenu
            );
        });

        navigation.addEventListener(
            "click",
            function (event) {
                if (
                    event.target.closest("a")
                ) {
                    closeMenu();
                }
            }
        );

        document.addEventListener(
            "keydown",
            function (event) {
                if (event.key === "Escape") {
                    closeMenu();
                }
            }
        );

        document.addEventListener(
            "click",
            function (event) {
                const inside =
                    navigation.contains(event.target);

                const onToggle =
                    toggle.contains(event.target);

                if (
                    !inside &&
                    !onToggle &&
                    navigation.classList.contains(
                        "is-open"
                    )
                ) {
                    closeMenu();
                }
            }
        );

        window.addEventListener(
            "resize",
            function () {
                if (window.innerWidth > 900) {
                    closeMenu();
                }
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Current Year
    |--------------------------------------------------------------------------
    */

    function initCurrentYear() {
        qsa("[data-current-year]").forEach(
            function (element) {
                element.textContent =
                    new Date().toLocaleDateString(
                        "fa-IR",
                        {
                            year: "numeric",
                        }
                    );
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Smooth Anchor Scroll
    |--------------------------------------------------------------------------
    */

    function initSmoothAnchors() {
        document.addEventListener(
            "click",
            function (event) {
                const link =
                    event.target.closest(
                        'a[href^="#"]'
                    );

                if (!link) {
                    return;
                }

                const href =
                    link.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }

                const target =
                    document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        window.DaneshPool.reducedMotion
                            ? "auto"
                            : "smooth",
                    block: "start",
                });
            }
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Start
    |--------------------------------------------------------------------------
    */

    ready(function () {
        initHeaderScroll();
        initActiveNavigation();
        initMobileMenu();
        initCurrentYear();
        initSmoothAnchors();
    });
})();