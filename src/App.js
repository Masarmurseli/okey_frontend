import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";



function App() {
 
  

  return (
    <>
Hallooooo
          <Routes>
            {/* <Route path="/" element={<LearningStack />} />
            <Route path="/sessions" element={<LearningSessions />} />
            <Route path="/decks" element={<Decks />} />
            <Route path="/decks/add" element={<AddDeck />} />
            <Route path="/decks/:deck_id" element={<Deck />} />
            <Route path="/decks/share-deck/:deck_id" element={<ShareDeck /> } /> 
            <Route path="/decks/:deck_id/addCard" element={<AddCard />} />
            <Route path="/decks/:deck_id/addCard/:card_id" element={<AddCard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/requests" element={<Requests />} /> */}
            

          </Routes>
        </>
   
  );
}

export default App;
