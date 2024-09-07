// import { COMPONENT_DEFAULTS, componentOptions } from "./ComponentPluginOptions";
// import ComponentJS from "component-js";

// export default class ComponentPlugin {
//     constructor(element, options = {}) {
//         this.elements = {
//             main: element,
//         };

//         this.options = {
//             ...COMPONENT_DEFAULTS,
//             ...options,
//         };

//         this.id = this.elements.main.dataset.id;

//         this.classNames = {
//             init: "is-init-component",
//         };

//         this.instance = null;

//         this.init();
//     }

//     init() {
//         if (this.elements.main.classList.contains(this.classNames.init)) {
//             console.error(`Component is already initialized (id): ${this.id}`);
//             return;
//         }

//         const dataComponentOptions = this.elements.main.dataset.componentOptions;
//         if (dataComponentOptions !== undefined) {
//             this.options = {
//                 ...this.options,
//                 ...componentOptions(dataComponentOptions, this.elements.main),
//             };
//         }

//         const dataComponentJson = this.elements.main.dataset.componentJson;
//         if (dataComponentJson !== undefined) {
//             this.options = {
//                 ...this.options,
//                 ...JSON.parse(dataComponentJson),
//             };
//         }

//         this.instance = new ComponentJS(this.elements.main, this.options);

//         this.elements.main.classList.add(this.classNames.init);
//     }

//     destroy() {
//         if (this.instance === null) {
//             console.error(`Component is not initialized (id): ${this.id}`);
//             return;
//         }

//         this.instance.destroy();
//         this.instance = null;

//         this.elements.main.classList.remove(this.classNames.init);
//     }
// }
