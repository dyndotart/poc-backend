export type TGetMapByBBoxResponseDto = {
  attribution: string;
  bounds: {
    maxlat: number;
    maxlon: number;
    minlat: number;
    minlon: number;
  };
  copyright: string;
  elements: TMapNode[];
  generator: string;
  license: string;
  version: string;
};

export type TMapNode = {
  changeset: number;
  id: number;
  lat: number;
  lon: number;
  timestamp: string;
  type: 'node';
  uid: number;
  user: string;
  version: number;
};
