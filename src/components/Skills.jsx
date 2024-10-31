import { useState } from "react";
import { SKILL_LIST } from "../consts";

function Skills({
  skills,
  setSkills,
  totalSkillPoints,
  attributes,
  calculateModifier,
}) {
  const [usedSkillPoints, setUsedSkillPoints] = useState(0);

  const incrementSkill = (skill) => {
    if (usedSkillPoints < totalSkillPoints) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] + 1,
      }));
      setUsedSkillPoints(usedSkillPoints + 1);
    } else {
      alert("You need more skill points! Upgrade intelligence to get more");
    }
  };

  const decrementSkill = (skill) => {
    if (skills[skill] > 0) {
      setSkills((prevSkills) => ({
        ...prevSkills,
        [skill]: prevSkills[skill] - 1,
      }));
      setUsedSkillPoints(usedSkillPoints - 1);
    }
  };

  return (
    <div className="skills">
      <h2>Skills</h2>
      <div>
        Total skill points available: {totalSkillPoints - usedSkillPoints}
      </div>
      {SKILL_LIST.map((skillObj) => {
        const skill = skillObj.name;
        const relatedAttribute = skillObj.attributeModifier;
        const modifier = calculateModifier(attributes[relatedAttribute] || 0);
        const total = skills[skill] + modifier;

        return (
          <div key={skill} className="skill">
            <span>
              {skill}: {skills[skill]} (Modifier: {modifier}) Total: {total}
            </span>
            <button onClick={() => incrementSkill(skill)}>+</button>
            <button onClick={() => decrementSkill(skill)}>-</button>
          </div>
        );
      })}
    </div>
  );
}

export default Skills;
