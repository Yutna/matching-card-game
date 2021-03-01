import styles from '../styles/panel.module.scss';

const displayScore = (score) => {
  return score === 0 ? '-' : score;
};

function PanelScore({ title, score }) {
  return (
    <div className={styles.panel}>
      <strong className={styles.panelTitle}>
        {title}
      </strong>
      <em className={styles.panelScore}>
        {displayScore(score)}
      </em>
    </div>
  );
}

export default PanelScore;
