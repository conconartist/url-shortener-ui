import React, { Component } from 'react';
import './App.css';
import { getUrls, postUrl } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetching: false,
      error: false, 
      urls: []
    }
  }

  componentDidMount() {
    this.setState({isFetching: true})
    return getUrls()
    .then(data => {
      this.setState({urls: data.urls, isFetching: false})
    }).catch(error => {
      console.log(error)
      this.setState({isFetching: false, error: true})
    })
  }
  
  addUrl = (newUrl) => {
    this.setState({urls: [...this.state.urls, newUrl]})
    postUrl(newUrl.urlToShorten, newUrl.title)
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
