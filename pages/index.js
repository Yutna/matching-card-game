import React from 'react';
import Head from 'next/head';
import _ from 'lodash';
import CardsAdapter from '../adapters/CardsAdapter';
import layoutStyles from '../styles/layout.module.scss';
import headerStyles from '../styles/header.module.scss';
import deskStyles from '../styles/desk.module.scss';
import cardStyles from '../styles/card.module.scss';
import panelStyles from '../styles/panel.module.scss';
import buttonStyles from '../styles/button.module.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      click: 0,
      myBest: 0,
      globalBest: 0,
      cards: []
    };
  }

  // Component life-cycle

  componentDidMount() {
    CardsAdapter.get().then((data) => {
      const { globalBest, items } = data;
      const cards = _.shuffle(items);

      this.setState({ globalBest, cards }, () => {
        console.log(cards);
      });
    });
  }

  // Render or presenter methods

  displayScore(score) {
    return score === 0 ? '-' : score;
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
              <button type="button" className={buttonStyles.button}>
                Start New Game
              </button>
            </div>
          </div>
          <div className={deskStyles.deskBoard}>
            {cards.map((card) => (
              <div key={card.id} className={cardStyles.card}>
                {card.number}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
