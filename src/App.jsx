import { useState } from "react";

import "./App.css";

function App() {
  const [inputQuantity, setDiceQuantity] = useState(0);
  const [diceQuantity, setQuantityToRoll] = useState([]);
  const [dicesRolled, setDicesRolled] = useState(0);
  const [dicesRemoved, setRemovedDices] = useState(0);
  const [displayRemoved, setDisplayRemoved] = useState([]);
  const [addedDices, setAddedDices] = useState(0);
  const [all6, setAll6] = useState(0);
  const [all5, setAll5] = useState(0);
  const [all4, setAll4] = useState(0);
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
    setAll6(0);
    setAll5(0);
    setAll4(0);
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
    setRemovedDices((prev) => prev + removedDicesToDisplay.length);
    setQuantityToRoll(removedNumers);

    setDisplayRemoved((prevDices) => [...prevDices, ...removedDicesToDisplay]);
  }

  function handleCountDices() {
    console.log("ok", diceQuantity.value);
    const all6 = diceQuantity.filter((dice) => dice.value === 6);
    setAll6(all6.length);
    const all5 = diceQuantity.filter((dice) => dice.value === 5);
    setAll5(all5.length);
    const all4 = diceQuantity.filter((dice) => dice.value === 4);
    setAll4(all4.length);
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
          <div className="statistics">
            <h3 className="dices-count">Nb of 6:</h3>
            <div className="count">{all6}</div>
            <h3 className="dices-count">Nb of 5:</h3>
            <div className="count">{all5}</div>
            <h3 className="dices-count">Nb of 4:</h3>
            <div className="count">{all4}</div>
          </div>
        </div>
      </div>
      {/* --------PARAMS^ */}

      <div className="allDices">
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
          <button className="btn count-btn" onClick={handleCountDices}>
            Count
          </button>
        </div>
        <p className="info">In game:</p>
        <div className="inGame">
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
      </div>

      <div className="removed">
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
      <div className="footer">
        <div className="footer-info">Copyright Monika Januszek</div>
        <a className="footer-info" href="https://github.com/MJanuszek">
          https://github.com/MJanuszek
        </a>
      </div>
    </div>
  );
}

export default App;
