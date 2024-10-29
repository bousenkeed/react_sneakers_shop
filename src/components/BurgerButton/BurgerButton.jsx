import styles from './BurgerButton.module.css';

function BurgerButton({ isOpen, onClick }) {

    return (
        <div className={styles.burgerContainer}>
            <div 
                className={`${styles.burger} ${isOpen ? styles.open : ''}`}
                onClick={onClick}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
}

export default BurgerButton;

// import { useState } from 'react';
// import styles from './BurgerMenu.module.css';
// import { Link } from 'react-router-dom';

// function BurgerMenu({ onOpenCard }) {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleCloseMenu = () => {
//         setIsOpen(false);
//     }

//     const handleOpenCart = () => {
//         setIsOpen(false);
//         onOpenCard()
//     }

//     return (
//         <div className={styles.burgerContainer}>
//             <div 
//                 className={`${styles.burger} ${isOpen ? styles.open : ''}`} 
//                 onClick={toggleMenu}
//             >
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//             {isOpen && (
//                 <div className={styles.menuContent}>
//                     <Link to="/" onClick={handleCloseMenu}>Главная</Link>
//                     <a onClick={handleOpenCart}>Корзина</a>
//                     <Link to="/favorites" onClick={handleCloseMenu}>Избранное</Link>
//                     <Link to="/orders" onClick={handleCloseMenu}>Мои заказы</Link>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default BurgerMenu;
