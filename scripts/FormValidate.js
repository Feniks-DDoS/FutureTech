const rootSelector = `[data-js-form]`

class FormValidation {
    selectors = {
        form: rootSelector,
        fieldErrors: `[data-js-form-field-errors]`
    }

    errorMessages = {
        tooShort: ({ minLength }) => `Min character ${minLength}`,
        tooLong: ({ maxLength }) => `Max character ${maxLength}`,
        patternMismatch: ({ title }) => title || 'Incorrect value',
        valueMissing: () => 'Incorrect value',
    }

    constructor(rootElement) {
        this.rootElement = rootElement
        this.bindEvent()
    }

    manageErrors( fieldControlElement , errorMessages ) {

        const fieldErrorsElement = fieldControlElement.parentElement.querySelector(this.selectors.fieldErrors)

        fieldErrorsElement.innerHTML = errorMessages
        .map((message) => 
            ` <span class="field__errors"> ${message} </span>`
            )
        .join('')
    }

    validateForm(fieldControlElement) {
   
        const errors = fieldControlElement.validity

        const errorMessages = []

        Object.entries(this.errorMessages).forEach(([errorType, getErrorMessage]) => {
            if(errors[errorType]) {
                errorMessages.push(getErrorMessage(fieldControlElement))
            }
        })

        const isValid = errorMessages.length === 0

        this.manageErrors(fieldControlElement , errorMessages)

        fieldControlElement.ariaInvalid = !isValid

        return isValid
    }

    onBlur(event) {

        const { target } = event

        const isFormField = target.closest(this.selectors.form)
        const isRequired = target.required

        if(isFormField && isRequired) {
            this.validateForm(target)

        }
    }

    onChange(event) {

        const { target } = event

        const isReguired = target.required

        const isToggleType = ['checkbox'].includes(target.type)

        if(isReguired && isToggleType) {
            this.validateForm(target)
        }

    }

    onSubmit(event) {
    
        const isFormElement = event.target.matches(this.selectors.form)

        if(!isFormElement) {
            return
        }

        const allReguiredElement = [...event.target.elements].filter(({required}) =>  required )

        let isFormValid = true
        let firstInvalidFieldControl = null

        allReguiredElement.forEach((element) => {

            const isFieldValid = this.validateForm(element)

            if(!isFieldValid) {
                isFormValid = false

                if(!firstInvalidFieldControl) {
                    firstInvalidFieldControl = element
                }
            }
        })

        if(!isFormValid) {
            event.preventDefault()

            firstInvalidFieldControl.focus()
        }
    }

    bindEvent() {
        document.addEventListener('blur', (event) => {
            this.onBlur(event)
        }, true),
        document.addEventListener('change' , (event) => this.onChange(event)),
        document.addEventListener('submit', (event) => this.onSubmit(event))
    }
}

class FormValidationCollection {
       constructor() {
        this.init()
    }

    
    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new FormValidation(element)
        })
    }
}

export default FormValidationCollection