import styles from './SearchInput.module.css';

function SearchInput({ inputValue, onChange, onClearValue }) {

    return (
        <div className={styles.search}>
            <input
                onChange={onChange}
                value={inputValue}
                type="text"
                placeholder="Поиск..."
                maxLength={60}
            />
            <img className={styles.search__check} src="images/search.svg" alt="Search" />
            {inputValue && (
                <img
                    onClick={onClearValue}
                    className={styles.search__clear}
                    src="images/closeIcon.svg"
                    alt="Close"
                />
            )}
        </div>
    );
}

export default SearchInput;
