
const initialState = { 
  counterSum: 0,
  counterArr: new Array(3)
  .fill(0)
  .map(() => ({ count: 0, id: new Date().getTime() + Math.random() }))
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "CALCULATESUM":
      console.log(payload)
      return { counterSum: state.counterSum + payload, counterArr: state.counterArr};
    case "RESETSUM":
      return { counterSum: 0, counterArr: state.counterArr};
    case "UPDATEARRAY":
      const updatedArray = new Array(payload)
        .fill(0)
        .map(() => ({ count: 0, id: new Date().getTime() + Math.random() }));
      return { counterSum: state.counterSum, counterArr: updatedArray};
    case "INCREMENT":
      const incrementedArray = state.counterArr.map(counterItem => {
        if (counterItem.id === payload.id) {
          return { id: payload.id, 
                    count: counterItem.count + parseInt(payload.changedNum) };
        } else {
          return counterItem;
        }
      });
      return {
        counterSum: state.counterSum,
        counterArr: incrementedArray
      }
    case "DECREMENT":
      const decrementedArray = state.counterArr.map(counterItem => {
        if (counterItem.id === payload.id) {
          return { id: payload.id, 
                    count: counterItem.count - parseInt(payload.changedNum) };
          } else {
            return counterItem;
          }
       });
      return {
        counterSum: state.counterSum,
        counterArr: decrementedArray
      }
    default:
      return state;
  }
};

