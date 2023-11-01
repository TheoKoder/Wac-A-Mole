import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Wackmole from "../Components/wackmole";


const Home = () => {
    const [countdown, setCountdown] = useState(5);

    // Quit button onLoad handler
    const showHiddenButton = () => {
      const e = document.getElementById("button-S");
      if (e) return (e.style.display = 'block'); // Once game has LOADED change Initial Class of HIDDEN to Visible
    }
  
    // 5s countdown before game EFFECT
    useEffect(() => {
      const countdownInterval = setInterval(() => {
        if (countdown > 0) {
          setCountdown(countdown - 1);
        } else {
          clearInterval(countdownInterval);
          showHiddenButton(); // Show the hidden button after the countdown.
        }
      }, 1000);
  
      return () => {
        clearInterval(countdownInterval);
      };
    }, [countdown]);
    
    
    // Quit button handler func
    const CustomButton = ({to, children}) => {
    return(     
    <Link to={to} > 
    <button id="button-S" className="quitButton" >
      {children}
    </button>
    </Link>)
    };

    CustomButton.propTypes={
        to: PropTypes.string.isRequired,
        children:PropTypes.node.isRequired
    }
  
  return (
    <div>
    {countdown > 0 ? (
      <div className="countdown-container">
        <p>READY? {countdown}</p>
      </div>
    ) : (
      <Wackmole />
    )}
    <CustomButton to="/ratings">Quit</CustomButton>
  </div>
  )
}

export default Home
