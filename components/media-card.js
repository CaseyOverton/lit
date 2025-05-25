import { html, css, LitElement } from 'https://unpkg.com/lit@latest?module';

class MediaCard extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String },
    image: { type: String },
  };

  static styles = css`
    .card {
      border: 1px solid #ccc;
      border-radius: 12px;
      overflow: scroll;
      width: 250px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      --angle: 45deg;
      background: white;
      opacity: 0.9;
      height: 25rem;
    }
    .content {
      padding: 1rem;
    }
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.3rem;
      text-align: center;
    }
    img {
      width: 100%;
      height: auto;
      display: block;
    }
    p {
      font-size: 1.2rem;
      color: #555;
    }

    @media (max-width: 420px) {
      .card {
        width: 20rem;
        height: 38rem;
      }
      h3 {
        font-size: 2rem;
      }
      p {
        font-size: 1.5rem;
      }
    }
  `;

  render() {
    return html`
      <div class="card" @click="${this._onClick}">
        <div class="content">
          <h3>${this.title}</h3>
          <img src="${this.image}" alt="${this.title}" />
          <p>${this.description}</p>
        </div>
      </div>
    `;
  }

  _onClick() {
    this.dispatchEvent(
      new CustomEvent('card-selected', {
        detail: {
          title: this.title,
          image: this.image,
          description: this.description,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }
}

customElements.define('media-card', MediaCard);
