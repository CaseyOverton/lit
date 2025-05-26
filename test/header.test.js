import { html, render } from 'lit';
import { describe, it, expect } from 'vitest';
import '../components/header.js';

describe('<my-header>', () => {
  let container = HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('renders default header text', async () => {
    render(html`<my-header></my-header>`, container);
    const el = container.querySelector('my-header');
    await el.updateComplete;

    const shadow = el.shadowRoot;
    const h1 = shadow.querySelector('h1.header');
    expect(h1).not.toBeNull();
    expect(h1.textContent).toBe('Fanime');
  });

  it('renders custom header text when set', async () => {
    render(html`<my-header .header=${'Custom Title'}></my-header>`, container);
    const el = container.querySelector('my-header');
    await el.updateComplete;

    const shadow = el.shadowRoot;
    const h1 = shadow.querySelector('h1.header');
    expect(h1.textContent).toBe('Custom Title');
  });
});
