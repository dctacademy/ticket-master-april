import React from 'react'
import EmployeeForm from './Form'
import axios from 'axios'

class EmployeeNew extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(formData) {
        axios.post('http://dct-ticket-master.herokuapp.com/employees', formData, {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response.data)
                if (response.data.hasOwnProperty('errors')) {
                    alert(response.data.message)
                } else {
                    this.props.history.push('/employees')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        return (
            <div>
                <h2> Add Employee </h2>
                <EmployeeForm handleSubmit={this.handleSubmit} formTitle="adding employee" />

                
            </div>
        )
    }
}

export default EmployeeNew