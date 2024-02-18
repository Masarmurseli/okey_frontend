import { baseFetch } from "../../api/api";

const ENDPOINT = "/cards/";

export const addCardApi = async (deck_id, front_content, back_content) => {
  try {
    const cardData = {
      deck_id,
      front_content,
      back_content,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    };

    const result = await baseFetch(ENDPOINT, options);

    if (result.data && result.data.card) {
      return result.data.card;
    } else {
      throw new Error("card not added");
    }

  } catch (error) {
    console.error("Fehler beim hinzufügen der Card in Api:", error);
    throw error;
  }
};

export const translateTextApi  = async (text, sourceLang, targetLang) => {
  try {
    const translateData = {
      text, sourceLang, targetLang
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(translateData),
    };

    const result = await baseFetch("/translate/", options);

    if (result.data && result.data.translations) {
      return result.data.translations;
    } else {
      throw new Error("No translation");
    }

  } catch (error) {
    console.error("Fehler beim hinzufügen der Card in Api:", error);
    throw error;
  }
};

export const getCardsForDeckApi = async (deckId) => {
  try {
      const options = { method: "GET" };
      const result = await baseFetch(`${ENDPOINT}${deckId}`, options);

      if (result.data && result.data.cards && result.data.permissions) {
          return result.data;
      } else {
          throw new Error("decksnicht vorhanden")
      }

  } catch (error) {
      console.error("Fehler beim Abrufen der Eigenschaften:", error);
      throw error; 
  }
};

export const updateCardApi = async (card_id, front_content, back_content) => {
  try {
    const cardData = {
      card_id,
      front_content,
      back_content,
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    };

    const result = await baseFetch(ENDPOINT, options);

    if (result.data && result.data.card) {
      return result.data.card;
    } else {
      throw new Error("card not added");
    }

  } catch (error) {
    console.error("Fehler beim hinzufügen der Card in Api:", error);
    throw error;
  }
};

export const deleteCardsApi = async (deckId, cardIds) => {
  try {
    const deleteData = {
      deck_id: deckId,
      card_ids: cardIds,
    };

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteData),
    };

    const result = await baseFetch(ENDPOINT, options);

    if (result.message !== "Cards deleted successfully") {
      throw new Error(`Server responded with status: ${result.status}`);
    }

  } catch (error) {
    console.error("Fehler beim Löschen der Karten in der API:", error);
    throw error;
  }
};







