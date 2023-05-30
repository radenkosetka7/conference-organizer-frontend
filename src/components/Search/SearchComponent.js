import React, { useState } from 'react';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Ovdje možete dodati logiku za pretraživanje na temelju search terma
        console.log('Pretraži:', searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Pretraži..."
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button type="submit">Pretraži</button>
        </form>
    );
};

export default SearchComponent;
