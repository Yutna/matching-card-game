import Head from 'next/head';
import layoutStyles from '../styles/layout.module.scss';
import headerStyles from '../styles/header.module.scss';
import deskStyles from '../styles/desk.module.scss';
import cardStyles from '../styles/card.module.scss';
import panelStyles from '../styles/panel.module.scss';
import buttonStyles from '../styles/button.module.scss';

export default function Home() {
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
              -
            </em>
          </div>
          <div className={panelStyles.panel}>
            <strong className={panelStyles.panelTitle}>
              My Best:
            </strong>
            <em className={panelStyles.panelScore}>
              -
            </em>
          </div>
          <div className={panelStyles.panel}>
            <strong className={panelStyles.panelTitle}>
              Global Best:
            </strong>
            <em className={panelStyles.panelScore}>
              20
            </em>
          </div>
          <div className={panelStyles.panel}>
            <button type="button" className={buttonStyles.button}>
              Start New Game
            </button>
          </div>
        </div>
        <div className={deskStyles.deskBoard}>
          <div className={cardStyles.card}>1</div>
          <div className={cardStyles.card}>1</div>
          <div className={cardStyles.card}>2</div>
          <div className={cardStyles.card}>2</div>

          <div className={cardStyles.card}>3</div>
          <div className={cardStyles.card}>3</div>
          <div className={cardStyles.card}>4</div>
          <div className={cardStyles.card}>4</div>

          <div className={cardStyles.card}>5</div>
          <div className={cardStyles.card}>5</div>
          <div className={cardStyles.card}>6</div>
          <div className={cardStyles.card}>6</div>
        </div>
      </div>
    </div>
  );
}
