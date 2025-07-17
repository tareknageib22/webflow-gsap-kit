export function Smoothscrolling() {
    const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1,
        effects: true,
        smoothTouch: 0.1, // small value for touch screen if needed ! 
    });

    ScrollTrigger.refresh(); // 💡 Required after smoother
}