import styles from '../styles/button.module.scss';

function Button({ title, onClick }) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {title}
    </button>
  );
}

export default Button;
