import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

// Style
import styles from './orderBook.scss';

// Actions
import * as orderBookActions from '../../actions/orderBook';

// Selectors
import * as orderBookSelectors from '../../reducers/orderBook';

const OrderBookTable = props => {
  const {
    data: { asks, bids },
  } = props;

  return (
    <Grid>
      <Row>
        <Col md={6} xs={6}>
          <div>Asks - Latest 10</div>
          <Table bordered condensed>
            <thead>
              <tr>
                <th>#</th>
                <th>Asks</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {asks &&
                asks.length > 0 &&
                asks.map((ask, idx) => {
                  return (
                    <tr id={idx}>
                      <td>{idx}</td>
                      <td>{ask[0]}</td>
                      <td>{ask[1]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>

        <Col md={6} xs={6}>
          <div>Bids - Latest 10</div>
          <Table bordered condensed>
            <thead>
              <tr>
                <th>#</th>
                <th>Bids</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bids &&
                bids.length > 0 &&
                bids.map((bid, idx) => {
                  return (
                    <tr id={idx}>
                      <td>{idx}</td>
                      <td>{bid[0]}</td>
                      <td>{bid[1]}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Grid>
  );
};

class OrderBook extends React.PureComponent {
  componentDidMount() {
    const {
      props: { isSubscribed, subscribeOrderBook },
    } = this;

    if (isSubscribed) {
      return;
    }

    this.unsubscribe = subscribeOrderBook();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const {
      props: { data, symbol, stream, isSubscribed },
    } = this;

    return (
      <div
        className={[
          [styles['white-color'], styles['table__wrapper']].join(' '),
        ]}
      >
        <div className={styles['table__header']}>
          <span className={styles['bold-text']}>Topic subscribed: </span>
          {!isSubscribed ? 'Not Subscribed' : `${stream}:${symbol}`}
        </div>
        <OrderBookTable data={data} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    success: orderBookSelectors.getSuccess(state),
    error: orderBookSelectors.getError(state),
    data: orderBookSelectors.getData(state),
    symbol: orderBookSelectors.getSymbol(state),
    stream: orderBookSelectors.getStream(state),
    isSubscribed: orderBookSelectors.isSubscribed(state),
  };
}

const actionCreators = {
  subscribeOrderBook: orderBookActions.subscribeOrderBook,
};

export default connect(
  mapStateToProps,
  actionCreators
)(OrderBook);
