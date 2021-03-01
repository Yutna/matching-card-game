import Head from 'next/head';
import styles from '../styles/layout.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Matching Game Card</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Play:wght@400;700&display=swap" />
      </Head>
      {children}
    </div>
  );
}

export default Layout;
