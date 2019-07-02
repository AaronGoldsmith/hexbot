import React from "react";
import { connect } from "react-redux";
import { getWords } from "../../actionCreators";
import { API, API_BASE } from "../../config/";
const options = {
  API: "wordbot",
  count: 1
};
class WordLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wordList: [] };
  }
  componentDidMount() {
    this.fetchWords();
  }
  componentDidUpdate(prevProps) {
    if (this.props.Words !== prevProps.Words) {
      this.setState({ wordList: this.props.Words });
      this.props.updateWords(this.props.Words);
    }
  }
  fetchWords() {
    API(API_BASE, options, URL => {
      this.props.getWords(URL);
    });
  }
  render() {
    return (
      <React.Fragment>
        {this.state.wordList.map((word, i) => {
          return <p key={i}>{word}</p>;
        })}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    Words: state.wordData
  };
}

export default connect(
  mapStateToProps,
  { getWords }
)(WordLoader);
