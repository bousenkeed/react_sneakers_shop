import { useEffect, useState, useContext } from 'react';
import { getTotalPrice, calculateTax } from '../../utils/utils';
import { AppContext } from '../../App';
import Info from '../Info/Info';
import axios from 'axios';
import styles from './Cart.module.css';

function Cart({ onClose, cartOpened }) {
    const [isEmptyCartVisible, setIsEmptyCartVisible] = useState(false);
    const [isOrdered, setIsOrdered] = useState(false);

    const { cartItems, handleUpdateCartItem, setCartItems } = useContext(AppContext);
    const totalPrice = getTotalPrice(cartItems);
    const tax = calculateTax(totalPrice);

    useEffect(() => {
        setIsEmptyCartVisible(cartItems.length === 0);
    }, [cartItems]);

    useEffect(() => {
        if (cartOpened) {
            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;
            setIsOrdered(false);

            return () => {
                document.body.style.overflow = 'auto';
                document.body.style.paddingRight = 0;
            };
        }
    }, [cartOpened]);

    const onClickOrder = async () => {
        try {
            const { data: cartItems } = await axios.get('http://localhost:3001/cart');
            const order = {
                id: Date.now(),
                items: cartItems.map(item => ({
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    imageUrl: item.imageUrl
                })),
                totalPrice: getTotalPrice(cartItems),
                tax: calculateTax(getTotalPrice(cartItems))
            };
            await axios.post('http://localhost:3001/orders', order);
            
            
            await Promise.all(
                cartItems.map((item) => {
                    return axios.delete(`http://localhost:3001/cart/${item.id}`);
                })
            );
            setCartItems([]);
            setIsOrdered(true);
        } catch (error) {
            console.error('Ошибка при очистке корзины', error);
        }
    };

    return (
        <div className={`${styles.overlay} ${cartOpened ? styles.overlayVisible : ''}`}>
            <div className={`${styles.cart} ${cartOpened ? styles.cartVisible : ''}`}>
                <div className={styles.topContainer}>
                    <h2>Корзина</h2>
                    <button onClick={onClose}>
                        <img src="images/closeIcon.svg" alt="" />
                    </button>
                </div>
                {cartItems.length > 0 ? (
                    <>
                        <div className={styles.items}>
                            {cartItems.map((item) => {
                                return (
                                    <div key={item.title} className={styles.item}>
                                        <div className={styles.item__img}>
                                            <img src={item.imageUrl} alt="sneaker" />
                                        </div>
                                        <div className={styles.item__info}>
                                            <p>{item.title}</p>
                                            <b>{item.price.toLocaleString('ru-RU')} руб.</b>
                                        </div>
                                        <button
                                            onClick={() => handleUpdateCartItem(item)}
                                            className={styles.deleteBtn}
                                        >
                                            <svg
                                                width="10"
                                                height="10"
                                                viewBox="0 0 10 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
                                                    fill="#d3d3d3"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.bottomContainer}>
                            <ul className={styles.totalSum}>
                                <li>
                                    <span>Итого: </span>
                                    <div></div>
                                    <b>{totalPrice.toLocaleString()} руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%: </span>
                                    <div></div>
                                    <b>{tax.toLocaleString()} руб.</b>
                                </li>
                            </ul>
                            <button className={styles.checkoutButton} onClick={onClickOrder}>
                                Оформить заказ
                                <img src="images/arrow.svg" alt="arrow" />
                            </button>
                        </div>
                    </>
                ) : (
                    <Info
                        title={isOrdered ? 'Заказ оформлен!' : 'Корзина пуста'}
                        descripton={
                            isOrdered
                                ? 'Ваш заказ #18 скоро будет передан курьерской доставке'
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
                        }
                        image={isOrdered ? 'images/order-complited.png' : 'images/cart-box.png'}
                        isEmptyCartVisible={isEmptyCartVisible}
                        onClick={onClose}
                    />
                )}
            </div>
        </div>
    );
}

export default Cart;
