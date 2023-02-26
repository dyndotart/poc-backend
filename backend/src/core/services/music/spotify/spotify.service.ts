import { spotifyApi } from './api.service';

export const spotifyService = (() => {
  async function searchTrackByName(
    trackKeyword: string,
    artistKeyword?: string
  ) {
    const query = `track:${trackKeyword}${
      artistKeyword != null ? ` artist:${artistKeyword}` : ''
    }`;
    return spotifyApi.getSearch(query);
  }

  return { searchTrackByName };
})();
