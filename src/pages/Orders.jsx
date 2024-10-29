import axios from 'axios';

import { useEffect, useState } from 'react';
import Card from '../components/Card/Card';

import styles from './Orders.module.css';

function Orders({ isLoading }) {
    const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get('http://localhost:3001/orders');
            setOrderItems(data);
        })();
    }, []);
    return (
        <section className={styles.orders}>
            <h1>Мои покупки</h1>

            {orderItems.length > 0 ? (
                <div className={styles.cards}>
                    {orderItems.map((order) => {
                        return (
                            <div key={order.id} className={styles.order}>
                                <h3>Номер заказа: {order.id}</h3>
                                <div className={styles.items}>
                                    {order.items.map((item, index) => {
                                        return (
                                            <Card
                                                key={index}
                                                {...item}
                                                isLoading={isLoading}
                                                showButtons={false}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className={styles.message}>У вас нет заказов</p>
            )}
        </section>
    );
}

export default Orders;
