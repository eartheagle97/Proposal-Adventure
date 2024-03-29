import { useEffect, useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import Accept from "./images/accepted.gif";
import Confused from "./images/confused.gif";
import Propose from "./images/proposal.gif";

function App() {
  const [active, setActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: "50%", y: "70%" });
  const [confirmed, setConfirmed] = useState(false);

  const handleYes = () => {
    if (active) {
      setConfirmed(true);
    } else {
      setActive(true);
    }
  };

  useEffect(() => {
    if (active) {
      setPosition({ x: "50%", y: "70%" });
    }
  }, [active]);

  if (confirmed) {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  const handleReset = () => {
    window.location.reload(true);
  };

  const handleMouseMove = (e) => {
    const newX = Math.random() * 90;
    const newY = Math.random() * 90;
    setPosition({ x: `${newX}%`, y: `${newY}%` });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {active
            ? confirmed
              ? "Woo-hoo, Finally!!!!!"
              : "Wait, Are you sure?"
            : "Hey there, wanna go out on a date?"}
        </h1>
        <img
          src={active ? (confirmed ? Accept : Confused) : Propose}
          className="App-logo"
          alt="Plzzzz"
        />
        <div style={{ marginTop: "25px" }}>
          {confirmed ? (
            <button
              className="btn"
              style={{ width: "300px", left: 0 }}
              onClick={handleReset}
            >
              Let's Start Again
            </button>
          ) : (
            <>
              <button className="btn" onClick={handleYes}>
                Yes
              </button>
              <button
                className={isHovered ? "buttonMoved btn" : "buttonStatic btn"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                style={{ left: position.x, top: position.y }}
                onClick={() =>
                  alert("Well, well, well... someone's trying to escape!")
                }
              >
                No
              </button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
