const rootSelector = `[data-js-blog]`

class Like {

    selectors = {
        root: rootSelector,
        button: `[data-js-like-span]`
    }

    stateClasses = {
        isActive: 'is-active'
    }


    constructor(rootElement) {
 
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)

        this.bindEvents()
    }

    onClick = () => {
        this.rootElement.classList.toggle(this.stateClasses.isActive)
    }

    bindEvents() {
        this.rootElement.addEventListener('click' , this.onClick)
    }


}

class LikeCollection {

    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((Element) => {
            new Like(Element)
        })
    }
}


export default LikeCollection