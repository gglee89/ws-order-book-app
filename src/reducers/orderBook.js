import {
  ORDER_BOOK_SUBSCRIBE,
  ORDER_BOOK_UNSUBSCRIBE,
  ORDER_BOOK_SUCCESS,
  ORDER_BOOK_ERROR,
  ORDER_BOOK_DATA,
} from '../actions/orderBook';

const initialState = {
  success: {},
  error: {},
  data: {
    asks: [],
    bids: [],
  },
  symbol: '',
  stream: '',
  isSubscribed: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_BOOK_SUBSCRIBE:
      return {
        ...state,
        isSubscribed: true,
        symbol: action.payload.symbol,
        stream: action.payload.stream,
      };
    case ORDER_BOOK_UNSUBSCRIBE:
      return {
        ...state,
        isSubscribed: false,
      };
    case ORDER_BOOK_SUCCESS:
      return {
        ...state,
        success: type.payload,
      };
    case ORDER_BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ORDER_BOOK_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          asks: action.payload[0].asks ? action.payload[0].asks : [],
          bids: action.payload[0].bids ? action.payload[0].bids : [],
        },
      };
    default:
      return state;
  }
};

/**
 * SELECTORS
 */
function select(state) {
  return state.orderBook;
}

export function getSuccess(state) {
  return select(state).success;
}

export function getError(state) {
  return select(state).error;
}

export function getData(state) {
  return select(state).data;
}

export function getSymbol(state) {
  return select(state).symbol;
}

export function getStream(state) {
  return select(state).stream;
}

export function isSubscribed(state) {
  return select(state).isSubscribed;
}

export default reducer;
