import { useEffect, useState } from 'react';
import './App.css';
import Wackmole from './Components/wackmole';

function App() {
  const [countdown, setCountdown] = useState(5);
  const [gameTime, setGameTime] = useState(30);//30 seconds

//5s countdown before game EFFECT
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  //Timer
  useEffect(() => {
    if (countdown === 0) {
      const gameInterval = setInterval(() => {
        if (gameTime > 0) {
          setGameTime(gameTime - 1);
        } else {
          clearInterval(gameInterval);
          // Handle game over logic here
        }
      }, 1000);

      return () => {
        clearInterval(gameInterval);
      };
    }
  }, [countdown, gameTime]);

  return (
    <div className="app">
      {countdown > 0 ? (
        <div className="countdown-container">
          <p>READY? {countdown}</p>
        </div>
      ) : null}
      {countdown === 0 ? (
        <div>
          <Wackmole />
          <div className="box">
            {/* Display your mole grid here */}
          </div>
          {gameTime > 0 ? (
            <p>Time Left: {Math.floor(gameTime / 60)}:{gameTime % 60}</p>
          ) : gameTime === 0 && (
        <div className="thank-you-message">
          <p>THANK YOU FOR PLAYING</p>
        </div>
      )}
        </div>
      ) : null}
    </div>
  );
}

export default App;
