import React, { useState, useEffect } from 'react';
import { AddCategory, GifGrid, GifPagination } from "./components";
import { MoonIcon, SunIcon } from 'lucide-react';
export const GifExpertApp = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("gifCategories")
    return savedCategories ? JSON.parse(savedCategories) : ["One Punch"]
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [darkMode, setDarkMode] = useState(false)
  const itemsPerPage = 1

  // Inicializar el modo oscuro al cargar
  useEffect(() => {
    // Verificar preferencia guardada
    const savedDarkMode = localStorage.getItem("darkMode") === "true"
    // Verificar preferencia del sistema
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    // Usar preferencia guardada o del sistema
    const initialDarkMode = savedDarkMode || prefersDark
    setDarkMode(initialDarkMode)

    // Aplicar clase dark al HTML
    if (initialDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  // Persistir categorías
  useEffect(() => {
    localStorage.setItem("gifCategories", JSON.stringify(categories))
  }, [categories])

  const onAddCategory = (newCategory) => {
    if (categories.includes(newCategory)) return
    setCategories([newCategory, ...categories])
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(categories.filter((category) => category !== categoryToRemove))
    if (currentPage > Math.ceil((categories.length - 1) / itemsPerPage)) {
      setCurrentPage(Math.max(1, Math.ceil((categories.length - 1) / itemsPerPage)))
    }
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)

    // Guardar preferencia
    localStorage.setItem("darkMode", newDarkMode)

    // Aplicar o quitar clase dark
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="sticky top-0 w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 shadow-sm z-10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                <span className="text-indigo-500 dark:text-indigo-400">Gif</span>Expert
              </h1>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 sm:ml-4"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <SunIcon size={18} /> : <MoonIcon size={18} />}
              </button>
            </div>
            <div className="flex-1">
              <AddCategory onNewCategory={onAddCategory} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-2">No hay categorías</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Busca algo para comenzar</p>
          </div>
        ) : (
          <>
            {currentCategories.map((category) => (
              <GifGrid
                key={category}
                category={category}
                onRemove={() => handleRemoveCategory(category)}
                darkMode={darkMode}
              />
            ))}

            {categories.length > itemsPerPage && (
              <GifPagination
                totalPages={Math.ceil(categories.length / itemsPerPage)}
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                darkMode={darkMode}
              />
            )}
          </>
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        GifExpert App &copy; {new Date().getFullYear()}
      </footer>
    </div>
  )
}

