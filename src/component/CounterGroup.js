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
    this.props.dispatch({ //this dispatch will wuto inject by connect() method
      type: "CALCULATESUM",
      payload: changedNum
    }); //{type: "", payload: xxx} named action, it will bo translated to ./reducer
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
// counterSum is a prop in CounterGroup, it will give counterSum a new value of state.counterSum whitch come from ./reducer switch return
// you try to imagine counterSum will be passed to this.props.counterSum in CounterGroup like the result of <CounterGroup counterSum={state.counterSum}/>

connect(mapStateToProps)(CounterGroup)

export default connect(mapStateToProps)(CounterGroup);//let CounterGroup and Redux know each other
