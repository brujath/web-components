var $ = document.querySelector.bind(document);
class ToolTip extends HTMLElement {
  constructor() {
    super();
    this._toolTipIcon;
    this._toolTipContainer;
    this._toolTipText = "Please add text attribute for your wc";
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
    <style>
      span {
        color: red;
      }
      div {
        background-color: black;
        color: white;
        position: absolute;
        z-index: 1;
        padding: 10px;
      }

      :host(.host) {
        background-color: #bbb;
      }

      :host-context(p.example) {
        font-size: 18px;
      }

      ::slotted(.welcome) {
        border: 1px solid black;
      }
    </style>
    <slot></slot>
    <span> (?) </span>
    `;
  }

  connectedCallback() {
    //triggered when element is attached to dom
    //use for dom initializations
    // var span = document.createElement("span");
    // span.textContent = ' (?)';
    if (this.getAttribute("text")) {
      this._toolTipText = this.getAttribute("text");
    }
    this._toolTipIcon = this.shadowRoot.querySelector("span");
    this._toolTipIcon.addEventListener("mouseenter", this._showTip);
    this._toolTipIcon.addEventListener("mouseleave", this._removeTip);
    this.style.position = "relative";
  }

  disconnectedCallback() {
    console.log('disconnected');
    this._toolTipIcon.removeEventListener("mouseenter", this._showTip);
    this._toolTipIcon.removeEventListener("mouseleave", this._removeTip);
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(name, oldVal, newVal);
    if(name === 'text' && oldVal !== newVal) {
      this._toolTipText = newVal;
    }
  }

  static get observedAttributes() {
    return ["text"];
  }

  _showTip = () => {
    //arrow function to keep context of our element
    this._toolTipContainer = document.createElement("div");
    this._toolTipContainer.textContent = this._toolTipText;
    this.shadowRoot.appendChild(this._toolTipContainer);
  };

  _removeTip = () => {
    this.shadowRoot.removeChild(this._toolTipContainer);
  };
}

customElements.define("wc-tooltip", ToolTip);
