import { html, css, LitElement } from 'https://unpkg.com/lit@latest?module';
import './media-card.js'; 
import './modal.js'

export class AnimeList extends LitElement {
  static styles = css`
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      justify-content: center;
    }

    .modal-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }

    .modal {
      background: white;
      border-radius: 12px;
      padding: 1rem;
      max-width: 400px;
      width: 100%;
      position: relative;
    }

    .modal button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  `;

  static properties = {
    animeData: { type: Array },
    selected: { type: Object }
  };

  constructor() {
    super();
    this.animeData = [];
    this.selected = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchAnime();
  }

  async fetchAnime() {
    try {
      const res = await fetch('https://kitsu.io/api/edge/anime?page[limit]=10');
      const json = await res.json();
      this.animeData = json.data;
    } catch (e) {
      console.error('API error:', e);
    }
  }

  render() {
    return html`
      <div class="grid" @card-selected=${this._handleCardSelected}>
        ${this.animeData.map(anime => html`
          <media-card
            .title=${anime.attributes.canonicalTitle}
            .image=${anime.attributes.posterImage.small}
            .description=${anime.attributes.synopsis}
          ></media-card>
        `)}
      </div>

      ${this.selected ? html`
        <div class="modal-overlay" @click=${this._closeModal}>
          <div class="modal" @click=${e => e.stopPropagation()}>
            <button @click=${this._closeModal}>&times;</button>
            <my-modal
              .title=${this.selected.title}
              .image=${this.selected.image}
              .description=${this.selected.description}
            ></my-modal>
          </div>
        </div>
      ` : ''}
    `;
  }

  _handleCardSelected(event) {
    this.selected = event.detail;
  }

  _closeModal() {
    this.selected = null;
  }
}

customElements.define('anime-list', AnimeList);