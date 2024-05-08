import { useState } from "react";

import "./App.css";

function App() {
  const [inputQuantity, setDiceQuantity] = useState(0);
  const [diceQuantity, setQuantityToRoll] = useState([]);
  const [dicesRolled, setDicesRolled] = useState(0);
  const [dicesRemoved, setRemovedDices] = useState(0);
  const [displayRemoved, setDisplayRemoved] = useState([]);
  const [addedDices, setAddedDices] = useState(0);
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
      added: "not",
    }));
    setQuantityToRoll(dicesArray);
    setDicesRolled(dicesArray.length);
    setDiceQuantity(0);
    setRemovedDices(0);
    setDisplayRemoved([]);
    setAddedDices(0);
  }

  function handleAddDice() {
    setAddedDices((prev) => prev + 1);
    let newDice = {
      id: diceQuantity.length + getRandomNumber() * 11,
      value: getRandomNumber(),
      added: "added",
    };
    setQuantityToRoll((prevDices) => [...prevDices, newDice]);
  }

  function handleRemoveDice(id) {
    const updateDices = diceQuantity.filter((dice) => dice.id !== id);
    setQuantityToRoll(updateDices);
    setRemovedDices((prev) => prev + 1);
    const removedToDisplay = diceQuantity.find((dice) => dice.id === id);

    // setDisplayRemoved([...displayRemoved, removedToDisplay]);
    setDisplayRemoved((prevDices) => [...prevDices, removedToDisplay]);
  }

  function handleDelete(btnId) {
    const btnIdNumber = parseInt(btnId, 10);

    const removedDicesToDisplay = diceQuantity.filter(
      (dice) => dice.value === btnIdNumber
    );
    const removedNumers = diceQuantity.filter(
      (dice) => dice.value !== btnIdNumber
    );

    setQuantityToRoll(removedNumers);

    setDisplayRemoved((prevDices) => [...prevDices, ...removedDicesToDisplay]);
  }

  return (
    <div className="container">
      <div className="dices">
        <div className="params">
          <label className="label" htmlFor="">
            Number of dices:
          </label>
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
          <p className="roll">Roll/Reset</p>
          <h2>Dices rolled: {dicesRolled}</h2>
          <h2>Removed: {dicesRemoved}</h2>
          <h2>Dices added: {addedDices}</h2>
        </div>
      </div>
      {/* --------PARAMS^ */}
      <div className="allDices">
        <p className="info">In game:</p>
        {diceQuantity.map((dice) => {
          return (
            <div
              key={dice.id}
              className={`diceRolled ${dice.added}`}
              onClick={() => handleRemoveDice(dice.id)}
            >
              {dice.value}
            </div>
          );
        })}
      </div>
      <div className="buttons">
        <button className="btn addDice" id="add" onClick={handleAddDice}>
          Add dice
        </button>
        <button
          className="btn"
          id="1"
          onClick={(event) => handleDelete(event.target.id)}
        >
          Delete 1
        </button>
        <button
          className="btn"
          id="2"
          onClick={(event) => handleDelete(event.target.id)}
        >
          Delete 2
        </button>
        <button
          className="btn"
          id="3"
          onClick={(event) => handleDelete(event.target.id)}
        >
          Delete 3
        </button>
      </div>

      {/* REMOVED */}
      <div className="removedDices">
        <p className="info">Removed:</p>
        {displayRemoved.map((dice) => {
          return (
            <div key={dice.id} className="diceRemoved">
              {dice.value}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
