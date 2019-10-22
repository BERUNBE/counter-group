
const initialState = { 
  counterSum: 0,
  counterArr: new Array(3)
  .fill(0)
  .map(() => ({ count: 0, id: new Date().getTime() + Math.random() }))
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "COUNTERSUM":
      console.log(payload)
      return { counterSum: state.counterSum + payload, counterArr: state.counterArr};
    case "RESETSUM":
      return { counterSum: 0, counterArr: state.counterArr};
    case "COUNTERARRAY":
      return { counterSum: state.counterSum, counterArr: payload};
    default:
      return state;
  }
};

