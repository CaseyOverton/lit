import { html, css, LitElement } from 'https://unpkg.com/lit@latest?module';
import './media-card.js';
import './modal.js';

export class AnimeList extends LitElement {
  static styles = css`
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      align-items: center;
      justify-content: center;
      margin-bottom: 2rem;
    }
    button {
      height: 3.5rem;
      width: 3.5rem;
      font-size: 2rem;
      transition:
        background 0.3s,
        color 0.3s,
        box-shadow 0.3s;
    }

    button.prev,
    button.next {
      width: 8rem;
    }

    button.active {
      background-color: rgb(9 15 35);
      color: rgb(255 255 255);
      font-weight: bold;
      border: 2px solid #010101;
      box-shadow: #000000 0px 0px 5px;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
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
    selected: { type: Object },
    currentPage: { type: Number },
    itemsPerPage: { type: Number },
    hasNextPage: { type: Boolean },
  };

  constructor() {
    super();
    this.animeData = [];
    this.selected = null;
    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.hasNextPage = true;
  }

  connectedCallback() {
    super.connectedCallback();
    this.fetchAnime();
  }

  async fetchAnime() {
    try {
      const offset = (this.currentPage - 1) * this.itemsPerPage;
      const res = await fetch(
        `https://kitsu.io/api/edge/anime?page[limit]=${this.itemsPerPage}&page[offset]=${offset}`,
      );
      const json = await res.json();
      this.animeData = json.data;
      this.hasNextPage = json.data.length === this.itemsPerPage;
    } catch (e) {
      console.error('API error:', e);
    }
  }

  _prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchAnime();
    }
  }

  _nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
      this.fetchAnime();
    }
  }

  _goToPage(page) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.fetchAnime();
    }
  }

  render() {
    const pageButtons = [];
    const maxPages = 5;
    for (let i = 1; i <= maxPages; i++) {
      pageButtons.push(i);
    }

    return html`
      <div class="grid" @card-selected=${this._handleCardSelected}>
        ${this.animeData.map(
          (anime) => html`
            <media-card
              .title=${anime.attributes.canonicalTitle}
              .image=${anime.attributes.posterImage.small}
              .description=${anime.attributes.synopsis}
            ></media-card>
          `,
        )}
      </div>

      ${this.selected
        ? html`
            <div class="modal-overlay" @click=${this._closeModal}>
              <div class="modal" @click=${(e) => e.stopPropagation()}>
                <button @click=${this._closeModal}>&times;</button>
                <my-modal
                  .title=${this.selected.title}
                  .image=${this.selected.image}
                  .description=${this.selected.description}
                ></my-modal>
              </div>
            </div>
          `
        : ''}
      <div class="pagination-controls">
        <button class="prev" @click=${this._prevPage} ?disabled=${this.currentPage === 1}>←</button>

        ${pageButtons.map(
          (page) => html`
            <button class=${page === this.currentPage ? 'active' : ''} @click=${() => this._goToPage(page)}>
              ${page}
            </button>
          `,
        )}
        <button class="next" @click=${this._nextPage} ?disabled=${!this.hasNextPage}>→</button>
      </div>
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
