var $ = document.querySelector.bind(document);
class ToolTip extends HTMLElement {
  constructor() {
    super();
    this._toolTipContainer;
    this._toolTipText = "Please add text attribute for your wc";
    this.attachShadow({mode: 'open'});
    
    var toolTipTemplate = $('#wc-tooltip');
    //toolTipTemplate.content.clone(true) is used to make a copy of the template 
    //.cloneNode(true) is used to figure out if it's a deep copy or not.
    this.shadowRoot.appendChild(toolTipTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    //triggered when element is attached to dom
    //use for dom initializations
    // var span = document.createElement("span");
    // span.textContent = ' (?)';
    if (this.getAttribute('text')) {
        this._toolTipText = this.getAttribute('text');
    }
    var span = this.shadowRoot.querySelector('span');
    span.addEventListener('mouseenter', this._showTip);
    span.addEventListener('mouseleave', this._removeTip);
    this.shadowRoot.appendChild(span);
    this.style.position = 'relative';
  }

  _showTip = () => {
    //arrow function to keep context of our element
    this._toolTipContainer = document.createElement('div');
    this._toolTipContainer.textContent = this._toolTipText;
    this.shadowRoot.appendChild(this._toolTipContainer);
  }

  _removeTip = () => {
    this.shadowRoot.removeChild(this._toolTipContainer);
  }
}

customElements.define("wc-tooltip", ToolTip);
