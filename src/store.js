import {createStore, combineReducers} from 'redux';

let choicePlace = (state, action) => {
  if ( state === undefined )
    return { places: [], price: 0 }
  if ( action.type === 'SET_PLACES' )
    return { places: action.arr, price: state.price }
  if ( action.type === 'SET_PRICE')
    return { places: state.places, price: action.num }
  return state
}
const reducers = combineReducers({
  places: choicePlace
})

const store = createStore(reducers)

export default store 
