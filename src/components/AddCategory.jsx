import { useState } from 'react';

export const AddCategory = ({ onNewCategory }) => {
    const [inputValue, setInputValue] = useState('');

    const onInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (inputValue.trim().length <= 1) return
        //setCategories((categories)=>[inputValue,...categories])
        setInputValue('');
        onNewCategory(inputValue.trim());
    };

    return (
        <form onSubmit={onSubmit}>
            <input                         className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all duration-200 outline-none"
                type="text"
                placeholder="Buscar GIF"
                value={inputValue}
                onChange={onInputChange}
            />
        </form>
    );
};



