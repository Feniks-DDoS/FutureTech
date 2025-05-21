import BaseComponent from "./BaseComponent.js"


const rootSelector = `[data-js-tabs]`



class Tabs extends BaseComponent {
    selectors = {
        root: rootSelector,
        button: `[data-js-tabs-button]`,
        content: `[data-js-tabs-content]`,
    }

    stateClasses = {
        isActive: 'is-active',
    }

    stateAtributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }


    constructor(rootElement) {
        super()
        this.rootElement = rootElement
        this.buttonElements = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElements = this.rootElement.querySelectorAll(this.selectors.content)

        this.state = this.getProxyState({
            activeTabIndex: [...this.buttonElements]
            .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))
        })
        this.limitTabsIndex = this.buttonElements.length - 1

        this.bindEvents()
    }

    updateUI() {
        const { activeTabIndex } = this.state

        this.buttonElements.forEach((buttonElement , index) => {
            const isActive = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)

            buttonElement.setAttribute(this.stateAtributes.ariaSelected , isActive.toString())
             buttonElement.setAttribute(this.stateAtributes.tabIndex , isActive ? '0' : -1)


        })

        this.contentElements.forEach((contentElement , index) => {
            const isActive = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })
    }

    activetaTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.buttonElements[newTabIndex].focus()
    }

    previousTab = () => {

        const newTabIndex = this.state.activeTabIndex === 0
        ? this.limitTabsIndex 
        : this.state.activeTabIndex - 1

        this.activetaTab(newTabIndex)

    }

    nextTab = () => {
         const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
         ? 0 
         : this.state.activeTabIndex + 1
         
         this.activetaTab(newTabIndex)
    }

    firstTab = () => {
        this.activetaTab(0)
    }

    lastTab = () => {
        this.activetaTab(this.limitTabsIndex)
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
    }


    onKeyDown = (event) => {
        const { code , metakey } = event

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code]

        const isMacHomeKey = metakey && code === 'ArrowLeft'

        if(isMacHomeKey) {
            this.firstTab()
            return
        }

        const isMacEndKey = metakey && code === 'ArrowRight'

        if(isMacEndKey) {
            this.lastTab()
            return
        }


        action?.()
    }

    bindEvents() {
        this.buttonElements.forEach((buttonElement , index) => {
            buttonElement.addEventListener('click' , () => this.onButtonClick(index))
        })
        this.rootElement.addEventListener('keydown' , this.onKeyDown )
    }
}

class TabsCollection {

    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element)
        })

    }
}


export default TabsCollection 