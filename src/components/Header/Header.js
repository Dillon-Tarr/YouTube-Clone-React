import React, { Component } from 'react'

export default class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  
  handleSearchChange(event) {
    this.setState({searchText: event.target.value});
  }

  render() {
    return (
      <>
      <div className="row" id="title-bar">
        <div className="col-lg-3 col-sm-12 text-center">
          <h1 id="title"><img src={require('../../images/ur-tube-favicon.png')} alt="UrTube icon" id="title-icon" className="img-fluid"/>{String.fromCharCode(160)}UrTube</h1>
        </div>
        <div className="col-lg-6 col-sm-12 d-flex justify-content-center" id="search">
          <input id="searchInput" type="text" placeholder="Search" onChange={this.handleSearchChange}></input>
          <button id="searchButton" onClick={() => {this.props.searchYouTube(this.state.searchText)}}><img src={require('../../images/search-icon.png')} alt="magnifying glass" id="searchIcon"/></button>
        </div>
        <div className="col-lg-3">
        </div>
      </div>
      </>
    )
  }
}
