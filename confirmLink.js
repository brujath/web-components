class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", function anchorClick(event) {
      if (!confirm("do you want to leave?")) event.preventDefault();
    });
  }
}

/*
 * third attribute object is needed whenever we extend a built in element
 *  and we have to specify which element we are extending
 */
customElements.define("wc-anchor", ConfirmLink, { extends: "a" });
