import { html, css, LitElement } from 'https://unpkg.com/lit@latest?module';

export class Header extends LitElement {
  static properties = {
    header: {},
  };
  static styles = css`
    .header {
      text-align: center;
      padding: 1rem;
      color: white;
      font-family: 'Copperplate';
      font-size: 4rem;
    }
  `;

  constructor() {
    super();
    this.header = 'Fanime';
  }

  render() {
    return html`
      <header>
        <h1 class="header">${this.header}</h1>
      </header>
    `;
  }
}
customElements.define('my-header', Header);
