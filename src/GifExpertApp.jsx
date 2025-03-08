import { useState } from "react";
import { AddCategory, GifGrid, GifPagination } from "./components";

export const GifExpertApp = () => {
    const [categories, setCategories] = useState(['One Punch']);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const onAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) return;
        setCategories([newCategory, ...categories]);
    };


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <div className="sticky top-0 w-full bg-white border-b border-gray-200 shadow-sm z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-16">
                        {/* Logo o título */}
                        <div className="flex-shrink-0 mr-4">
                            <span className="text-lg font-semibold text-gray-900">  GifExpertApp</span>
                        </div>

                        {/* Contenedor de búsqueda */}
                        <div className="flex-1 max-w-3xl">
                            <div className="relative">
                              

                                <AddCategory onNewCategory={onAddCategory} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>





            {currentCategories.map((category) => (
                <GifGrid key={category} category={category} />
            ))}


            <GifPagination
                totalPages={Math.ceil(categories.length / itemsPerPage)}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
};
