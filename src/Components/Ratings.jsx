import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import thankYou from "../assets/thankYou.jpg"; // Correct the import

const Ratings = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleSubmit = () => {
    // You can submit the rating to your backend or perform other actions here
    if (onRatingSubmit) {
      onRatingSubmit(rating);
    }
  };
  //Cancel Button
  const CustonCancelButton = ({ to, children }) => {
    <Link to={to}>
      <button className="back">{children}</button>
    </Link>;
  };
  //Button PropTypes
  CustonCancelButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  //Back to Game Button
  const CustonBacktoGame = ({ to, children }) => {
    <Link to={to}>
      <button className="subrating">{children}</button>
    </Link>;
  };
  CustonBacktoGame.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };
  const handleformSub = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  return isSubmit ? (
    <div className="panel2">
      <div className="flex">
        <img src={thankYou} className="hillThankYou" />
        <p className="ScoreRating">You selected {rating} out of 5</p>
        <h1 className="heading">Thank YOU!!</h1>
        <p className="text">
          We appreciate you taking the time to Play the game!, please do revist
          for feature updates.
        </p>
        <CustonBacktoGame to="/">Play Again?</CustonBacktoGame>
      </div>
    </div>
  ) : (
    <section id="/ratings">
      <form onSubmit={handleformSub} className="panel">
        <div className="rounded">
          {[1].map((value) => (
            <span
              key={value}
              className={`star ${value <= rating ? "selected" : ""} spBut`}
            >
              &#9733;
            </span>
          ))}
        </div>
        <h1 className="heading">How did we do?</h1>
        <p className="text">
          Please let us know how the game plays. All feedback is appreciated to
          help us improve our offering.
        </p>

        <div className="group">
          <p>Your rating:</p>
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              className="ratBut"
              onClick={() => handleRatingClick(value)}
            >
              {value}
            </button>
          ))}
        </div>
        <button
          className="subrating"
          disabled={setRating === undefined}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div>
          <CustonCancelButton to="/">Return To game</CustonCancelButton>
        </div>
      </form>
    </section>
  );
};

Ratings.propTypes = {
  onRatingSubmit: PropTypes.func,
};

export default Ratings;
