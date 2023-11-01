import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import mOle from "../assets/mOle.png";
import mole_hill from "../assets/mole_hill.png";

const Wackmole = () => {
  const [scores, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(60);
  const [mole, setMole] = useState(new Array(9).fill(false));
  const [isGameRunning, setIsGameRunning] = useState(true); // Start the game when the component mounts

  //Hide MOLE function
  const hideMole = (index) => {
    setMole((curMole) => {
      const newMoles = [...curMole];
      newMoles[index] = false;
      return newMoles;
    });
  };

  //Mole wack Keep score function
  const wackAmole = (indx) => {
    if (!mole[indx]) return;
    hideMole(indx);
    setScore(scores + 1);
  };

  //Show MOLE function
  const moleHead = (INDEX) => {
    setMole((cur) => {
      const newMoles = [...cur];
      newMoles[INDEX] = true;
      return newMoles;
    });
  };

  //Effect to handle mole randomization!
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

  //Keep time Effect hook
  useEffect(() => {
    const gameTimerInterval = setInterval(() => {
      if (gameTime > 0) {
        setGameTime(gameTime - 1);
      }
    }, 1000);
    return () => {
      clearInterval(gameTimerInterval);
    };
  }, [gameTime]);

  //Restart game timer
  const handleRestart = () => {
    setScore(0);
    setGameTime(60);
    setTimeout(() => {
      setMole(new Array(9).fill(false)), 200;
    });
    setIsGameRunning(true);
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
    <div id="/" className="Outer">
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
          <button onClick={handleRestart}>Restart</button>
        </div>
      ) : null}
    </div>
  );
};

Wackmole.propTypes = {
  onRatingSubmit: PropTypes.func,
};

export default Wackmole;
