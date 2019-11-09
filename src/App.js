import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

export default class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            level: '',
            radius: '25',
            query: '',
            results: null
        };
    }

    makeServerCall() {
        axios.get('https://indeed-scraper-1.herokuapp.com/the-goods',{
            params: {
                query: this.state.query,
                radius: this.state.radius,
                level: this.state.level
            }
        }).then((res) => {
            console.log(res)
            this.setState({
                results: res,
                diabled: false
            })
        })
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Let's find some jobs, bruh
                    </p>
                    <div>
                        <form style={{width: '40vw', textAlign: 'center'}}>
                            <div style={{
                                width: '40vw',
                                justifyContent: 'space-between',
                                display: 'flex',
                            }}>
                                <label>Query</label>
                                <input name="query" value={this.state.query} onChange={(e) => {
                                    this.setState({query: e.target.value})
                                }}/>
                            </div>
                            <br/>
                            <div style={{
                                width: '40vw',
                                justifyContent: 'space-between',
                                display: 'flex',
                            }}>
                                <label>Level</label>
                                <select name="level" value={this.state.level} onChange={(e) => {
                                    this.setState({level: e.target.value})
                                }}>
                                    <option></option>
                                    <option>entry_level</option>
                                    <option>mid_level</option>
                                    <option>senior_level</option>
                                </select>
                            </div>
                            <br/>
                            <div style={{
                                width: '40vw',
                                justifyContent: 'space-between',
                                display: 'flex',
                            }}>
                                <label>Radius</label>
                                <input name="radius" value={this.state.radius} onChange={(e) => {
                                    this.setState({radius: e.target.value})
                                }}/>
                            </div>
                            <br/>
                            <button disabled={this.state.disabled} onClick={(e) => {
                                console.log("foo")
                                e.preventDefault()
                                this.setState({
                                    diabled: true
                                }, () => this.makeServerCall())
                            }}>
                                Gimme the data already
                            </button>
                        </form>
                        {this.state.results}
                    </div>
                </header>
            </div>
        )
    }
}
