import '../components/anime-list.js';
import '../components/media-card.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent } from '@testing-library/dom';

const mockAnimeData = {
  data: Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    attributes: {
      canonicalTitle: `Anime ${i + 1}`,
      posterImage: { small: `https://placekitten.com/200/30${i}` },
      synopsis: `Synopsis ${i + 1}`,
    },
  })),
};

describe('anime-list component', () => {
  let animeList;

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockAnimeData),
      }),
    );

    animeList = document.createElement('anime-list');
    document.body.appendChild(animeList);
  });

  it('fetches anime and renders media cards', async () => {
    await new Promise((r) => setTimeout(r, 0));
    await animeList.updateComplete;

    const cards = animeList.shadowRoot.querySelectorAll('media-card');
    expect(cards.length).toBe(mockAnimeData.data.length);

    const first = cards[0];
    expect(first.title).toBe(mockAnimeData.data[0].attributes.canonicalTitle);
  });

  it('opens modal with correct data when a media card is clicked', async () => {
    await new Promise((r) => setTimeout(r, 0));
    await animeList.updateComplete;

    const firstCard = animeList.shadowRoot.querySelector('media-card');
    expect(firstCard).toBeDefined();

    animeList._handleCardSelected({
      detail: {
        title: 'Test Title',
        image: 'https://example.com/image.jpg',
        description: 'Test description',
      },
    });

    await animeList.updateComplete;

    const modal = animeList.shadowRoot.querySelector('my-modal');
    expect(modal).toBeDefined();
    expect(modal.title).toBe('Test Title');
    expect(modal.description).toBe('Test description');
  });

  it('pagination buttons call fetchAnime with updated page', async () => {
    await new Promise((r) => setTimeout(r, 0));
    await animeList.updateComplete;

    const nextButton = animeList.shadowRoot.querySelector('button.next');
    expect(nextButton.disabled).toBe(false);

    nextButton.click();

    await new Promise((r) => setTimeout(r, 0));
    expect(animeList.currentPage).toBe(2);
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('page[offset]=10'));

    const prevButton = animeList.shadowRoot.querySelector('button.prev');
    prevButton.click();
    await new Promise((r) => setTimeout(r, 0));
    expect(animeList.currentPage).toBe(1);
  });
});
