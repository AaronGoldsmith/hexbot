import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import actions from "./actions.js";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import WordLoader from "./components/WordLoader/WordLoader.js";
import ColorController from "./components/ColorLoader/ColorController";
import "./styles.css";

function App() {
  const [wordList, setWords] = useState(0);
  const handleVal = useCallback(e => {
    // console.log(e)
    setWords(e);
  }, []);

  return (
    <div className="App">
      <div />
      <ColorController words={wordList} />
      <WordLoader updateWords={handleVal} />
    </div>
  );
}

const rootElement = document.getElementById("root");
const storeWithThunk = createStore(actions, {}, applyMiddleware(ReduxThunk));
ReactDOM.render(
  <Provider store={storeWithThunk}>
    <App />
  </Provider>,
  rootElement
);
