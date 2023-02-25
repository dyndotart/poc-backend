import { Still } from 'remotion';
import osmBrightStyle from './resources/osm-bright-style.json';
import berlinTiles from './resources/tiles-long-1224183-lat37775.json';
import CityMapV1 from './stills/city-map-v1';
import SpotifyPlayerV1 from './stills/spotify-player-v1';
import './style.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="city-map-v1"
        component={CityMapV1 as any}
        width={600}
        height={600}
        defaultProps={{
          tiles: berlinTiles as any,
          style: osmBrightStyle as any,
          projectionProps: {
            center: [-122.4183, 37.775],
            scale: Math.pow(2, 21) / (2 * Math.PI),
            translate: [600 / 2, 600 / 2],
            precision: 0,
          },
        }}
      />
      <Still
        id="spotify-player-v1"
        component={SpotifyPlayerV1}
        width={599}
        height={847}
        defaultProps={{
          title: 'Your Song Title Here',
          subtitle: 'This is a subtitle',
          time: {
            total: 180,
            current: 34,
          },
          spotifyCode: true,
          trackId: '5PNzt1Rvt7PUVaGhbq0OVt',
          imageUrl:
            'https://cdn.pixabay.com/photo/2017/07/31/21/04/people-2561053_960_720.jpg',
        }}
      />
    </>
  );
};
