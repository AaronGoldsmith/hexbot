import { GET_WORDS, GET_COLORS } from "./config";

//  setup for generic reducer configuration
export default function(state = { wordData: [], colorData: [] }, action) {
  switch (action.type) {
    case GET_WORDS:
      return { ...state, wordData: action.words };
    case GET_COLORS:
      return { ...state, colorData: action.colors };
    default:
      return state;
  }
}
