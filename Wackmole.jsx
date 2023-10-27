import { useEffect, useState } from "react";
import mOle from "../assets/mOle.png";
import mole_hill from "../assets/mole_hill.png";

const Wackmole = () => {
  const [scores, setScore] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const [gameTime, setGameTime] = useState(.5 * 60);
  const [mole, setMole] = useState(new Array(9).fill(false));
  const [isGameRunning, setIsGameRunning] = useState(false);

  const hideMole = (index) => {
    setMole((curMole) => {
      const newMoles = [...curMole];
      newMoles[index] = false;
      return newMoles;
    });
  };

  const wackAmole = (indx) => {
    if (!mole[indx]) return;
    hideMole(indx);
    setScore(scores + 1);
  };

  const moleHead = (INDEX) => {
    setMole((cur) => {
      const newMoles = [...cur];
      newMoles[INDEX] = true;
      return newMoles;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * mole.length);
      moleHead(random);
      setTimeout(() => {
        hideMole(random);
      }, 500);
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [mole]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(countdownInterval);
        setIsGameRunning(true);
        const gameTimerInterval = setInterval(() => {
          if (gameTime > 0) {
            setGameTime(gameTime - 1);
          }
        }, 1000);
        return () => {
          clearInterval(gameTimerInterval);
        };
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown, gameTime]);

  const handleRestart = () => {
    setScore(0);
    setCountdown(5);
    setGameTime(.5 * 60);
    setMole(new Array(9).fill(false));
    setIsGameRunning(false);
  };

  const getGameResult = (score) => {
    if (score < 15) {
      return "EPIC fail";
    } else if (score < 30) {
      return "THE Force is STRONG with THIS ONE";
    } else {
      return "GRAND MASTER!!!";
    }
  };

  return (
    <div className="Outer">
      <h1 className="score">Score: {scores}</h1>
      <div className="box">
        {mole.map((isMole, indx) => (
          <img
            key={indx}
            src={isMole ? mOle : mole_hill}
            alt="hill"
            className="hill"
            onClick={() => {
              wackAmole(indx);
            }}
          />
        ))}
      </div>
      {isGameRunning ? (
        <div className="timer">
          <p>
            Time Left: {Math.floor(gameTime / 60)}:{gameTime % 60}
          </p>
        </div>
      ) : null}
      {gameTime === 0 ? (
        <div className="result-message">
          <p>{getGameResult(scores)}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Wackmole;
