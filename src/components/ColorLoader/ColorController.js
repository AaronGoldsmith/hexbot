import React from "react";
import { connect } from "react-redux";

import { API, API_BASE } from "../../config/";
import { getColors } from "../../actionCreators";
import BoxColor from "./BoxColor";
import PlusMinus from "../Icons/PlusMinus";
import Input from "../Input";
import "./BoxController.css";

const defaultColor = "#FFFFFF";
const options = {
  API: "hexbot",
  count: 1
};
// seed: ["00004F", "0FFFFF", "3B0284"]

class ColorController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorList: [],
      color: defaultColor,
      brainFrt: "",
      inputs: {},
      open: false
    };
    this.clickHandler = e => {
      const color = e.currentTarget.style.backgroundColor;
      e.shiftKey
        ? this.setState({ color, open: true })
        : this.setState({ color: defaultColor, open: false });
    };
    this.handleInput = e => {
      const val = e.currentTarget.value;
      const name = e.currentTarget.name;
      let copyInput = { ...this.state.inputs, [name]: val };
      let opts = { ...options, count: val };
      this.setState({ inputs: copyInput });

      API(API_BASE, opts, URL => {
        this.props.getColors(URL);
      });
    };
  }

  componentDidMount() {
    API(API_BASE, options, URL => {
      this.props.getColors(URL);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.Colors !== prevProps.Colors) {
      this.setState({ colorList: this.props.Colors });
    }

    if (this.props.squares !== prevProps.squares) {
      let opts = { ...options, count: this.props.squares };

      this.setState({ squares: this.props.squares });
      API(API_BASE, opts, URL => {
        this.props.getColors(URL);
      });
    }
    // loaded from diff component
    if (this.props.words !== prevProps.words) {
      let index = Math.floor(Math.random() * this.props.words.length);
      const randWord = this.props.words[index];
      this.setState({ brainFrt: randWord });
    }
  }

  render() {
    const { colorList, color, brainFrt, open } = this.state;
    const openClss = open ? "open" : "";
    return (
      <div className={`colorGrid ${openClss}`} style={{ background: color }}>
        <div className="inputContainer">
          <Input
            name="countColors"
            text="how many?"
            updateVal={this.handleInput}
          />
          <Input
            id="2"
            name="question"
            text={`what ${brainFrt}?`}
            updateVal={this.handleInput}
          />
        </div>
        <div className="boxWrap">
          {colorList.map((color, i) => {
            const { value } = color;
            return (
              <BoxColor
                key={i}
                handleClick={this.clickHandler}
                background={value}
                size={25}
              />
            );
          })}
        </div>
        <PlusMinus
          handleClick={() => {
            this.setState({ open: !open });
          }}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    Colors: state.colorData
  };
}

export default connect(
  mapStateToProps,
  { getColors }
)(ColorController);
