const apiEndpoint =
  "https://recruiting.verylongdomaintotestwith.ca/api/suhyun-park29/character";

export const fetchCharacterData = async () => {
  try {
    const response = await fetch(apiEndpoint);
    if (response.ok) {
      const data = await response.json();
      return data.body;
    } else {
      console.error("Failed to fetch character data.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching character data:", error);
    return null;
  }
};

export const saveCharacterData = async (characterData) => {
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(characterData),
    });

    if (response.ok) {
      console.log("Character data saved successfully.");
      return true;
    } else {
      console.error("Failed to save character data.");
      return false;
    }
  } catch (error) {
    console.error("Error saving character data:", error);
    return false;
  }
};
