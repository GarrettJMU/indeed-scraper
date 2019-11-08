import React from 'react';
import logo from './logo.svg';
import './App.css';
import indeed from 'indeed-scraper'


export default class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      level: 'entry_level',
      radius: '25',
      query: '',
      results: [{}]
    };
  }

  makeServerCall() {
    let queryOptions = {
      host: 'www.indeed.com',
      query: this.state.query,
      city: 'San Diego, CA',
      radius: this.state.radius,
      level: this.state.level,
      jobType: 'fulltime',
      maxAge: '7',
      sort: 'date',
      limit: 100
    };

    indeed.query(queryOptions).then(res => {
      console.log(res); // An array of Job objects
    });
  }

  render() {
    return(
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Let's find some jobs, bruh
            </p>
            <div>
              <form>
                <input value={this.state.query}/>
                <input value={this.state.level}/>
                <input value={this.state.radius}/>
                <button onClick={()=>{this.makeServerCall()}}>
                  Gimme the data already
                </button>
              </form>
              {this.state.results.map((result)=>(
                  <div>
                    {result}
                  </div>
              ))}
            </div>
          </header>
        </div>
    )
  }
}
