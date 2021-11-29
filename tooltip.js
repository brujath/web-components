class ToolTip extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    var span = document.createElement("span");
    span.textContent = ' (?)';
    this.appendChild(span);
  }
}

customElements.define("wc-tooltip", ToolTip);
