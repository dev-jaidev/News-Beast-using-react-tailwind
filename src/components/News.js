import React, {  useEffect, useState} from "react";
import PropTypes from "prop-types";
import NewsComponent from "./NewsComponent";
import CircularProgress from "@mui/material/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "./Skeleton";
import LoadingBar from "./LoadingBar";
import MultipleSelect from "./Selector";
import dayjs from "dayjs";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import utc from 'dayjs/plugin/utc';
import { IoFilterSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
dayjs.extend(utc);


function News(props) {
  const maxResults = 10;
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, sethasMore] = useState(true);
  const SkeletonCount = 15;
  const [apiStatus, setapiStatus] = useState(true);
  const [pageNumber, setpageNumber] = useState(1);
  const [progress, setprogress] = useState(0);
  const [buffer, setbuffer] = useState(0);
  const [Country, setCountry] = useState('')
  const [from, setfrom] = useState(null)
  const [to, setto] = useState(null)
  const [isFilterShowing, setIsFilterShowing] = useState(false);

  const listOfCountries= ['Australia- au',
  'Brazil- br',
  'Canada- ca',
  'China- cn',
  'Egypt- eg',
  'France- fr',
  'Germany- de',
  'Greece- gr',
  'Hong Kong- hk',
  'India- in',
  'Ireland- ie',
  'Israel- il',
  'Italy- it',
  'Japan- jp',
  'Netherlands- nl',
  'Norway- no',
  'Pakistan- pk',
  'Peru- pe',
  'Philippines- ph',
  'Portugal- pt',
  'Romania- ro',
  'Russian Federation- ru',
  'Singapore- sg',
  'Spain- es',
  'Sweden- se',
  'Switzerland- ch',
  'Taiwan- tw',
  'Ukraine- ua',
  'United Kingdom- gb',
  'United States- us']

  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);


  const updateCountry = async (newCountry) => {
    // Clear articles
    setArticles([]);
    setCountry(newCountry)
    setpageNumber(1)
    setIsLoading(true)
  };
  const updatefrom = async (value) => {
    setfrom(dayjs(value).utc().format("YYYY-MM-DDTHH:mm:ss[Z]"))
    // Clear articles
    setArticles([]);
    setpageNumber(1)
    setIsLoading(true)
  };
  const updateto = async (value) => {
    setto(dayjs(value).utc().format("YYYY-MM-DDTHH:mm:ss[Z]"))
    // Clear articles
    setArticles([]);
    setpageNumber(1)
    setIsLoading(true)
  };

  const dateFormat = (dateString) => {
    try {
      const isoDateString = dateString;
      const date = new Date(isoDateString);
  
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
  
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        timeZone: "GMT",
      };
  
      return date.toLocaleDateString("en-US", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date Formatting Error";
    }
  };
  



  const fetchNews = async () => {
    const apiUrl = `https://gnews.io/api/v4/${props.type}?category=${props.category}&lang=en&country=${Country}&max=${props.maxResults}&page=${pageNumber}&from=${from}&to=${to}&q=${props.query}&apikey=${props.apiKey}`;
    try {
      const response = await fetch(apiUrl);
      setprogress(30);
      setbuffer(40);
      const data = await response.json();
      setbuffer(50);
      setprogress(70);
      setbuffer(90);
      
      data.articles
        ? (setArticles(articles.concat(data.articles)))
        : setapiStatus(false);
      setbuffer(100);
      setprogress(100)
      if (
        Math.ceil(response.totalArticles / maxResults) <=
        Math.ceil(articles.length / maxResults)
      ) {
        sethasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setapiStatus(false);
    }
    setIsLoading(false);
  };

  const fetchMoreNews = async () => {
    setpageNumber(pageNumber + 1);
  };

  const handleFilterButton = ()=>{
setIsFilterShowing(isFilterShowing?false:true)
  }

  useEffect(() => {
    fetchNews();
  }, [pageNumber,Country,from,to]);
  


  return (
    <>
      <div className="flex items-center justify-center dark:invert">
        <h1 className="title-font text-2xl font-medium mx-auto my-5 text-black w-full text-center">
          {isLoading && <LoadingBar progress={progress} buffer={buffer} />}
         {capitalizeFirstLetter(props.category)} News
        </h1>
        <IconContext.Provider value={{ color: "", size: "1.5em" }}>
<div className={`mr-5 -ml-5 w-10 h-10 md:hidden ${isFilterShowing?'border':''} border-2px rounded-md border-black p-2`} onClick={handleFilterButton}><IoFilterSharp/></div>
      </IconContext.Provider>
      </div>

<div className={`flex items-center justify-center dark:invert flex-wrap-reverse transition-all overflow-hidden md:max-h-max ${isFilterShowing?"":'max-h-0'}`}>
<LocalizationProvider dateAdapter={AdapterDayjs}> 
<div className="flex flex-wrap [&>*]:m-3 items-center justify-center">
  <div>
<MobileDatePicker label={"Date- From"} onChange={updatefrom}/>

  </div>
  <div>
<MobileDatePicker label={"Date- to"} onChange={updateto}/>

  </div>
</div>
</LocalizationProvider>
<div>

      <MultipleSelect selectList={listOfCountries} setCountry={updateCountry}/>
</div>
</div>


      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreNews}
        hasMore={hasMore}
        loader={
          !isLoading && (
            <div className="flex items-center justify-center py-8">
              <CircularProgress />
            </div>
          )
        }
        endMessage={
          <p className="dark:text-cyan-50 my-5 text-center">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <section className="dark:text-gray-300 text-black body-font w-full overflow-x-hidden">
          <div className="container px-2 py-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {isLoading &&
                Array(SkeletonCount)
                  .fill(0)
                  .map((_, i) => <Skeleton key={i} />)}

              {apiStatus ? (
                articles.map((article, index) => (
                  <NewsComponent
                    key={index}
                    source={article.source.name}
                    heading={article.title}
                    description={article.description}
                    newsUrl={article.url}
                    imgUrl={article.image}
                    date={dateFormat(article.publishedAt)  
                  }
                  />
                ))
              ) : (
                <p className="dark:text-cyan-50 text-center my-auto w-full">
                  <b className="text-center text-lg">
                    Opps! some error occured
                  </b>
                </p>
              )}
            </div>
          </div>
        </section>
      </InfiniteScroll>
    </>
  );
}


News.defaultProps={
  type:'top-headlines',
  category: 'general',
  maxResults: '10',

}

News.propTypes={
  type: PropTypes.string,
  category: PropTypes.string,
  maxResults: PropTypes.string,
  apiKey: PropTypes.string.isRequired

}


export default News;
