import { useState } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <h1>Choose your dice</h1>
      <div className="dices">
        <img
          className="dice"
          src="src/assets/11121422_fi_rr_dice_d6_icon.png"
          alt=""
        />
        <img
          className="dice"
          src="src/assets/11121534_fi_rr_dice_d10_icon.png"
          alt=""
        />
        <img
          className="dice"
          src="src/assets/8665279_dice_d20_icon.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default App;
