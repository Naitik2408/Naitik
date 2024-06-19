import React from 'react'

function BlogCards({ image, title, content, createdAt }) {

  const date = new Date(createdAt);

  // Format the date
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short', // "Jul"
    day: '2-digit', // "26"
    year: 'numeric' // "2019"
  });
  return (

    <div>

      <div className="mb-9 gap-2 break-inside-avoid">



        <div className="flex justify-center items-center">
          <div className="w-11/12 max-w-lg">
            <article className="bg-[#3A3B3D] shadow-lg rounded-2xl overflow-hidden p-5 relative transition-transform hover:shadow-xl hover:-translate-y-1 focus-within:shadow-xl focus-within:-translate-y-1">
              <figure className="rounded-xl overflow-hidden">
                <img
                  src={image}
                  alt="An orange painted blue, cut in half laying on a blue background"
                  className="w-full"
                />
              </figure>
              <div className="mt-6 flex justify-between items-center">
                <a href="#" className="font-semibold text-xl text-gray-50 hover:text-green-500 transition-colors relative pr-4 line-clamp-2">{title}</a>
              </div>
              <div className="mt-5 border-t border-gray-400 pt-5 flex items-center flex-wrap">
                <div className="flex items-center text-gray-100 mr-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="EyeOpen" className="mr-1">
                    <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  2,465
                </div>
                <div className="flex items-center text-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar" className="mr-1">
                    <rect x="2" y="4" width="20" height="18" rx="4" />
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <path d="M2 10h20" />
                  </svg>
                  {formattedDate}
                </div>
              </div>
            </article>
          </div>
        </div>



      </div>





    </div>

  )
}

export default BlogCards
