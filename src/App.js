import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

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
            console.log(res.data)
            this.setState({
                results: res.data,
                diabled: false
            })
        })
    }

    output(inp) {
        document.body.appendChild(document.createElement('pre')).innerHTML = inp;
    }

    syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    // var obj = {a:1, 'b':'foo', c:[false,'false',null, 'null', {d:{e:1.3e5,f:'1.3e5'}}]};

    // output(syntaxHighlight(str));



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
                        <div style={{width: '100%'}}>
                            {this.output(JSON.stringify(this.state.results, undefined, 4))}
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}
