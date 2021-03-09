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
    getUrls()
    .then(data => {
      this.setState({urls: data.urls, isFetching: false})
    }).catch(error => {
      console.log('Error:', error)
      this.setState({isFetching: false, error: true})
    })
  }
  
  addUrl = (newUrl) => {
    this.setState({urls: [...this.state.urls, newUrl]})
    postUrl(newUrl.urlToShorten, newUrl.title)
    this.render()
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>URL Shortener</h1>
          <UrlForm addUrl={this.addUrl}/>
        </header>
        {this.state.isFetching && <h2>Getting URLs</h2>}
        <UrlContainer urls={this.state.urls}/>
      </main>
    );
  }
}

export default App;
