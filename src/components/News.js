import React, { useEffect, useState } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

// import PropTypes from 'prop-types'
const News = (props) => {
  const [articles, setArticles] = useState([]);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // constructor(props) {
  //   super(props);  };

  // }

  const updateNews = async () => {
    // props.setProgress(50);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pagesize=${props.pageSize}`;

    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    setArticles(parseddata.articles);
    setTotalResults(parseddata.totalResults);

    //  props.setProgress(100)
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - newsBeat`;
    updateNews();

    //  eslint-disable-next-line
  }, []);

  const fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=1&pagesize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles));
    setTotalResults(parseddata.totalResults);
    console.log(parseddata);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "80px" }}>
        newsBeat top {capitalizeFirstLetter(props.category)} headlines
      </h1>
      {/* {loading && <Spinner />} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    Title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={!element.author ? "unknown" : element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

export default News;
