import { useState } from "react";
import abyssalChasmKeyImage from "./assets/abyssal-chasm-key.png";
import adamantKeyimage from "./assets/adamant-key.png";
import ancientRuinsKeyImage from "./assets/ancient-key.png";
import dailyDungeonKeyImage from "./assets/daily-dungeon-key.png";
import devastatedForestKeyImage from "./assets/devastated-forest-key.png";
import diamondsImage from "./assets/diamonds.png";
import dragonKeyImage from "./assets/dragon-key.png";
import goblinKeyImage from "./assets/goblin-key.png";
import pathOfDeathKeyImage from "./assets/path-of-death-key.png";
import "./legend-chief-calculator.css";

type InputData = {
  goblin: number;
  adamant: number;
  dragon: number;
  ancient: number;
  dailyDungeon: number;
  forest: number;
  abyss: number;
  path: number;
  diamonds: number;
};

export default function LegendChiefCalculator() {
  const [inputs, setInputs] = useState<InputData>({
    goblin: 0,
    adamant: 0,
    dragon: 0,
    ancient: 0,
    dailyDungeon: 0,
    forest: 0,
    abyss: 0,
    path: 0,
    diamonds: 0,
  });

  const fields = [
    { label: "Goblin Keys", name: "goblin", points: 1, image: goblinKeyImage },
    {
      label: "Adamant Keys",
      name: "adamant",
      points: 1,
      image: adamantKeyimage,
    },
    { label: "Dragon Keys", name: "dragon", points: 2, image: dragonKeyImage },
    {
      label: "Ancient Ruins",
      name: "ancient",
      points: 3,
      image: ancientRuinsKeyImage,
    },
    {
      label: "Daily Dungeon",
      name: "dailyDungeon",
      points: 3,
      image: dailyDungeonKeyImage,
    },
    {
      label: "Devastated Forest",
      name: "forest",
      points: 4,
      image: devastatedForestKeyImage,
    },
    {
      label: "Abyssal Chasm",
      name: "abyss",
      points: 5,
      image: abyssalChasmKeyImage,
    },
    {
      label: "Path of Death",
      name: "path",
      points: 5,
      image: pathOfDeathKeyImage,
    },
    { label: "Diamonds", name: "diamonds", points: 1, image: diamondsImage }, // special handling (100 = 1pt)
  ] as const;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Allow clearing the input
    if (value === "") {
      setInputs((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // Parse and clamp numeric input
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, 0), 999999999);
      setInputs((prev) => ({ ...prev, [name]: Number(clamped) }));
    }
  };

  const resetInputs = () => {
    setInputs({
      goblin: 0,
      adamant: 0,
      dragon: 0,
      ancient: 0,
      dailyDungeon: 0,
      forest: 0,
      abyss: 0,
      path: 0,
      diamonds: 0,
    });
  };

  const calculatePoints = () =>
    fields.reduce((sum, field) => {
      if (field.name === "diamonds") {
        return sum + Math.floor(inputs.diamonds / 100) * field.points;
      }
      return sum + inputs[field.name] * field.points;
    }, 0);

  return (
    <div className="container">
      <h1 className="container-title">Legend Chief Points Calculator</h1>
      <span className="madeBy">
        ( made by Tudique26 from the KNIGHTSXORDER guild on Trakan US server )
      </span>
      <div className="rows-container">
        {fields.map((field) => {
          const value = inputs[field.name];
          const points =
            field.name === "diamonds"
              ? Math.floor(value / 100) * field.points
              : value * field.points;

          return (
            <div key={field.name} className="row">
              <div className="row-label-container">
                <img
                  src={field.image}
                  alt="key/diamond image"
                  className="key-image"
                />
                <label className="row-label">{field.label}: </label>
              </div>
              <input
                id={field.name}
                name={field.name}
                type="number"
                value={value}
                onChange={handleChange}
                min={0}
                max={999999999}
                className="row-input"
                placeholder="Your value"
              />
              <span className="row-points">= {points} pts</span>
            </div>
          );
        })}

        <button onClick={resetInputs} className="clear-button">
          Reset
        </button>
      </div>

      <div className="total-points">
        <strong>Total Points: {calculatePoints()}</strong>
      </div>
    </div>
  );
}
