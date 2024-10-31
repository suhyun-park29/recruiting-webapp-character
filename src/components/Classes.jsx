function Classes({ attributes, classList }) {
  const isEligible = (requirements) => {
    return Object.keys(requirements).every(
      (attr) => attributes[attr] >= requirements[attr]
    );
  };

  return (
    <div className="classes">
      <h2>Classes</h2>
      {Object.entries(classList).map(([className, requirements]) => (
        <div
          key={className}
          style={{ color: isEligible(requirements) ? "red" : "white" }}
        >
          {className}
        </div>
      ))}
    </div>
  );
}

export default Classes;
