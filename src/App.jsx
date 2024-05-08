import { useState } from "react";

import "./App.css";

function App() {
  const [inputQuantity, setDiceQuantity] = useState(0);
  const [diceQuantity, setQuantityToRoll] = useState([]);
  function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function handleInputChange(event) {
    const numberOfDices = event.target.value;
    setDiceQuantity(numberOfDices);
  }

  function handleRollDices() {
    const dicesArray = Array.from({ length: inputQuantity }, (v, i) => ({
      id: i + 1,
      value: getRandomNumber(),
    }));
    setQuantityToRoll(dicesArray);
    setDiceQuantity(0);
  }

  return (
    <div className="container">
      <h1>Roll a dice</h1>
      <div className="dices">
        <div className="params">
          <label htmlFor="">Number of dices:</label>
          <input
            className="quantity"
            type="number"
            id="diceQuantity"
            value={inputQuantity}
            onChange={handleInputChange}
          />
          <img
            className="dice"
            src="src/assets/11121422_fi_rr_dice_d6_icon.png"
            alt="dice"
            onClick={handleRollDices}
          />
          <h2>Dices rolled: {inputQuantity}</h2>
          <h2>Removed: 0</h2>
          <div className="allDices">
            {" "}
            {diceQuantity.map((dice) => {
              return (
                <div key={dice.id} className="diceRolled">
                  {dice.value}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
