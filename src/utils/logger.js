export function logger(){
      // ✅ Logger system
    const LOG_MODE = true;
    function log(type = "log", message = "", element = null) {
        if (!LOG_MODE) return;

        const styles = {
            log: "color: gray;",
            info: "color: blue;",
            warn: "color: orange;",
            error: "color: red; font-weight: bold;",
            success: "color: green;"
        };

        const validTypes = ["log", "info", "warn", "error"];
        const method = validTypes.includes(type) ? type : "log";

        console[method](`%c[GSAP Log]: ${message}`, styles[type] || styles.log);
        if (element) console[method](element);
    }

}