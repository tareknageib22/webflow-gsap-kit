export function InfiniteHorizontalAnimation() {
    const grid = document.querySelector(".reviews_cards-grid");
    if (!grid) return;

    let animation;
    const originalCards = Array.from(grid.children).slice(); // Only original cards

    function setupAnimation() {
        // 🔄 Clean previous animation & reset grid
        gsap.killTweensOf(grid);
        grid.innerHTML = "";
        originalCards.forEach(card => grid.appendChild(card.cloneNode(true)));

        const cards = Array.from(grid.children);

        // 🔁 Duplicate all cards once for seamless scroll
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            grid.appendChild(clone);
        });

        // 🧠 Measure total width
        let totalWidth = 0;
        cards.slice(0, originalCards.length).forEach(card => {
            const style = getComputedStyle(card);
            const width = card.offsetWidth +
                          parseFloat(style.marginLeft || 0) +
                          parseFloat(style.marginRight || 0);
            totalWidth += width;
        });

        // 🌀 Animate
        animation = gsap.to(grid, {
            x: `-=${totalWidth}`,
            duration: 30,
            ease: "none",
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
            }
        });
    }

    // 🕒 Debounce utility
    function debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    // ♻️ Recalculate on resize (debounced)
    const handleResize = debounce(() => {
        setupAnimation();
    }, 300);

    window.addEventListener("resize", handleResize);

    // 🟢 Initial call
    setupAnimation();
}
