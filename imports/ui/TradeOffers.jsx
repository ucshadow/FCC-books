import React, { Component, PropTypes } from 'react'


export default class TradeOffers extends Component {

  constructor() {
    super();
    this.state = {showingOffers: false};

    this.showOffers = this.showOffers.bind(this);
    this.renderOffers = this.renderOffers.bind(this);
  }

  showOffers() {
    if(!this.state.showingOffers) {
      this.setState({showingOffers: true})
    } else {
      this.setState({showingOffers: false})
    }
  };

  renderOffers() {
    if(this.state.showingOffers) {
      return this.props.d.map((offer) => {
        return <RenderOffers key={Math.random()} d={offer} />
      })
    }
  }

  render() {
    return (
      <div className="trades-container">
        <button key={Math.random()} className="my-trade-offers" onClick={this.showOffers}>
          Trade offers: {this.props.d.length}
        </button>
        <div className="showing-offers" >
          {this.renderOffers()}
        </div>
      </div>
    )
  }

}


class RenderOffers extends Component {

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
          {o.tar[0]} - {o.tar[1]}  => {o.you[1]}
        </div>
        <button onClick={this.acceptTrade}> V </button>
        <button onclick={this.refuseTrade}> X </button>
      </div>
    )
  }
}