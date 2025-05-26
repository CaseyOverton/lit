import { describe, it, expect } from 'vitest';
import '../components/modal.js';

describe('my-modal component', () => {
  it('renders title and description', async () => {
    const modal = document.createElement('my-modal');
    modal.title = 'Test Title';
    modal.description = 'Test description';

    document.body.appendChild(modal);

    await modal.updateComplete;

    const shadow = modal.shadowRoot;
    const h3 = shadow.querySelector('h3');
    const p = shadow.querySelector('p');

    expect(h3.textContent).toBe('Test Title');
    expect(p.textContent).toBe('Test description');

    document.body.removeChild(modal);
  });
});
