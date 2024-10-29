import { createContext, useEffect, useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import axios from 'axios';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';
import styles from './App.module.css';

export const AppContext = createContext({});

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favoritesItems, setFavoritesItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const [cartItemsResponse, favoritesResponse, itemsResponse] = await Promise.all([
                    axios.get('http://localhost:3001/cart'),
                    axios.get('http://localhost:3001/favorites'),
                    axios.get('http://localhost:3001/items'),
                ]);
                setFavoritesItems(favoritesResponse.data);
                setCartItems(cartItemsResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        getData();
    }, []);

    const handleUpdateCartItem = async (cartItem) => {
        try {
            if (cartItems.some((item) => item.id === cartItem.id)) {
                axios.delete(`http://localhost:3001/cart/${cartItem.id}`);
                setCartItems((prevItems) => prevItems.filter((item) => item.id !== cartItem.id));
            } else {
                await axios.post('http://localhost:3001/cart', cartItem);
                setCartItems((prevItems) => [...prevItems, cartItem]);
            }
        } catch (error) {
            console.log('Не удалось добавить товар в корзину' + error);
        }
    };

    const handleUpdateFavoritesItem = async (favoritesItem) => {
        try {
            if (favoritesItems.some((item) => item.id === favoritesItem.id)) {
                await axios.delete(`http://localhost:3001/favorites/${favoritesItem.id}`);
                setFavoritesItems((prevItems) =>
                    prevItems.filter((item) => item.id !== favoritesItem.id)
                );
            } else {
                await axios.post('http://localhost:3001/favorites', favoritesItem);
                setFavoritesItems((prevItems) => [...prevItems, favoritesItem]);
            }
        } catch (error) {
            console.log('Не удалось добавить товар в избранное' + error);
        }
    };

    const addedToCart = (id) => {
        return cartItems.some((item) => item.id === id);
    };

    const addedToFavorites = (id) => {
        return favoritesItems.some((item) => item.id === id);
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favoritesItems,
                handleUpdateCartItem,
                handleUpdateFavoritesItem,
                addedToCart,
                addedToFavorites,
                setCartItems,
            }}
        >
            <div className={styles.app}>
                <Header onOpenCard={() => setCartOpened(true)} />
                <Cart onClose={() => setCartOpened(false)} cartOpened={cartOpened} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/orders" element={<Orders isLoading={isLoading}/>} />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
