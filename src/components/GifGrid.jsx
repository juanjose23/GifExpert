

import { useState } from "react"
import { GifItem } from "./GifItem"
import { useFetchGifs } from "../hooks/useFetchGifs"
import { X, RefreshCw } from "lucide-react"

export const GifGrid = ({ category, onRemove, darkMode }) => {
  const { images, isLoading, refresh } = useFetchGifs(category)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <div className="py-6 relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">{category}</h3>

        <div
          className={`flex gap-2 ${isHovering ? "opacity-100" : "opacity-0 sm:opacity-0"} transition-opacity duration-200`}
        >
          <button
            onClick={refresh}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
            aria-label="Refresh results"
            title="Refresh results"
          >
            <RefreshCw size={16} />
          </button>

          <button
            onClick={onRemove}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors duration-200"
            aria-label="Remove category"
            title="Remove category"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-4xl mb-3">🤔</div>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">No se encontraron GIFs</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Intenta con otra búsqueda</p>
          <button
            onClick={onRemove}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors duration-200"
          >
            Eliminar categoría
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <GifItem key={image.id} {...image} darkMode={darkMode} />
          ))}
        </div>
      )}
    </div>
  )
}

