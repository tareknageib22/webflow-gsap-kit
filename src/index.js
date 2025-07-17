import { Home } from "./pages/home/home.js"
import { Smoothscrolling } from "./utils/smoothscrolling.js"

window.Webflow ||= [];
window.Webflow.push(() => {
    document.addEventListener("DOMContentLoaded", () => {

        // ✅ Register smooth scroll
        Smoothscrolling()



        // ✅ gsap aniamtions
        Home();


    })

});
