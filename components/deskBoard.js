import styles from '../styles/desk.module.scss';

function DeskBoard({ children }) {
  return (
    <div className={styles.deskBoard}>
      {children}
    </div>
  );
}

export default DeskBoard;
