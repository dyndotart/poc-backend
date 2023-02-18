import { Still } from 'remotion';
import Map from './stills/Map';
import PreviewCard from './stills/PreviewCard';
import Spotify from './stills/Spotify';
import './style.css';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="PreviewCard"
        component={PreviewCard}
        width={1200}
        height={627}
        defaultProps={{
          title: 'Welcome to Remotion2',
          description: 'Edit Video.tsx to change template',
          slogan: 'Make videos\nprogrammatically',
        }}
      />
      <Still id="Map" component={Map} width={1200} height={627} />
      <Still
        id="Spotify"
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
        }}
      />
    </>
  );
};
