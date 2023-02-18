import React from 'react';
import { Img } from 'remotion';
import spotifyImage from './assets/spotify.png';
import HeartSvg from './components/HeartSvg';
import './styles.css';

const Spotify: React.FC = () => {
  return (
    <div className={'h-full w-full bg-[#131212] p-16'}>
      <Img src={spotifyImage} />

      {/* Content */}
      <div className={'mt-6'}>
        {/* Title Playing */}
        <div className={'flex flex-row items-center justify-between'}>
          <div>
            <p className={'font-[Montserrat] text-3xl font-bold text-white'}>
              You Song Title Here
            </p>
            <p
              className={
                'mt-1 font-[Montserrat] text-base font-normal text-[#B3B3B3]'
              }
            >
              Lucas Requena, Ibai LIanos, ortoPilot
            </p>
          </div>
          <HeartSvg />
        </div>

        {/* Player Timeline */}
        <div className={'mt-2 w-full'}>
          <input
            type="range"
            min={1}
            max={100}
            value={50}
            className={'slider'}
          />
          <div className={'flex w-full justify-between'}>
            <span
              className={'font-[Montserrat] text-sm font-bold text-[#B3B3B3]'}
            >
              0:06
            </span>
            <span
              className={'font-[Montserrat] text-sm font-bold text-[#B3B3B3]'}
            >
              3:09
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spotify;
