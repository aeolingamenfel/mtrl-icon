/**
 * The template that is used for the shadow root for every copy of your element,
 * which houses the styles and layout for the element.
 */
const template = document.createElement("template");
template.innerHTML = `
    <style>
        :host {
            display: inline-block;
        }

        .material-icons {
            font-family: 'Material Icons';
            font-weight: normal;
            font-style: normal;
            font-size: 24px;
            line-height: 1;
            letter-spacing: normal;
            text-transform: none;
            display: inline-block;
            white-space: nowrap;
            word-wrap: normal;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
          }
    </style>
    <i class="material-icons"></i>
`;

/**
 * Controlling class for the fa-icon element.
 */
class MaterialIcon extends HTMLElement {
    /**
     * Part of the custom element spec. Returns an array of strings that are 
     * the names of attributes that this element observes/listens to.
     * 
     * @returns {Array<string>} an array of strings, each of which representing
     *  an attribute.
     */
    static get observedAttributes() {
        return ["name"];
    };

    constructor() {
        super();

        // create shadow root for any children context
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        // defaults
        this.iconName = "";
        this.fontImportComplete = false;
    }

    /**
     * Part of the custom element spec. Called after your element is attached to
     * the DOM. Do anything related to the element or its children here in most
     * cases.
     */
    connectedCallback() {
        MaterialIcon.setupFontImport();

        // setup icon element
        const iconElement = this.shadowRoot.querySelector("i");

        iconElement.textContent = this.iconName;
    }

    /**
     * Part of the custom element spec. Called after your element is remove from
     * the DOM. Disconnect any listeners or anything else here.
     */
    disconnectedCallback() {}

    /**
     * Part of the custom element spec. Called when one of the observed
     * attributes changes, either via setAttribute() or with the attribute being
     * manually set in the HTML.
     * 
     * @param {String} name the name of the attribute that changed
     * @param {Mixed} oldValue the previous value of the attribute
     * @param {Mixed} newValue the new value of the attribute
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if(name === name) {
            this.iconName = newValue;

            // This method may be called before the element is fully set up
            if(this.isConnected) {
                const iconElement = this.shadowRoot.querySelector("i");
                
                iconElement.textContent = newValue;
            }
        }
    }

    /**
     * Creates a special style node and inserts in the relevant font face
     * declaration. This is to avoid a bug in newer versions of Chrome. For 
     * more info, see:
     * http://robdodson.me/at-font-face-doesnt-work-in-shadow-dom/
     */
    static setupFontImport() {
        if(MaterialIcon._fontImportComplete) {
            return;
        }

        // create a new style node to hold our new styles
        const styleNode = document.createElement("style");

        styleNode.type = "text/css";

        // create a text node that will contain the @font-face imports
        const styleText = document.createTextNode(`
            @font-face {
                font-family: 'Material Icons';
                font-style: normal;
                font-weight: 400;
                src: url(https://fonts.gstatic.com/s/materialicons/v31/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
            }
        `);
        
        // add the text node to the style node (this will cause the browser to 
        // properly parse the CSS and @font-face declarations)
        styleNode.appendChild(styleText);

        // Important note: we append the style node to the body so that it is 
        // a part of the global CSS scope, therefore circumventing an issue in 
        // which browsers would not load @font-face's within a shadow root.
        document.body.appendChild(styleNode);
        MaterialIcon._fontImportComplete = true;
    }
}

customElements.define("mtrl-icon", MaterialIcon);
