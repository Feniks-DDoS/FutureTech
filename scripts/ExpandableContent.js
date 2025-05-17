import pxToRem from "./utils/pxToRem.js"

const rootSelector = `[data-js-expandaple-content]`


class ExpandapleContent {

    selectors = {
        root: rootSelector,
        button: `[data-js-expandaple-content-button]`,
        closeButton: `[data-js-expandaple-content-close-button]`,
    }

    stateClasses = {
        isExpanded: 'is-expanded',
        isClose: 'is-close',

    }

    animationParams = {
        duration: 500,
        easing: 'ease',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.buttonElement = rootElement.querySelector(this.selectors.button)
        this.closeButtonElement = rootElement.querySelector(this.selectors.closeButton)
        this.bindEvents()
    }

    expand() {
        const {  offsetHeight, scrollHeight  } = this.rootElement

        this.rootElement.classList.add(this.stateClasses.isExpanded)

        this.rootElement.animate([
            {
                maxHeight: `${pxToRem(offsetHeight)}rem`
            },  
            {
                maxHeight: `${pxToRem(scrollHeight)}rem`
            },
        ], this.animationParams)
    }

    close() {
        this.closeButtonElement = this.rootElement.classList.remove(this.stateClasses.isExpanded)
         
        this.rootElement.scrollIntoView({behavior: 'smooth'})
     
    }

    onButtonClick = () => {
        this.expand()   
    }

    onCloseClick = () => {
        this.close()
    }

    bindEvents() {
        this.buttonElement.addEventListener('click' , this.onButtonClick)
        this.closeButtonElement.addEventListener('click', this.onCloseClick)
    }

}

class ExpandapleContentCollection {
    constructor() {
        this.init()
    }

    
    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new ExpandapleContent(element)
        })
    }
}

export default ExpandapleContentCollection