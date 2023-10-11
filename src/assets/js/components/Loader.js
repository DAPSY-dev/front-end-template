export default class Loader {
    constructor(loaderDOMString = '<div class="loader js-loader"></div>') {
        this.loaderDOMString = loaderDOMString;

        this.classNames = {
            init: "is-init-loader",
            noOverflow: "no-overflow",
            loader: "js-loader",
            showing: "is-showing",
        };

        this.loaderEl = null;

        this.init();
    }

    isInit() {
        return document.documentElement.classList.contains(this.classNames.init);
    }

    init() {
        if (this.isInit()) {
            console.error("Loader is already initialized.");
            return;
        }

        document.body.insertAdjacentHTML("beforeend", this.loaderDOMString);
        this.loaderEl = document.documentElement.querySelector(`.${this.classNames.loader}`);

        document.documentElement.classList.add(this.classNames.init);
    }

    show() {
        document.documentElement.classList.add(this.classNames.noOverflow);
        document.body.classList.add(this.classNames.noOverflow);
        this.loaderEl.classList.add(this.classNames.showing);
    }

    hide() {
        this.loaderEl.classList.remove(this.classNames.showing);
        document.documentElement.classList.remove(this.classNames.noOverflow);
        document.body.classList.remove(this.classNames.noOverflow);
    }

    destroy() {
        if (!this.isInit()) {
            console.error("Loader is not initialized.");
            return;
        }

        this.hide();
        this.loaderEl.parentNode.removeChild(this.loaderEl);
        this.loaderEl = null;

        document.documentElement.classList.remove(this.classNames.init);
    }
}
