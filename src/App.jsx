import { useState, useEffect } from "react";
import "./App.css";
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from "./consts";
import Attributes from "./components/Attributes";
import Classes from "./components/Classes";
import Skills from "./components/Skills";
import { fetchCharacterData, saveCharacterData } from "./services/api";

const initializeAttributes = (data = {}) => {
  const attributes = {};
  for (const attr of ATTRIBUTE_LIST) {
    attributes[attr] = data[attr] ?? 10;
  }
  return attributes;
};

const initializeSkills = (data = {}) => {
  const skills = {};
  for (const skill of SKILL_LIST) {
    skills[skill.name] = data[skill.name] ?? 0;
  }
  return skills;
};

function App() {
  const [attributes, setAttributes] = useState({});
  const [skills, setSkills] = useState({});

  const calculateModifier = (value) => Math.floor((value - 10) / 2);
  const intelligenceModifier = calculateModifier(
    attributes["Intelligence"] || 10
  );
  const totalSkillPoints = 10 + 4 * intelligenceModifier;

  useEffect(() => {
    const loadCharacterData = async () => {
      const data = await fetchCharacterData();
      setAttributes(initializeAttributes(data?.attributes));
      setSkills(initializeSkills(data?.skills));
    };

    loadCharacterData();
    console.log("data loaded");
  }, []);

  const handleSaveCharacter = async () => {
    const characterData = { attributes, skills };
    const success = await saveCharacterData(characterData);
    if (success) {
      alert("Character saved successfully!");
    } else {
      alert("Failed to save character.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Suhyun</h1>
      </header>
      <section className="App-section main">
        <Attributes
          attributes={attributes}
          setAttributes={setAttributes}
          calculateModifier={calculateModifier}
        />
        <Classes attributes={attributes} classList={CLASS_LIST} />
        <Skills
          skills={skills}
          setSkills={setSkills}
          totalSkillPoints={totalSkillPoints}
          attributes={attributes}
          calculateModifier={calculateModifier}
        />
      </section>
      <section className="App-section">
        <button onClick={handleSaveCharacter}>Save Character</button>
      </section>
    </div>
  );
}

export default App;
