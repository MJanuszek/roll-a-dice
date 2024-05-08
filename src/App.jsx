import { useState } from "react";

import "./App.css";

function App() {
  const [inputQuantity, setDiceQuantity] = useState(0);
  const [diceQuantity, setQuantityToRoll] = useState([]);
  const [dicesRemoved, setRemovedDices] = useState(0);
  // --------
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
    setRemovedDices(0);
  }

  function handleRemoveDice(id) {
    console.log(id);
    const updateDices = diceQuantity.filter((dice) => dice.id !== id);
    setQuantityToRoll(updateDices);
    setRemovedDices((prev) => prev + 1);
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
          <h2>Removed: {dicesRemoved}</h2>
        </div>
      </div>
      <div className="allDices">
        {" "}
        {diceQuantity.map((dice) => {
          return (
            <div
              key={dice.id}
              className="diceRolled"
              onClick={() => handleRemoveDice(dice.id)}
            >
              {dice.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
