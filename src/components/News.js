import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
// import PropTypes from 'prop-types'
export class News extends Component {
  static defaultProps={
    country:"in",
    pageSize:6,
    category:'general'
  }

  // static PropTypes={
  //   country:PropTypes.string,
  //   pageSize:PropTypes.number
  // }

  constructor() {
    super();
    console.log("hello i am a constructor from news component");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f0911040e8948f39582564f28bf202b&page=1&pagesize=${this.props.pageSize}`;
     

    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({ articles: parseddata.articles ,totalResults:parseddata.totalResults});
  }

  handlePreviewsClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f0911040e8948f39582564f28bf202b&page=${
      this.state.page - 1
    }&pagesize=${this.props.pageSize}`;

    let data = await fetch(url);
    let parseddata = await data.json();
       this.setState({loading:true});

    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
      loading:false
    });
  };

  handleNextClick = async () => {
    if(!(this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9f0911040e8948f39582564f28bf202b&page=${
      this.state.page + 1
    }&pagesize=${this.props.pageSize} `;
    this.setState({loading:true});
    let data = await fetch(url);
    let parseddata = await data.json();
   
    this.setState({
      page: this.state.page + 1,
      articles: parseddata.articles,
      loading:false

    });
    }
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "25px 0px"}}>newsBeat top headlines</h1>
        {this.state.loading &&<Spinner/>}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  Title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark "
            onClick={this.handlePreviewsClick}
          >
            {" "}
            &laquo; previews
          </button>
          <button disabled={this.state.page +1>Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            className="btn btn-dark "
            onClick={this.handleNextClick}
          >
            next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
