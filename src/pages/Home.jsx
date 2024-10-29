import Card from '../components/Card/Card';
import SearchInput from '../components/SearchInput/SearchInput';
import { useContext } from 'react';
import { AppContext } from '../App';
import styles from './Home.module.css';


function Home({
    searchValue,
    setSearchValue,
    isLoading,
}) {
    
    const { items } = useContext(AppContext);

    const renderCard = () => {
        const filteredItems = items.filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
        );
        return (
            isLoading ? Array.from({ length: 12 }, (x, index) => ({ id: index })) : filteredItems
        ).map((item) => (
            <Card
                key={item.id}
                {...item}
                isLoading={isLoading}
            />
        ));
    };

    return (
        <section className={styles.content}>
            <div className={styles.titleAndSerch}>
                <h1>{searchValue ? `Поиск по запросу: ${searchValue}` : 'Все кроссовки'}</h1>
                <SearchInput
                    inputValue={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onClearValue={() => setSearchValue('')}
                />
            </div>
            <div className={styles.cards}>{renderCard()}</div>
        </section>
    );
}

export default Home;
