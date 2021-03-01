import React from 'react';
import Head from 'next/head';
import _ from 'lodash';
import classNames from 'classnames/bind';
import CardsAdapter from '../adapters/CardsAdapter';
import layoutStyles from '../styles/layout.module.scss';
import headerStyles from '../styles/header.module.scss';
import deskStyles from '../styles/desk.module.scss';
import cardStyles from '../styles/card.module.scss';
import panelStyles from '../styles/panel.module.scss';
import buttonStyles from '../styles/button.module.scss';

const cardStylesContext = classNames.bind(cardStyles);

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleNewGameButton = this.handleNewGameButton.bind(this);

    this.state = {
      click: 0,
      myBest: 0,
      globalBest: 0,
      cards: [],
      openedCards: []
    };
  }

  // Component life-cycle

  componentDidMount() {
    CardsAdapter.get().then((data) => {
      const { globalBest, items } = data;
      const cards = _.shuffle([...items]);

      this.setState({ globalBest, cards });
    });
  }

  // Event handlers

  handleCardClick(targetCard) {
    const { click, cards, openedCards } = this.state;
    const newClickScore = click + 1;

    cards.forEach((card) => {
      card.disabled = true;

      if (card.id === targetCard.id) {
        card.open = true;
        openedCards.push(card);
      }
    });

    this.setState({
      click: newClickScore,
      cards,
      openedCards
    }, () => {
      this.checkMatchedOrUnmatchedOpenCards();
    });
  }

  handleNewGameButton() {
    const { globalBest } = this.state;

    CardsAdapter.get().then((data) => {
      const { items } = data;
      const cards = _.shuffle(items);

      this.setState({
        click: 0,
        myBest: 0,
        globalBest,
        cards,
        openedCards: []
      });
    });
  }

  // Component methods

  checkMatchedOrUnmatchedOpenCards() {
    const { cards, openedCards } = this.state;
    const cardIds = openedCards.map((card) => card.id);

    if (openedCards.length !== 2) {
      cards.forEach((card) => {
        if (cardIds.includes(card.id) || (card.open && card.matched)) {
          card.disabled = true;
        } else {
          card.disabled = false;
        }
      });

      this.setState({ cards });
      return;
    }

    const firstCard = openedCards[0];
    const secondCard = openedCards[1];

    if ((firstCard.number === secondCard.number)) {
      this.matched();
    } else {
      this.unmatched();
    }
  }

  matched() {
    const { cards, openedCards } = this.state;
    const cardIds = openedCards.map((card) => card.id);

    cards.forEach((card) => {
      if (cardIds.includes(card.id)) {
        card.matched = true;
        card.disabled = true;
      } else if (card.open && card.matched) {
        card.disabled = true;
      } else {
        card.disabled = false;
      }
    });

    this.setState({ cards, openedCards: [] }, () => {
      this.updatePanel();
    });
  }

  unmatched() {
    const { cards, openedCards } = this.state;
    const cardIds = openedCards.map((card) => card.id);

    cards.forEach((card) => {
      if (cardIds.includes(card.id)) {
        card.unmatched = true;
      }
    });

    this.setState({ cards }, () => {
      this.closeCards();
    });
  }

  closeCards() {
    const { cards, openedCards } = this.state;
    const cardIds = openedCards.map((card) => card.id);

    cards.forEach((card) => {
      if (cardIds.includes(card.id)) {
        card.open = false;
        card.unmatched = false;
        card.disabled = false;
      } else if (card.open && card.matched) {
        card.disabled = true;
      } else {
        card.disabled = false;
      }
    });

    setTimeout(() => {
      this.setState({ cards, openedCards: [] });
    }, 375);
  }

  updatePanel() {
    const { click, cards } = this.state;
    const clickScore = click;
    const matchedCardIds = cards.filter((card) => card.matched).map((card) => card.id);

    if (matchedCardIds.length !== cards.length) {
      return;
    }

    this.setState({
      click: 0,
      myBest: clickScore,
      globalBest: clickScore
    });
  }

  // Render or presenter methods

  displayScore(score) {
    return score === 0 ? '-' : score;
  }

  displayCardNumber(card) {
    return card.open ? card.number : '';
  }

  getCardStyles(card) {
    return cardStylesContext({
      card: true,
      cardOpen: card.open,
      cardMatched: card.matched,
      cardUnmatched: card.unmatched,
      cardDisabled: card.disabled
    });
  }

  render() {
    const { click, myBest, globalBest, cards } = this.state;

    return (
      <div className={layoutStyles.container}>
        <Head>
          <title>Matching Game Card</title>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" />
        </Head>
        <header className={headerStyles.header}>
          <h1 className={headerStyles.headerTitle}>
            Matching Card Game
          </h1>
        </header>
        <div className={deskStyles.desk}>
          <div className={deskStyles.deskPanel}>
            <div className={panelStyles.panel}>
              <strong className={panelStyles.panelTitle}>
                Click:
              </strong>
              <em className={panelStyles.panelScore}>
                {this.displayScore(click)}
              </em>
            </div>
            <div className={panelStyles.panel}>
              <strong className={panelStyles.panelTitle}>
                My Best:
              </strong>
              <em className={panelStyles.panelScore}>
                {this.displayScore(myBest)}
              </em>
            </div>
            <div className={panelStyles.panel}>
              <strong className={panelStyles.panelTitle}>
                Global Best:
              </strong>
              <em className={panelStyles.panelScore}>
                {this.displayScore(globalBest)}
              </em>
            </div>
            <div className={panelStyles.panel}>
              <button type="button" className={buttonStyles.button} onClick={this.handleNewGameButton}>
                Start New Game
              </button>
            </div>
          </div>
          <div className={deskStyles.deskBoard}>
            {cards.map((card) => (
              <div key={card.id} className={this.getCardStyles(card)} onClick={() => this.handleCardClick(card)}>
                {this.displayCardNumber(card)}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
