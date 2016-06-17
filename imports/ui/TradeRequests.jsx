import React, { Component, PropTypes } from 'react'


export default class TradeRequests extends Component {

  constructor() {
    super();
    this.state = {showingOffers: false};

    this.showRequests = this.showRequests.bind(this);
    this.renderOffers = this.renderOffers.bind(this);
  }

  showRequests() {
    if(!this.state.showingOffers) {
      this.setState({showingOffers: true})
    } else {
      this.setState({showingOffers: false})
    }
  };

  renderOffers() {
    if(this.state.showingOffers) {
      return this.props.d.map((offer) => {
        return <RenderRequests key={Math.random()} d={offer} />
      })
    }
  }

  render() {
    return (
      <div className="trades-container">
        <button key={Math.random()} className="my-trade-requests" onClick={this.showRequests}>
          Trade requests: {this.props.d.length}
        </button>
        <div className="showing-requests" >
          {this.renderOffers()}
        </div>
      </div>
    )
  }

}


class RenderRequests extends Component {

  constructor() {
    super();

    this.refuseTrade = this.refuseTrade.bind(this);
    this.acceptTrade = this.acceptTrade.bind(this);
  }

  refuseTrade() {
    Meteor.call("bookData.refuseTrade", this.props.d);
  }

  acceptTrade() {
    Meteor.call("bookData.acceptTrade", this.props.d);
  }

  render() {
    let o = this.props.d;
    return (
      <div className="single-offer">
        <div className="offer-terms">
          {o.tar[0]} wants {o.tar[1]}  for your book - {o.you[1]}
        </div>
        <button onClick={this.acceptTrade}> V </button>
        <button onClick={this.refuseTrade}> X </button>
      </div>
    )
  }
}