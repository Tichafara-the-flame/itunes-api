import React from "react";
import axios from "axios";
import "../search.css";
import loader from "../loader.gif";
import PageNavigation from "./PageNavigation";
import Favorite from "./Favorite";
import { Button } from "reactstrap";

class AudioBooksPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      Results: {},
      pageLoad: false,
      message: "",
      talliedFinalResult: 0,
      NumPages: 0,
      currentPageNo: 0,
      groupFavs: []
    };
    this.cancel = "";
  }

  Counter = (addTotal, fraction) => {
    const toDivide = 0 === addTotal % fraction;
    const addValue = toDivide ? 0 : 1;
    return Math.floor(addTotal / fraction) + addValue;
  };

  componentWillMount = (pageNumberUpdate = "", query) => {
    // get an automatic page update
    let thePageNumbers = pageNumberUpdate ? `&page=${pageNumberUpdate}` : "";
    const searchUrl = `/audiobooks/${query}/${thePageNumbers}`;

    // to cancel results if user back space and types in new request
    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(searchUrl, {
        cancelToken: this.cancel.token
      })
      .then(res => {
        //   get response of addTotal results
        const addTotal = res.data.resultCount;
        const numPagesCount = this.Counter(addTotal, 20);
        const noResultFound = !res.data.results.length
          ? "There are no more search results. Please try a new search"
          : "";
        //   set state
        this.setState({
          Results: res.data.results,
          message: noResultFound,
          talliedFinalResult: addTotal,
          NumPages: numPagesCount,
          currentPageNo: pageNumberUpdate,
          pageLoad: false
        });
      })
      .catch(error => {
        if (axios.isCancel(error) || error) {
          this.setState({
            pageLoad: false,
            message: "enter something to search"
          });
        }
      });
  };

  handleOnInputChange = event => {
    const query = event.target.value;
    //if nothing on query set state to empty
    if (!query) {
      this.setState({
        query,
        Results: {},
        message: "",
        NumPages: 0,
        talliedFinalResult: 0
      });
    } else {
      this.setState({ query: query, loading: true, message: "" }, () => {
        this.componentWillMount(1, query);
      });
    }
  };

  pageClickHandler = (type, e) => {
    e.preventDefault();
    const pageNumberUpdate =
      "Prev" === type
        ? this.state.currentPageNo - 1
        : this.state.currentPageNo + 1;

    // this checks the current page
    if (!this.state.loading) {
      this.setState({ loading: true, message: "" }, () => {
        this.componentWillMount(pageNumberUpdate, this.state.query);
      });
    }
  };

  //favoritesAdd
  favoritesAdd = (index, collectionViewUrl, artistName, artworkUrl100) => {
    const {  groupFavs } = this.state;

    let item = {
      id: index,
      link: collectionViewUrl,
      title: artistName,
      img: artworkUrl100
    };

    this.setState({  groupFavs: [...groupFavs, item] });

    console.log( groupFavs);
  };

 displaySearchContent = () => {
    const { Results } = this.state;
    // set state for search results
    if (Object.keys(Results).length && Results.length) {
      return (
        <div className="results-container">
          {Results.map((result, index) => {
            return (
              <div className="result-item">
                <a key={index} href={result.collectionViewUrl}>
                  <h4 className="image-username">{result.artistName}</h4>
                  <div className="image-wraper">
                    <img
                      className="image"
                      src={result.artworkUrl100}
                      alt={result.artistName}
                    />
                  </div>
                </a>
                <div>
                  <Button
                    color="outline-success"
                    size="sm"
                    onClick={this.favoritesAdd.bind(
                      this,
                      index,
                      result.collectionViewUrl,
                      result.artistName,
                      result.artworkUrl100
                    )}
                  >
                    add-to-favourites
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    const {
      query,
      pageLoad,
      message,
      currentPageNo,
      NumPages,
      groupFavs
    } = this.state;
    //handle next and previous page
    const displayPrevious = 1 < currentPageNo;
    const displayNext = NumPages > currentPageNo;
    console.log( groupFavs);

    return (
      <div className="container">
        {/* favorite pass props */}
        <Favorite  groupFavs={ groupFavs} />

        {/* Heading*/}
        <h2 className="heading">Audio Books</h2>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
          <i className="fa fa-search search-icon" aria-hidden="true" />
        </label>

        {/* Message */}
        {message && <p className="message"> {message}</p>}

        {/*loader */}
        <img
          src={loader}
          className={`search-loading ${pageLoad ? "show" : "hide"}`}
          alt="loader"
        />

        {/* Navigation */}
        <PageNavigation
          pageLoad={pageLoad}
          displayPrevious={displayPrevious}
          displayNext={displayNext}
          PrevClickHandler={e => this.pageClickHandler("prev", e)}
          NextClickHandler={e => this.pageClickHandler("next", e)}
        />

        {/* Results */}
        {this.displaySearchContent()}

        {/* Navigation */}
        <PageNavigation
          pageLoad={pageLoad}
          displayPrevious={displayPrevious}
          displayNext={displayNext}
          PrevClickHandler={e => this.pageClickHandler("prev", e)}
          NextClickHandler={e => this.pageClickHandler("next", e)}
        />
      </div>
    );
  }
}

export default AudioBooksPage;
