// DAPSYdevApplication
//
// - The script is meant to be executed after the document has been parsed
// Example: <script src="app.js" type="module" defer></script>
//
// - Example HTML: <div data-init="Component" data-id="id">...</div>
// An HTML element needs to have "data-init" and "data-id"
// "data-init" - Comma separated list of all components to be initialized on the HTML element
// "data-id" - Unique identifier for all components initialized on the HTML element
//
// - File names for components need to be the same as the name of the component
// Example: Component.js -> export default class Component { ... }
//
// - Class name for initialized components
// Example: static initClassName = "is-init-component"
// Every component needs to contain static property called "initClassName" for identifying initialized components
//
// - Components need to be exported as defaults
// Example: export default class Component { ... }
//
// - The first argument in a new component will be the HTML element on which the component is initialized
//
// - Components need to contain "destroy" method
//

import VhFix from "./components/VhFix";
import Loader from "./components/Loader";

class DAPSYdevApplication {
    constructor() {
        this.components = {};
        this.instances = {};

        this.vhFix = null;
        this.loader = null;

        this.init();
    }

    init() {
        this.vhFix = new VhFix();
        this.loader = new Loader();

        const elements = document.querySelectorAll("[data-init]");

        if (elements.length === 0) {
            return;
        }

        const components = new Set();

        for (const element of elements) {
            const elementComponents = element.dataset.init.trim().split(",");

            for (const component of elementComponents) {
                components.add(component.trim());
            }
        }

        this.initComponents(components);
    }

    async initComponents(components) {
        for (const component of components) {
            const { default: ComponentDefault } = await import(`./components/${component}.js`);

            this.components[component] = ComponentDefault;

            if (this.instances[`${component}`] === undefined) {
                this.instances[`${component}`] = {};
            }

            const elements = document.querySelectorAll(`[data-init~="${component}"]`);

            for (const element of elements) {
                if (element.classList.contains(ComponentDefault.initClassName)) {
                    console.error(`${component} already initialized: ${element.dataset.id}`);
                    return;
                }

                this.instances[component][`${element.dataset.id}`] = new ComponentDefault(element);
            }
        }
    }

    destroy() {
        this.vhFix.destroy();
        this.loader.destroy();

        for (const instance in this.instances) {
            this.destroyComponents(this.instances[instance]);
        }
    }

    destroyComponents(instances) {
        for (const instance in instances) {
            instances[instance].destroy();
            delete instances[instance];
        }
    }
}

window["DAPSYdevApp"] = new DAPSYdevApplication();
