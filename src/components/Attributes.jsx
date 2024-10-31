function Attributes({ attributes, setAttributes, calculateModifier }) {
  const maxAttributePoints = 70;
  const totalAttributePoints = Object.values(attributes).reduce(
    (sum, value) => sum + value,
    0
  );

  const incrementAttribute = (attr) => {
    if (totalAttributePoints < maxAttributePoints) {
      setAttributes((prevAttributes) => ({
        ...prevAttributes,
        [attr]: prevAttributes[attr] + 1,
      }));
    } else {
      alert("A Character can have up to 70 Delegated Attribute Points.");
    }
  };

  const decrementAttribute = (attr) => {
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attr]: Math.max(prevAttributes[attr] - 1, 0),
    }));
  };

  return (
    <div className="attributes">
      <h2>Attributes</h2>
      {Object.keys(attributes).map((attr) => (
        <div key={attr} className="attribute">
          <span>
            {attr}: {attributes[attr]} (Modifier:{" "}
            {calculateModifier(attributes[attr])})
          </span>
          <button onClick={() => incrementAttribute(attr)}>+</button>
          <button onClick={() => decrementAttribute(attr)}>-</button>
        </div>
      ))}
    </div>
  );
}

export default Attributes;
