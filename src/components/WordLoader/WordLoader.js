import React from "react";
import { connect } from "react-redux";
import { getWords } from "../../actionCreators";
import { API, API_BASE } from "../../config/";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./Word.css";

const options = {
  API: "wordbot",
  count: 10,
  set: "verbs"
};
function arrayMove(array, from, to) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);

  return array;
}
const DragWord = SortableElement(({ value, special }) => {
  return <li className={`dragItem ${special ? "drop" : ""}`}>{value}</li>;
});
const DragArea = SortableContainer(({ wordList }) => {
  return (
    <ul className="dragArea">
      {wordList.map((word, i) => (
        <DragWord key={`item-${i}`} index={i} value={word} />
      ))}
    </ul>
  );
});

class WordLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordList: ["I", "and", "for", "be", "to"],
      appendWords: true
    };
  }

  componentDidMount() {
    this.fetchWords();
  }

  componentDidUpdate(prevProps) {
    if (this.props.Words !== prevProps.Words) {
      // appending
      const wordList = [...this.state.wordList, ...this.props.Words];
      this.setState({ wordList });
      this.props.updateWords(wordList);
    }
  }

  fetchWords() {
    API(API_BASE, options, URL => {
      this.props.getWords(URL);
    });
  }
  getInitialY = e => {
    this.ref = e.node;
    this.setState({ initialY: e.node.offsetTop, nodeIndex: e.index });
  };
  handleSort = ({ oldIndex, newIndex }) => {
    if (this.state.dropItem) {
      const wordList = [...this.state.wordList];
      wordList.splice(oldIndex, 1);
      this.setState({ wordList });
    } else {
      this.setState({
        wordList: arrayMove(this.state.wordList, oldIndex, newIndex)
      });
    }
  };

  updateStyle = e => {
    const diffY = e.y - this.state.initialY;
    if (diffY > 55 || diffY < -10) {
      this.setState({ dropItem: true });
    } else {
      this.setState({ dropItem: false });
    }
  };
  render() {
    const { wordList, dropItem } = this.state;
    const helper = dropItem ? "drop-draggable" : "draggable";
    return (
      <DragArea
        axis={"x"}
        wordList={wordList}
        hideSortableGhost={true}
        onSortMove={this.updateStyle}
        onSortStart={this.getInitialY}
        onSortEnd={this.handleSort}
        helperClass={helper}
      />
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
