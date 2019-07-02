import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import actions from "./actions.js";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import WordLoader from "./components/WordLoader/WordLoader.js";
import ColorController from "./components/ColorLoader/ColorController";
import { ColorList } from "./components/ColorLoader/ColorList";
import "./styles.css";

function App() {
  const [wordList, setWords] = useState(0);
  const [colors, setColors] = useState([]);
  const handleVal = useCallback(e => {
    setWords(e);
  }, []);

  const handleColor = useCallback(e => {
    setColors(e);
  }, []);

  return (
    <div className="App">
      <ColorController words={wordList} updateColors={handleColor} />
      <WordLoader updateWords={handleVal} />

      {colors && <ColorList colorsPicked={colors} />}
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
