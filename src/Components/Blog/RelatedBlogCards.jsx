import React from 'react'

function RelatedBlogCards({ image, title }) {
  return (

    <div>

      <div className="mb-9 break-inside-avoid">



        <div className="w-80">
          <div className="w-11/12 max-w-lg">
            <article className="bg-[#3A3B3D] shadow-lg rounded-2xl overflow-hidden p-5 relative transition-transform hover:shadow-xl hover:-translate-y-1 focus-within:shadow-xl focus-within:-translate-y-1">
              <figure className="w-full h-36 rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt="An orange painted blue, cut in half laying on a blue background"
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="mt-6 flex justify-between items-center">
                <a href="#" className="font-semibold text-xl text-gray-50 hover:text-green-500 transition-colors relative pr-4 line-clamp-1">{title}</a>
              </div>
            </article>
          </div>
        </div>



      </div>





    </div>

  )
}

export default RelatedBlogCards
