 class Modal extends HTMLElement {
     constructor() {
         super();
         this.attachShadow({mode: 'open'});
         this.opened = this.getAttribute('opened');
         this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background-color: rgba(0,0,0,0.75);
                    z-index: 1;
                }
                #modal {
                    z-index: 2;
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    height: 30rem;
                    border-radius: 4px;
                    background-color: white;
                }
                .modal-container {
                    position: relative;
                }
                /* The Close Button */
                .close {
                    color: #aaa;
                    position: absolute;
                    right: 28px;
                    top: 0;
                    font-size: 28px;
                    font-weight: bold;
                }

                .close:hover,
                .close:focus {
                    color: black;
                    text-decoration: none;
                    cursor: pointer;
                }

                ::slotted(div.modal-content) {
                    margin: 10px;
                    font-size: 20px;
                }

                :host([opened="true"]) {
                    display: initial;
                }

                :host([opened="false"]) {
                    display: none;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <div class="modal-container">
                    <slot name="modal-content"></slot>
                    <span class="close">&times;</span>
                </div>
            </div>
         `;
     }

    openModal() {
        this.setAttribute("opened", true);
    }

    closeModal() {
        this.setAttribute("opened", false);
    }

     connectedCallback() {
         var close = this.shadowRoot.querySelector('.close');
         close.addEventListener('click', () => {
            this.closeModal();
         })
     }
 }

 customElements.define('wc-modal', Modal);