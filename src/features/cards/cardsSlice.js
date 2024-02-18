import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  decks: {},
  newCard: null,
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchCardsForDeck: (state, action) => {
      const { deckId, cards, permissions } = action.payload;

      // Erstellen oder Aktualisieren des Deck-Objekts mit Karten und Berechtigungen
      state.decks[deckId] = {
        cards: [...cards].sort((a, b) => a.card_id - b.card_id),
        permissions: permissions
      };
      
    },
    addCardToDeck: (state, action) => {
      const { deckId, card } = action.payload;
      if (state.decks[deckId].cards) {
        card.is_active = null
        state.decks[deckId].cards.push(card);
      } else {
        // Handle the case where the deck does not exist yet
        //state.decks[deckId] = [card];
      }
    },
    updateCardInDeck: (state, action) => {
      const { deckId, cardId, updatedCard } = action.payload;

      if (state.decks[deckId].cards) {
        
        // Konvertieren von cardId in Number, wenn card.card_id eine Zahl ist
        const numericCardId = Number(cardId);
        const cardIndex = state.decks[deckId].cards.findIndex(
          (card) => card.card_id === numericCardId
        );
        if (cardIndex !== -1) {
          state.decks[deckId].cards[cardIndex] = {
            ...state.decks[deckId].cards[cardIndex],
            ...updatedCard,
          };
          // Sortieren, wenn notwendig
          state.decks[deckId].cards = [...state.decks[deckId].cards].sort(
            (a, b) => a.card_id - b.card_id
          );
        }
      }
    },

    removeCardsFromDeck: (state, action) => {
      const { deckId, cardIds } = action.payload;
      //    console.log(JSON.parse(JSON.stringify(state.decks)));
      //     console.log(JSON.parse(JSON.stringify(state.decks[deckId])));

      if (state.decks[deckId].cards) {
        state.decks[deckId].cards = state.decks[deckId].cards.filter(
          (card) => !cardIds.includes(card.card_id)
        );
      }
    },
    updateLearningStackStatus: (state, action) => {
      const cardIdsInLearningStack = action.payload;
      Object.keys(state.decks).forEach((deckId) => {
        state.decks[deckId].cards.forEach((card) => {
          if (cardIdsInLearningStack.includes(card.card_id)) {
            card.is_active = true
          }
        });
      });
    },
    setActiveStatus: (state, action) => {
      const { deckId, cardIds, activeStatus } = action.payload;
      if (state.decks[deckId].cards) {
        state.decks[deckId].cards.forEach((card) => {
          if (cardIds.includes(card.card_id)) {
            card.is_active = activeStatus; 
          }
        });
      }
    },
  },
});

export const {
  fetchCardsForDeck,
  addCardToDeck,
  updateCardInDeck,
  removeCardsFromDeck,
  updateLearningStackStatus,
  setActiveStatus
} = cardsSlice.actions;
export default cardsSlice.reducer;
