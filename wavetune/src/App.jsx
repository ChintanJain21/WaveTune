import React, { useState, useRef } from 'react';
import './App.css';

// Import icons from react-icons
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from 'react-icons/fa';
const vidArray = ['./Assets/Videos/video1.mp4','./Assets/Videos/video2.mp4','./Assets/Videos/video3.mp4','./Assets/Videos/video4.mp4','./Assets/Videos/video5.mp4',];

const musicAPI = [
  {
    songName: 'Soch (Slowed+Reverbed)',
    songArtist: 'Hardy Sandhu',
    songSrc: './Assets/songs/SOCH(Slowed+Reverbed) __ Hardy Sandhu.webm',
    songAvatar: './Assets/Images/image6.jpg'
  },
  {
    songName: 'Catch Me If I Fall',
    songArtist: 'TEGNENT',
    songSrc: './Assets/songs/Catch Me If I Fall - NEFFEX.mp3',
    songAvatar: './Assets/Images/image2.jpg'
  },
  {
    songName: 'Inspired (Clean)',
    songArtist: 'NEFFEX',
    songSrc: './Assets/songs/Inspired (Clean) - NEFFEX.mp3',
    songAvatar: './Assets/Images/image3.jpg'
  },
  {
    songName: 'Apna Bana Le Piya  ',
    songArtist: 'Arijit Singh',
    songSrc: './Assets/songs/Apna Bana Le.mp3',
    songAvatar: './Assets/Images/image7.jpg'
  },
  {
    songName: 'Chasing',
    songArtist: 'NEFFEX',
    songSrc: './Assets/songs/Chasing - NEFFEX.mp3',
    songAvatar: './Assets/Images/image1.jpg'
  },
];



function App() {
  const [currentMusicDetails, setCurrentMusicDetails] = useState(musicAPI[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [totalTime, setTotalTime] = useState('00:00');
  const [musicIndex, setMusicIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0)

  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    const nextIndex = (musicIndex + 1) % musicAPI.length;
    setMusicIndex(nextIndex);
    updateCurrentSong(nextIndex);
  };

  const prevSong = () => {
    const prevIndex = (musicIndex - 1 + musicAPI.length) % musicAPI.length;
    setMusicIndex(prevIndex);
    updateCurrentSong(prevIndex);
  };

  const updateCurrentSong = (index) => {
    const song = musicAPI[index];
    setCurrentMusicDetails(song);
    setProgress(0);
    setCurrentTime('00:00');
    setTotalTime('00:00');
    setIsPlaying(true);

    const audio = audioRef.current;
    audio.src = song.songSrc;
    audio.load();
    audio.addEventListener('loadeddata', () => {
      audio.play();
    });
  };

  const handleProgressChange = (e) => {
    const manualChange = Number(e.target.value);
    setProgress(manualChange);
    audioRef.current.currentTime = (manualChange / 100) * audioRef.current.duration;
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio.duration) return;

    const progressPercent = (audio.currentTime / audio.duration) * 100;
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime % 60);
    const formattedCurrentTime = `${currentMinutes < 10 ? '0' : ''}${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    setCurrentTime(formattedCurrentTime);

    const totalMinutes = Math.floor(audio.duration / 60);
    const totalSeconds = Math.floor(audio.duration % 60);
    const formattedTotalTime = `${totalMinutes < 10 ? '0' : ''}${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
    setTotalTime(formattedTotalTime);

    setProgress(progressPercent);
  };
  const handleChangeBackground = ()=>{
    if (videoIndex >= vidArray.length - 1) {
      setVideoIndex(0);
    }else{
      setVideoIndex(videoIndex + 1)
    }
  }

  return (
    
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentMusicDetails.songSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextSong}
      />
<video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
      <div className="music-info">
        <img src={currentMusicDetails.songAvatar} alt="Song Avatar" />
        <h2>{currentMusicDetails.songName}</h2>
        <p>{currentMusicDetails.songArtist}</p>
      </div>

      <div className="progress-container">
        <span>{currentTime}</span>
        <input
          type="range"
          min="0"
          max="100"
          value={isNaN(progress) ? 0 : progress}
          onChange={handleProgressChange}
        />
        <span>{totalTime}</span>
      </div>

      <div className="controls">
        <button onClick={prevSong}>
          <FaStepBackward />
        </button>
        <button onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={nextSong}>
          <FaStepForward />
        </button>
      </div>
      <div className="changeBackBtn" onClick={handleChangeBackground}>
        Change Background
      </div>
    </div>
  );
}

export default App;