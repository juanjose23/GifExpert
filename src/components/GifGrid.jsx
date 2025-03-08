import { GifItem } from './GifItem';
import {useFetchGifs} from '../hooks/useFetchGifs'

export const GifGrid = ({ category }) => {
  const {images,isLoading} = useFetchGifs(category);

  return (
    <>
      <h3>{category}</h3>
      {
        isLoading && ( <h2>Cargando </h2>)
     
      }
     
      <ol>
        <div className="card-grid bg-gray-100">
          {
            images.map((image) => (
              <GifItem key={image.id}
              {...image}
               />
            ))
          }

        </div>

      </ol>


    </>
  )
}
