class ToolTip extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    //triggered when element is attached to dom
    //use for dom initializations
    var span = document.createElement("span");
    span.textContent = ' (?)';
    this.appendChild(span);
  }
}

customElements.define("wc-tooltip", ToolTip);
