import classNames from 'classnames/bind';
import styles from '../styles/card.module.scss';

const cardStylesContext = classNames.bind(styles);
const getCardStyles = (card) => {
  return cardStylesContext({
    card: true,
    cardOpen: card.open,
    cardMatched: card.matched,
    cardUnmatched: card.unmatched,
    cardDisabled: card.disabled
  });
};

const displayCardNumber = (card) => {
  return card.open ? card.number : '';
};

function Card({ card, onCardClick }) {
  return (
    <div className={getCardStyles(card)} onClick={() => onCardClick(card)}>
      {displayCardNumber(card)}
    </div>
  );
}

export default Card;
