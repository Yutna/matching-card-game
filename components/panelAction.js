import Button from './button';
import styles from '../styles/panel.module.scss';

function PanelAction({ title, onClick }) {
  return (
    <div className={styles.panel}>
      <Button title={title} onClick={onClick} />
    </div>
  );
}

export default PanelAction;
