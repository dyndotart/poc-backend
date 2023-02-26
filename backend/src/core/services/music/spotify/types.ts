export type TSpotifyAuthResponseDto = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type TArtistDto = {
  href: string;
  id: string;
  name: string;
  type: 'artist';
  uri: string;
};

export type TTrackDto = {
  album: {
    album_type: string;
  };
  artists: TArtistDto[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
};

export type TSpotifySearchResponseDto = {
  tracks: {
    href: string;
    items: TTrackDto[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
};
