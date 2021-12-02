class ToolTip extends HTMLElement {
  constructor() {
    super();
    this._toolTipContainer;
    this._toolTipText = "Please add text attribute for your wc";
  }

  connectedCallback() {
    //triggered when element is attached to dom
    //use for dom initializations
    var span = document.createElement("span");
    span.textContent = ' (?)';
    if (this.getAttribute('text')) {
        this._toolTipText = this.getAttribute('text');
    }
    span.addEventListener('mouseenter', this._showTip);
    span.addEventListener('mouseleave', this._removeTip);
    this.appendChild(span);
  }

  _showTip = () => {
    //arrow function to keep context of our element
    this._toolTipContainer = document.createElement('div');
    this._toolTipContainer.textContent = this._toolTipText;
    this.appendChild(this._toolTipContainer);
  }

  _removeTip = () => {
    this.removeChild(this._toolTipContainer);
  }
}

customElements.define("wc-tooltip", ToolTip);
