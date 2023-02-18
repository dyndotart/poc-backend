import { Still } from 'remotion';
import PreviewCard from './stills/PreviewCard';
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
    </>
  );
};
