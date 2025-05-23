import { LitElement, html, css } from 'lit';
import './media-card.js'; // Import the media-card component

class AnimeList extends LitElement {
  static properties = {
    animeData: { type: Array }
  };

  constructor() {
    super();
    this.animeData = [];
  }

  static styles = css`
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
    }
  `;

  async connectedCallback() {
    super.connectedCallback();
    try {
      const response = await fetch('https://kitsu.io/api/edge/anime?page[limit]=10');
      const result = await response.json();
      this.animeData = result.data;
    } catch (err) {
      console.error('Failed to load anime:', err);
    }
  }

  render() {
    return html`
      <h2>Top Anime</h2>
      <div class="grid">
        ${this.animeData.map(
          anime => html`
            <media-card
              .title="${anime.attributes.canonicalTitle}"
              .description="${anime.attributes.synopsis?.slice(0, 100) + '...'}"
            ></media-card>
          `
        )}
      </div>
    `;
  }
}

customElements.define('anime-list', AnimeList);