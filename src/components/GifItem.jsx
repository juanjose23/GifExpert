export const GifItem = ({ url, title }) => {
    return <>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-lg w-full overflow-hidden bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                {/* Imagen */}
                <div className="relative h-48 w-full">
                    <img src={url} alt={title} className="h-full w-full object-cover" />
                </div>

                {/* Contenido */}
                <div className="p-5">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>

                </div>

             
              
            </div>
        </div>
    </>
};

