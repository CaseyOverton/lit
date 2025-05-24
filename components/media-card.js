import { html, css, LitElement } from 'https://unpkg.com/lit@latest?module';

class MediaCard extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String }
  };

  static styles = css`
    .card {
      border: 1px solid #ccc;
      border-radius: 12px;
      overflow: hidden;
      width: 250px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      --angle: 45deg; 
      background: white;
      opacity: 0.9;
      height: 11rem;
    }

    img {
      width: 100%;
      height: auto;
      display: block;
    }

    .content {
      padding: 1rem;
    }

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
    }

    p {
      font-size: 0.9rem;
      color: #555;
    }
  `;

  render() {
    return html`
      <div class="card" @click="${this._onClick}">
        <div class="content">
          <h3>${this.title}</h3>
          <p>${this.description}</p>
        </div>
      </div>
    `;
  }

  _onClick() {
    this.dispatchEvent(new CustomEvent('card-selected', {
      detail: {
        title: this.title,
        description: this.description
      },
      bubbles: true,
      composed: true
    }));
  }
}

customElements.define('media-card', MediaCard);