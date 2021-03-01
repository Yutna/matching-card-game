import styles from '../styles/desk.module.scss';

function Desk({ children }) {
  return (
    <div className={styles.desk}>
      {children}
    </div>
  );
}

export default Desk;
