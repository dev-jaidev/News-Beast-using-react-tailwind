import React from 'react'

function NewsComponent(props) {

  return (
    <div className="p-4 md:w-1/3 w-full">
          <div className="h-full border-2 border-gray-800 rounded-lg overflow-hidden dark:border-cyan-50 m-auto">
            <div className="lg:h-48 md:h-36 overflow-hidden">
            <img className="object-cover object-center" src={props.imgUrl} alt="blog"/>
            </div>
            <div className="p-6">
              <h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">Source: {props.source}</h2>
              <h1 className="title-font text-lg font- dark:text-white mb-3 text-black">{props.heading}</h1>
              <p className="leading-relaxed mb-3">{props.description}</p>
              <div className="flex items-center flex-wrap ">
                <a href={props.newsUrl} className="dark:text-indigo-400 inline-flex items-center md:mb-2 lg:mb-0 text-indigo-700">Read More
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span className="text-gray-500 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
{props.date}
                </span>
                
              </div>
            </div>
          </div>
        </div>
  )
}

export default NewsComponent
