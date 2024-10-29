import Card from '../components/Card/Card';
import styles from './Favorites.module.css';
import { AppContext } from '../App';
import { useContext, useEffect, useState } from 'react';

function Favorites() {
    const { favoritesItems } = useContext(AppContext);
 
    return (
        <section className={styles.favorites}>
            <h1>Мои Закладки</h1>

            {favoritesItems.length > 0 ? (
                <div className={styles.cards}>
                    {favoritesItems.map((item) => {
                        return <Card key={item.id} {...item} />;
                    })}
                </div>
            ) : (
                <p className={styles.message}>Тут будут ваши закладки</p>
            )}
        </section>
    );
}

export default Favorites;
