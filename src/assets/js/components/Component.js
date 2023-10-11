// export default class Component {
//     constructor(element) {
//         this.elements = {
//             main: element,
//         };

//         this.id = this.elements.main.dataset.id;

//         this.classNames = {
//             init: "is-init-component",
//         };

//         this.handleClick = this.handleClick.bind(this);

//         this.init();
//     }

//     isInit() {
//         return this.elements.main.classList.contains(this.classNames.init);
//     }

//     init() {
//         if (this.isInit()) {
//             console.error(`Component is already initialized (id): ${this.id}`);
//             return;
//         }

//         this.addEvents();

//         this.elements.main.classList.add(this.classNames.init);
//     }

//     handleClick(event) {
//         console.log(event);
//     }

//     addEvents() {
//         this.elements.main.addEventListener("click", this.handleClick);
//     }

//     removeEvents() {
//         this.elements.main.removeEventListener("click", this.handleClick);
//     }

//     destroy() {
//         if (!this.isInit()) {
//             console.error(`Component is not initialized (id): ${this.id}`);
//             return;
//         }

//         this.removeEvents();

//         this.elements.main.classList.remove(this.classNames.init);
//     }
// }
