import axios from "axios";
import { GET_COLORS, GET_WORDS } from "./config";
export function getColors(URL) {
  return dispatch => {
    axios.get(URL).then(colorData => {
      dispatch({
        type: GET_COLORS,
        colors: colorData.data.colors
      });
    });
  };
}
export function getWords(URL) {
  return dispatch => {
    axios.get(URL).then(wordData => {
      dispatch({
        type: GET_WORDS,
        words: wordData.data.words
      });
    });
  };
}
