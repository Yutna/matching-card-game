import styles from '../styles/desk.module.scss';

function DeskPanel({ children }) {
  return (
    <div className={styles.deskPanel}>
      {children}
    </div>
  );
}

export default DeskPanel;
