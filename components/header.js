import styles from '../styles/header.module.scss';

function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        {title}
      </h1>
    </header>
  );
}

export default Header;
