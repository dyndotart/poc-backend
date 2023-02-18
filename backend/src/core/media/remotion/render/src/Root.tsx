import { Still } from 'remotion';
import Map from './stills/Map';
import Spotify from './stills/Spotify';
import './style.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still id="Map" component={Map} width={1200} height={627} />
      <Still
        id="spotify-track-player"
        component={Spotify}
        width={599}
        height={847}
        defaultProps={{
          title: 'Your Song Title Here',
          subtitle: 'Lucas Requena, Ibai LIanos, ortoPilot',
          time: {
            total: 180,
            current: 34,
          },
          spotifyCode: true,
          trackId: '5PNzt1Rvt7PUVaGhbq0OVt',
        }}
      />
    </>
  );
};
