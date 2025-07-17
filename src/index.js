import { Home } from "./pages/home/home.js"
import { Smoothscrolling } from "./utils/smoothscrolling.js"

window.Webflow ||= [];
window.Webflow.push(() => {
    document.addEventListener("DOMContentLoaded", () => {
        // ✅ Register all needed GSAP plugins once
        gsap.registerPlugin(
            ScrollTrigger,
            ScrollToPlugin,
            GSDevTools,
            Flip,
            ScrollSmoother,
            SplitText
        );
        // ✅ Register smooth scroll
        Smoothscrolling()
        // ✅ gsap aniamtions
        Home();

        // ✅ Debug panel (remove in production)
        GSDevTools.create({ animation: master, id: "master" });
    })

});
