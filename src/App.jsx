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
  const [all3, setAll3] = useState(0);
  const [all2, setAll2] = useState(0);
  const [all1, setAll1] = useState(0);
  // --------
  function getRandomNumber() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function handleInputChange(event) {
    const numberOfDices = event.target.value;
    setDiceQuantity(numberOfDices);
  }

  function handleRollDices() {
    // clean--------
    setDiceQuantity(0);
    setRemovedDices(0);
    setDisplayRemoved([]);
    setAddedDices(0);
    setAll6(0);
    setAll5(0);
    setAll4(0);
    setAll3(0);
    setAll2(0);
    setAll1(0);
    // -----------
    const dicesArray = Array.from({ length: inputQuantity }, (v, i) => ({
      id: i + 1,
      value: getRandomNumber(),
      added: "not",
    }));
    setQuantityToRoll(dicesArray);
    setDicesRolled(dicesArray.length);
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
    const all3 = diceQuantity.filter((dice) => dice.value === 3);
    setAll3(all3.length);
    const all2 = diceQuantity.filter((dice) => dice.value === 2);
    setAll2(all2.length);
    const all1 = diceQuantity.filter((dice) => dice.value === 1);
    setAll1(all1.length);
  }

  function getRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  function handeRerollDices() {
    let color = getRandomColor();
    let newResult = diceQuantity.map((dice, index) => {
      return {
        id: index + 1,
        value: getRandomNumber(),
        color: color,
      };
    });
    setQuantityToRoll(newResult);
  }

  return (
    <div className="container">
      <div className="dices">
        <div className="params">
          <label className="label" htmlFor="">
            Select number of dices:
          </label>
          <input
            className="quantity"
            type="number"
            id="diceQuantity"
            value={inputQuantity}
            onChange={handleInputChange}
          />
          <p className="roll" onClick={handleRollDices}>
            Roll/Reset
          </p>
          <h2 className="dicesCountStats">Dices rolled: {dicesRolled}</h2>
          <h2 className="dicesCountStats">Removed: {dicesRemoved}</h2>
          <h2 className="dicesCountStats">Dices added: {addedDices}</h2>
          <div className="statistics">
            <h3 className="dices-count">Nb of 6:</h3>
            <div className="count">{all6}</div>
            <h3 className="dices-count">Nb of 5:</h3>
            <div className="count">{all5}</div>
            <h3 className="dices-count">Nb of 4:</h3>
            <div className="count">{all4}</div>
            <h3 className="dices-count">Nb of 3:</h3>
            <div className="count">{all3}</div>
            <h3 className="dices-count">Nb of 2:</h3>
            <div className="count">{all2}</div>
            <h3 className="dices-count">Nb of 1:</h3>
            <div className="count">{all1}</div>
          </div>
        </div>
      </div>
      {/* --------PARAMS^ */}

      <div className="allDices">
        <div className="buttons">
          <button
            className="btn addDice btn-add"
            id="add"
            onClick={handleAddDice}
          >
            Add
          </button>
          <button
            className="btn"
            id="1"
            onClick={(event) => handleDelete(event.target.id)}
          >
            Del 1
          </button>
          <button
            className="btn"
            id="2"
            onClick={(event) => handleDelete(event.target.id)}
          >
            Del 2
          </button>
          <button
            className="btn"
            id="3"
            onClick={(event) => handleDelete(event.target.id)}
          >
            Del 3
          </button>
          <button
            className="btn"
            id="4"
            onClick={(event) => handleDelete(event.target.id)}
          >
            Del 4
          </button>
          <button
            className="btn"
            id="5"
            onClick={(event) => handleDelete(event.target.id)}
          >
            Del 5
          </button>
          <button
            className="btn"
            id="6"
            onClick={(event) => handleDelete(event.target.id)}
          >
            Del 6
          </button>
          <button className="btn count-btn" onClick={handleCountDices}>
            Count
          </button>
          <button className="btn btn-reroll" onClick={handeRerollDices}>
            Reroll
          </button>
        </div>
        <p className="info">In game:</p>
        <div className="inGame">
          {diceQuantity.map((dice) => {
            return (
              <div
                key={dice.id}
                className={`diceRolled ${dice.added} `}
                style={{ border: `4px solid ${dice.color}`, color: "black" }}
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
