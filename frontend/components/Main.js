import React from 'react';
import axios from 'axios';
import Card from './Card';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            apr: '',
            limit: '',
            cards: [],
        };
    }

    componentDidMount() {
        var self = this;
        axios.get('/api/cards')
        .then(function(response) {
            self.setState({cards: response.data});
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    createNewCard() {
        var self = this;
        axios.post('/api/newCard', {
            name: this.state.name,
            apr: this.state.apr,
            limit: this.state.limit,
        })
        .then(function(response) {
            self.setState({
                name: '',
                apr: '',
                limit: '',
                cards: [...self.state.cards, response.data]
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    nextDay() {
        var self = this;
        axios.post('/api/nextDay', {})
        .then(function(response) {
            self.setState({
                cards: response.data
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    handleName(e) {
        this.setState({
            name: e.target.value
        });
    }
    handleAPR(e) {
        this.setState({
            apr: e.target.value
        });
    }
    handleLimit(e) {
        this.setState({
            limit: e.target.value
        });
    }


    render() {
        return (
            <div>
              <div>
                <h3>Click to go to next Day</h3>
                <button onClick={() => this.nextDay()}>Next Day</button>
              </div>
              <div>
                <h2>Create new Credit Card</h2>
                <div>
                  Name
                  <input type="text" value={this.state.name} onChange={(e) => this.handleName(e)}/>
                </div>
                <div>
                  APR
                  <input type="text" value={this.state.apr} onChange={(e) => this.handleAPR(e)}/>
                  %
                </div>
                <div>
                  Limit: $
                  <input type="text" value={this.state.limit} onChange={(e) => this.handleLimit(e)}/>
                </div>
                <button onClick={() => this.createNewCard()}>Create new Card</button>
              </div>
              <div>
                <h2>Current Credit Cards</h2>
                {this.state.cards.map((card) => (
                  <Card name={card.name} apr={card.apr} limit={card.limit} daysOpen={card.daysOpen} balance={card.balance} id={card._id} interest={card.interest}/>
                ))}
              </div>
            </div>
        );
    }
}

export default Test;
