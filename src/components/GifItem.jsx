
import { useState } from "react"
import { ExternalLink, Copy, Check } from "lucide-react"

export const GifItem = ({ url, title, darkMode }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      className={`group w-full overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-600 border-t-indigo-500 dark:border-t-indigo-400 rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={url || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        <div
          className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-2 ${isHovering ? "opacity-100" : "opacity-0"}`}
        >
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </a>

          <button
            onClick={copyToClipboard}
            className="p-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            title="Copy URL"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="p-3">
        <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate transition-colors duration-300">
          {title || "Sin título"}
        </h2>
      </div>
    </div>
  )
}

