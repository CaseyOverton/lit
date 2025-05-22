import {LitElement, html, css} from 'lit';

export class MyElement extends LitElement {
  static properties = {
    header: {},
  };
  static styles = css`
    .header {
      text-align: center;
      padding: 1rem;
      color: white;
      font-family: 'Copperplate';
    }
  `;

  constructor() {
    super();
    this.header= 'Fanime';
  }

  render() {
    return html`
      <header>
        <h1 class="header">${this.header}</h1>
      </header>
    `;
  }
}
customElements.define('my-element', MyElement);