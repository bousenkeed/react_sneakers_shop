import styles from './Info.module.css';

function Info({ title, descripton, image, isEmptyCartVisible, onClick }) {
    return (
        <div
            className={`${styles.emptyCart} ${styles.emptyCartHidden} ${
                isEmptyCartVisible ? styles.show : ''
            }`}
        >
            <div className={styles.emptyCart__inner}>
                <div className={styles.image}>
                    <img src={image} alt="" />
                </div>
                <h2>{title}</h2>
                <p>{descripton}</p>
                <button onClick={onClick} className={styles.homeButton}>
                    <img src="images/arrow.svg" alt="Back to homepage Button" />
                    Вернуться назад
                </button>
            </div>
        </div>
    );
}

export default Info;
