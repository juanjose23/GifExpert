import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

export const AddCategory = ({ onNewCategory, darkMode }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const onInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const clearInput = () => {
    setInputValue('');
    inputRef.current.focus();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim().length <= 1) return;
    onNewCategory(inputValue.trim());
    setInputValue('');
  };

  // Focus input on Ctrl+K or Command+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={onSubmit} className="relative">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${isFocused ? 'text-indigo-500 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'} h-4 w-4 transition-colors duration-200`} />
      
      <input
        ref={inputRef}
        className={`w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-700 border ${isFocused ? 'border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-100 dark:ring-indigo-900' : 'border-gray-200 dark:border-gray-600'} rounded-full text-gray-800 dark:text-gray-100 focus:outline-none transition-all duration-200`}
        type="text"
        placeholder="Buscar GIFs... (Ctrl+K)"
        value={inputValue}
        onChange={onInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {inputValue && (
        <button
          type="button"
          onClick={clearInput}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
        >
          <X size={16} />
        </button>
      )}
      
      <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center">
        {!inputValue && (
          <kbd className="hidden sm:flex h-5 items-center gap-1 rounded border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        )}
      </div>
    </form>
  );
};
