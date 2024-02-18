import { addCardApi, translateTextApi, getCardsForDeckApi, updateCardApi, deleteCardsApi } from "./cardsApi";
import { addCardToDeck, fetchCardsForDeck, updateCardInDeck, removeCardsFromDeck } from "./cardsSlice";


export const addCardAction = (deckId, frontText, backText) => async (dispatch) => {
    try {        
      if(!deckId || frontText === "" || backText === ""){
        throw new Error("Daten fehlen um Karte hinzuzufügen in Action")
      }

      const formattedFrontText = formatTextForHtml(frontText);
      const formattedBackText = formatTextForHtml(backText);

      const card = await addCardApi(deckId, frontText, backText)
      dispatch(addCardToDeck({deckId, card}));

    } catch (error) {
      console.error("Fehler hinzufügen einer Karteikarte in Action", error);
    }
  };

  const formatTextForHtml = (text) => {
    return text.replace(/\n/g, '<br>');
};

export const translateTextAction = async (text, sourceLang, targetLang)  => {
  try {
    if(text === "" || sourceLang === " " || targetLang === ""){
      throw new Error("Daten fehlen um Text zu übersetzen")
    }

    const translatedText = await translateTextApi(text, sourceLang, targetLang)
    return translatedText

    
  } catch (error) {
    console.error("Fehler beim Übersetzen", error);
  }
}

export const getCardsForDeckAction = (deckId) => async (dispatch) => {
  try {        
    const cardsInDeck = await getCardsForDeckApi(deckId)
    
    const cards = cardsInDeck.cards
    const permissions = cardsInDeck.permissions
    dispatch(fetchCardsForDeck({deckId, cards, permissions}));
  } catch (error) {
    console.error("Fehler beim Abrufen der Eigenschaften:", error);

  }
};


export const updateCardAction = (deckId, cardId, frontText, backText) => async (dispatch) => {
  try {        
    if(!deckId || !cardId || frontText === "" || backText === ""){
      throw new Error("Daten fehlen um Karte hinzuzufügen in Action")
    }

    const formattedFrontText = formatTextForHtml(frontText);
    const formattedBackText = formatTextForHtml(backText);

    const updatedCard = await updateCardApi(cardId, frontText, backText)
    const numericCardId = Number(cardId);
    dispatch(updateCardInDeck({deckId, cardId: numericCardId, updatedCard}));

  } catch (error) {
    console.error("Fehler hinzufügen einer Karteikarte in Action", error);

  }
};

export const deleteCardsAction = (deckId, cardIds) => async (dispatch) => {
  try {        
    if(!deckId || cardIds.length === 0){
      throw new Error("Missing data to delete cards in Action")
    }

    await deleteCardsApi(deckId, cardIds);
    dispatch(removeCardsFromDeck({deckId, cardIds}));

  } catch (error) {
    console.error("Error deleting cards in Action", error);
  }
};



