import { describe, it, expect, vi } from 'vitest';
import { html, render } from 'lit';
import '../components/media-card.js';

describe('MediaCard', () => {
  it('fires custom event when card is clicked', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    render(
      html`
        <media-card
          title="Test Title"
          description="Test Description"
          image="https://example.com/image.jpg"
        ></media-card>
      `,
      container,
    );

    const card = container.querySelector('media-card');
    await card.updateComplete;

    const shadow = card.shadowRoot;
    const clickable = shadow.querySelector('.card');
    expect(clickable).not.toBeNull();

    const spy = vi.fn();
    card.addEventListener('card-selected', spy);

    clickable.click();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
