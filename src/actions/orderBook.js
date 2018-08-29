export const ORDER_BOOK_SUBSCRIBE = 'orderBook/ORDER_BOOK_SUBSCRIBE';
export const ORDER_BOOK_UNSUBSCRIBE = 'orderBook/ORDER_BOOK_UNSUBSCRIBE';
export const ORDER_BOOK_SUCCESS = 'orderBook/ORDER_BOOK_SUCCESS';
export const ORDER_BOOK_ERROR = 'orderBook/ORDER_BOOK_ERROR';
export const ORDER_BOOK_DATA = 'orderBook/ORDER_BOOK_DATA';

import * as orderBookSelectors from '../reducers/orderBook';

/**
 * Response Format
 * Ref.: https://www.bitmex.com/app/wsAPI#Response-Format
 */
export const RESPONSE_SUCCESS = 'Success';
export const RESPONSE_ERROR = 'Error';
export const RESPONSE_DATA = 'Data';

/**
 * @description OrderBook WS subscription function.
 *      The mechanism for the
 * @param {String} topic
 * @returns {Func} unsubscribe() - Triggers the unsubscriptions
 *
 */
export function subscribeOrderBook(symbol = 'XBTUSD', stream = 'orderBook10') {
  return (dispatch, getState, { socket }) => {
    dispatch({ type: ORDER_BOOK_SUBSCRIBE, payload: { symbol, stream } });

    const unsubscribe = socket.subscribeOrderBook(
      (type, data) => {
        switch (type) {
          case RESPONSE_SUCCESS:
            return dispatch({
              type: ORDER_BOOK_SUCCESS,
              payload: data,
            });
          case RESPONSE_ERROR:
            return dispatch({
              type: ORDER_BOOK_ERROR,
              payload: data || 'Something went wrong',
            });
          case RESPONSE_DATA:
            return dispatch({
              type: ORDER_BOOK_DATA,
              payload: data,
            });
        }
      },
      symbol,
      stream
    );

    return () => {
      dispatch({ type: ORDER_BOOK_UNSUBSCRIBE });
      unsubscribe();
    };
  };
}
