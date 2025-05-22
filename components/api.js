import {Task} from '@lit/task';

class MyApi extends LitElement {

    _getDataTask = new Task(
      this,
      {
        task: async () => {
          const response = await fetch(`https://kitsu.io/api/edge/anime`);
          return response.json();
        },
        args: () => []
      }
    );
  
    render() {
      return html`
        <button @click=${this._onClick}>Get Data</button>
        <p>Get Data</p>
      `;
    }
  
    _onClick() {
      this._getDataTask.run();
    }
  }
customElements.define('my-api', MyApi);