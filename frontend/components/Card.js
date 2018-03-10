import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            charge: '',
            pay: '',
            name: this.props.name,
            apr: this.props.apr,
            limit: this.props.limit,
            daysOpen: this.props.daysOpen,
            balance: this.props.balance,
            interest: this.props.interest,
            message: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            interest: nextProps.interest,
            daysOpen: nextProps.daysOpen,
            balance: nextProps.balance
        });
    }

    makeCharge() {
        var self = this;
        axios.post('/api/makeCharge', {
            charge: this.state.charge,
            id: this.props.id
        })
        .then(function(response) {
            if(response.data.balance !== undefined) {
                self.setState({
                    balance: response.data.balance,
                    charge: '',
                    message: ''
                });
            } else {
                self.setState({
                    message: response.data,
                    charge: ''
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    makePay() {
        var self = this;
        axios.post('/api/makePay', {
            pay: this.state.pay,
            id: this.props.id
        })
        .then(function(response) {
            if(response.data.balance !== undefined) {
                self.setState({
                    balance: response.data.balance,
                    pay: '',
                    message: ''
                });
            } else {
                self.setState({
                    message: response.data,
                    pay: ''
                });
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    handleCharge(e) {
        this.setState({
            charge: e.target.value
        });
    }
    handlePay(e) {
        this.setState({
            pay: e.target.value
        });
    }

    render() {
        return (
          <div>
            <div>
              <img style={{height: 100}} src="https://awardwallet.com/blog/wp-content/uploads/2018/01/CardArt-ChaseSapphireReserve-Large.png"/>
            </div>
            <div>
              <div>Name: {this.state.name}</div>
              <div>APR: {this.state.apr}%</div>
              <div>Limit: ${this.state.limit}</div>
              <div>Days Open: {this.state.daysOpen}</div>
              <div>Outstanding Balance: ${this.state.balance}</div>
              <div>Current Interest: ${this.state.interest}</div>
              <div>Message: {this.state.message}</div>
              <div>
                $
                <input type="text" value={this.state.charge} onChange={(e) => this.handleCharge(e)}/>
                <button onClick={() => this.makeCharge()}>Charge</button>
              </div>
              <div>
                $
                <input type="text" value={this.state.pay} onChange={(e) => this.handlePay(e)}/>
                <button onClick={() => this.makePay()}>Pay</button>
              </div>
            </div>
          </div>
        );
    }
}

Card.propTypes = {
    name: PropTypes.string,
    apr: PropTypes.number,
    limit: PropTypes.number,
    daysOpen: PropTypes.number,
    balance: PropTypes.number,
    id: PropTypes.string,
    interest: PropTypes.number
};


export default Card;
