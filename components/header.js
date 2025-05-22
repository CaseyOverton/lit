@customElement('my-header')
export class MyHeader extends LitElement {
  // Optional: Define reactive properties
  @property() title = 'Default Title';

  // Define styles (optional, but recommended for encapsulation)
  static styles = css`
    :host {
      display: block;
      background-color: #333;
      color: white;
      padding: 10px;
      text-align: center;
    }

    h1 {
      margin: 0;
    }
  `;

  // Render method to define the component's HTML
  render() {
    return html`
      <h1>${this.title}</h1>
      <p> hi </p>
      <slot></slot>
    `;
  }
}