import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
/* lets think about what we are going to need as far as data is concerned
1 query string
2 results
3 results history
4 what the buttons are doing

*/
const guardianAPI = 'https://content.guardianapis.com/search?api-key';
const apiKey ='39f2c2f4-1238-4b1c-90aa-cd948ea90bf6&q';

class App extends Component {
constructor(props){
  //idk what the super b/s is about!


  super(props);
  this.state = {
  //  guardianAPI : 'https://content.guardianapis.com/search?api-key',
  //  apiKey : '39f2c2f4-1238-4b1c-90aa-cd948ea90bf6&q',
    searchBoxText : "",
   //I'm not sure what I should set this to....
    searchResults :[],
    searchTermHistory:[{

    }],
    searchResultHistory:[{

    }],
    currentPage : 1,
    maxPage: null,
    //add it to your store first homey!
    bookmarks : []
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleGo = this.handleGo.bind(this);
  this.next10 = this.next10.bind(this);
  this.back = this.back.bind(this);
  this.bookMarkIt = this.bookMarkIt.bind(this);
}
///wll that was friggin wierd! by just refactoring from Function(arg) in the callbacks to using => arrows...state got passed down magically!wtf mate!


 async handleGo(){
  //console.log('click happend yo!',this.state.searchBoxText);

  let url = `${guardianAPI}=${apiKey}=${this.state.searchBoxText}&page=${this.state.currentPage}`;

  const response = await fetch(url);
  const jsonResp = await response.json();
  const data = jsonResp.response;
  console.log(typeof data);
  this.setState({
    searchResults : data.results,
    maxPage: data.pages,
    currentPage: data.currentPage
  });

}

handleChange(event) {
    this.setState({searchBoxText: event.target.value});
    console.log(this.state.searchBoxText);
  }

back() {
  console.log('back is wired up!');
  if (this.state.currentPage > 1) {
      console.log('decremented!')
    this.setState((state) => {
      currentPage : state.currentPage -= 1
    }, this.handleGo);

  }
}

next10() {
  console.log('wiredup!');
  if (this.state.currentPage < this.state.maxPage){
    this.setState((state) => {
      currentPage : state.currentPage += 1
    }, this.handleGo);
  }
}

jumpTo(pageNum) {
  this.setState({
    currentPage:pageNum,
  },this.handleGo);
}

bookMarkIt(article){
  console.log("wired up!",article,this.state.bookmarks);
   this.state.bookmarks.unshift(article);

  console.log(this.state.bookmarks);
  let bookmarkAdd = this.state.bookmarks;
  this.setState({
    bookmarks : bookmarkAdd,
  })

}

 render() {
  //this is where you would want to stick the function that inserts the search results! it will be set up to fire everytime the results get reset in the state!
   const searchResults = this.state.searchResults;

   console.log('bookmarks' ,this.state.bookmarks);
   let cp = this.state.currentPage;
   const maxPage = this.state.maxPage;
   let pages = []

   if (maxPage != null) {
      for (let x = cp ;x <= maxPage && x < (cp + 10); x++ ){
        let desc = 'page ' + x;
      pages.push(
        <button className="pageButton" onClick={() => this.jumpTo(x)}>{desc}</button>)};
    } else {
      pages.push(<button className="pageButton" >no results yet </button>);
    }


   //console.log(searchResults[0].webUrl);
return (
  <div className="container">
        <div className="welcomeBanner">
          Welcome To Pauls Guardian News Site! (v.2) yeah!
        </div>
        <div className="row-holder">
          <div className="filler"></div>
            <div className="search-box">
              <i className="ion-search"></i>
              <input
              type= "text"
              className="text-box"
              id="text-box"
              placeholder="search the Guardian"
              value={this.state.searchBoxText}
              onChange={this.handleChange}
              />
              </div>
            <button
            className="go-button"
            id="go"
            onClick={this.handleGo}
            >GO!</button>
          <div className="filler"></div>
        </div>
        <div className="row-holder" id="row-holder">
          <div className="filler"></div>
            <div className="resultsBox" id="searchTerms">
             <ol id="article">
             {this.state.searchResults.map(article => {
              return (
                <li className="articleLink"><a href={article.webUrl} target="_blank">{article.webTitle}</a><button className="pageButton" onClick={() => this.bookMarkIt(article)}>Bookmark it!</button></li>
               )
             })}
             </ol>
           </div>
          <div className="filler"id="fillerEx">
            Bookmarks!
            <ul>
            {this.state.bookmarks.map(bookmark => {
             return (
               <li className="articleLink"><a href={bookmark.webUrl} target="_blank">{bookmark.webTitle}</a></li>
              )
            })}
            </ul>
          </div>
        </div>
        <div className="row-holder">
          <div className="filler"></div>
            <button
            className="go-button"
            id="backButton"
            onClick={this.back}>
              Back
            </button>
            <button
            className="go-button"
            id="next10"
            onClick={this.next10}>
              Next 10 Search Results
            </button>
          <div className="filler"></div>
        </div>
        <div className="row-holder">
          <div className="filler"></div>
            <div className="buttonRow" id="pageButtons">{pages}</div>
          <div className="filler"></div>

        </div>

      </div>
    )
    }
}

export default App;
