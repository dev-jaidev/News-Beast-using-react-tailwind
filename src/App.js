import { BrowserRouter, Routes, Route } from "react-router-dom";
import News from "./components/News";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import { useState } from "react";



function App() {

  const getRandomElement =(arr)=> {
    const randomIndex = Math.floor(Math.random() * (arr.length - 1));
    return arr[randomIndex];
  }

  const apiKeys = process.env.REACT_APP_API_KEYS.split(',');
  const apiKey = getRandomElement(apiKeys)


  const [query, setQuery] = useState('')
  const searchHandle = (newQuery)=>{
setQuery(newQuery)
  }
  return (
    <BrowserRouter>
  <Routes>
    <Route exact path="/" element={<Navbar searchHandle={searchHandle}/>}>
      <Route index element={<News apiKey={apiKey} key="news" />} />
      <Route path="world" element={<News category={"world"} apiKey={apiKey} key="world" />} />
      <Route path="nation" element={<News category={"nation"} apiKey={apiKey} key="nation" />} />
      <Route path="business" element={<News category={"business"} apiKey={apiKey} key="business" />} />
      <Route path="technology" element={<News category={"technology"} apiKey={apiKey} key="technology" />} />
      <Route path="entertainment" element={<News category={"entertainment"} apiKey={apiKey} key="entertainment" />} />
      <Route path="sports" element={<News category={"sports"} apiKey={apiKey} key="sports" />} />
      <Route path="science" element={<News category={"science"} apiKey={apiKey} key="science" />} />
      <Route path="health" element={<News category={"health"} apiKey={apiKey} key="health" />} />
      <Route path={`search/${query}`} element={<News key={query} category='' type="search" query={query} apiKey={apiKey}/>} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
