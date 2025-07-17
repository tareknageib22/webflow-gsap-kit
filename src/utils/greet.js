export function boxAnimation() {

    const boxs = gsap.utils.toArray(".gsap")
    console.log(boxs)

    const t1 = gsap.timeline();

    t1.from(boxs, {
        opacity:0,
        scale:0,
        ease:"ealstic",
        repeat:-1,
        stagger:{each:.05}
    })

}