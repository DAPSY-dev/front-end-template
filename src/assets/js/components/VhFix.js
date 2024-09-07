import { throttle } from "../tools/helpers.js";

export default class VhFix {
    constructor() {
        this.initClassName = "is-init-vhFix";
        this.throttleVhFn = throttle(this.vhFn.bind(this));

        this.init();
    }

    init() {
        if (document.documentElement.classList.contains(this.initClassName)) {
            console.error("VhFix is already initialized.");
            return;
        }

        this.vhFn();
        this.addEvents();

        document.documentElement.classList.add(this.initClassName);
    }

    vhFn() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    addEvents() {
        window.addEventListener("resize", this.throttleVhFn);
    }

    removeEvents() {
        window.removeEventListener("resize", this.throttleVhFn);
    }

    destroy() {
        if (!document.documentElement.classList.contains(this.initClassName)) {
            console.error("VhFix is not initialized.");
            return;
        }

        this.removeEvents();

        document.documentElement.classList.remove(this.initClassName);
    }
}
