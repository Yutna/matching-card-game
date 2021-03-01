import React from 'react';
import Head from 'next/head';
import _ from 'lodash';

import Layout from '../components/layout';
import Header from '../components/header';
import Card from '../components/card';
import PanelScore from '../components/panelScore';
import PanelAction from '../components/panelAction';
import Desk from '../components/desk';

import CardsAdapter from '../adapters/CardsAdapter';
import deskStyles from '../styles/desk.module.scss';

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

  render() {
    const { click, myBest, globalBest, cards } = this.state;

    return (
      <Layout>
        <Header title="Matching Card Game" />
        <Desk>
          <div className={deskStyles.deskPanel}>
            <PanelScore title="Click:" score={click} />
            <PanelScore title="My Best:" score={myBest} />
            <PanelScore title="Global Best:" score={globalBest} />
            <PanelAction title="Start New Game" onClick={this.handleNewGameButton} />
          </div>
          <div className={deskStyles.deskBoard}>
            {cards.map((card) => (
              <Card key={card.id} card={card} onCardClick={this.handleCardClick} />
            ))}
          </div>
        </Desk>
      </Layout>
    );
  }
}

export default Home;
