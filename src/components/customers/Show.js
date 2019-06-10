import React from 'react' 
import axios from 'axios';
import { Link } from 'react-router-dom'

class CustomerShow extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            customer: {}
        }
        this.handleRemove = this.handleRemove.bind(this) 
    }

    componentDidMount() {
        const id = this.props.match.params.id 
        axios.get(`http://dct-ticket-master.herokuapp.com/customers/${id}`, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const customer = response.data 
                this.setState(() => ({
                    customer
                }))
            })
    }

    handleRemove() {
        const confirmRemove = window.confirm("Are you sure?")
        if(confirmRemove) {
            const id = this.props.match.params.id 
            axios.delete(`http://dct-ticket-master.herokuapp.com/customers/${id}`, {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
                .then(response => {
                    // console.log(response.data)
                    this.props.history.push('/customers')
                })
        }
    }

    render() {
        return (
            <div>
                <h3>{ this.state.customer.name }</h3>
                <p> { this.state.customer.mobile } </p> 
                <p> { this.state.customer.email } </p> 
                <Link to={`/customers/edit/${this.state.customer._id}`}>Edit</Link>
                <button onClick={this.handleRemove}> remove </button> 
            </div> 
        )
    }
}

export default CustomerShow