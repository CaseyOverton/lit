import { LitElement, html, css } from 'lit';

export class MyApi extends LitElement {
    static properties = {
      data: { type: Object }
    };
  
    constructor() {
      super();
      this.data = {};
    }
  
    // fetch user data from API using native fetch
    async getProfile() {
      try {
        const response = await fetch('https://kitsu.io/api/edge/anime?page[limit]=10');
        const result = await response.json();
        this.data = result;
        this.requestUpdate();
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    }
  
    connectedCallback() {
      super.connectedCallback();
      this.getProfile();
    }
  
    render() {
      return html`
        <div>
          <h2>Anime List</h2>
          <ul>
            ${Array.isArray(this.data.data)
              ? this.data.data.map(
                  item => html`<li>${item.attributes.canonicalTitle}</li>`
                )
              : html`<li>Loading…</li>`}
          </ul>
        </div>
      `;
    }
  
    static styles = css`
      :host {
        display: block;
        font-family: Arial, sans-serif;
      }
  
      h2 {
        color: #333;
      }
    `;
  }
  
customElements.define('my-api', MyApi);