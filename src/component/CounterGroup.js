import React, { Component } from "react";
import Counter from "./Counter";
import { connect } from "react-redux";

class CounterGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: this.props.defaultCount
    }
  }

  regenrateCounters = () => {
    const arraySize = parseInt(this.refs.countInput.value);
    if (arraySize > 0) {
      this.props.dispatch({
        type: "UPDATEARRAY",
        payload: arraySize
      });
      this.props.dispatch({
        type: "RESETSUM"
    });
    }
  };

  counterUpdateCallback = changedNum => {
    this.props.dispatch({
      type: "CALCULATESUM",
      payload: changedNum
    });
  };

  increaseNumber = (changedNum, id) => {
    this.props.dispatch({
      type: "INCREMENT",
      payload: {changedNum, id}
    });
  };

  decreaseNumber = (changedNum, id) => {
    this.props.dispatch({
      type: "DECREMENT",
      payload: {changedNum, id}
    });
  };

  render() {
    return (
      <div>
        {this.props.counterArr.map(counterItem => (
          <Counter
            key={counterItem.id}
            id={counterItem.id}
            countValue={counterItem.count}
            onCounterValueChanged={this.counterUpdateCallback}
            onClickIncreased={this.increaseNumber}
            onClickDecreased={this.decreaseNumber}
          />
        ))}
        <input type="text" ref="countInput" />
        <button onClick={this.regenrateCounters}>
          Regenerate indicated Counters
        </button>
        <br />
        <span>Kabuuan：{this.props.counterSum}</span>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counterSum: state.counterSum,
  counterArr: state.counterArr
}); 

connect(mapStateToProps)(CounterGroup)

export default connect(mapStateToProps)(CounterGroup);
