import { Still } from 'remotion';
import geojson from './resources/sampleGeoJson.json';
import CityMapV1 from './stills/city-map-v1';
import SpotifyPlayerV1 from './stills/spotify-player-v1';
import './style.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="city-map-v1"
        component={CityMapV1}
        width={1200}
        height={627}
        defaultProps={{
          geojson: geojson as any,
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
