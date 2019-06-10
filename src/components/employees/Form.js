import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class EmployeeForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile: '',
            department: '', 
            departments: []
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDeptChange = this.handleDeptChange.bind(this) 
    }

    componentDidMount() {
        axios.get('http://dct-ticket-master.herokuapp.com/departments', {
            headers: {
                'x-auth' : localStorage.getItem('token') 
            }
        })
        .then(response => {
            // console.log(response.data)
            const departments = response.data 
            this.setState({ departments })
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        const formData = {
            name: this.state.name,
            mobile: this.state.mobile,
            email: this.state.email,
            department: this.state.department
        }
        this.props.handleSubmit(formData)
    }

    handleNameChange(e) {
        const name = e.target.value
        this.setState(() => ({ name }))
    }

    handleEmailChange = (e) => {
        const email = e.target.value
        this.setState(() => ({ email }))
    }

    handleMobileChange(e) {
        const mobile = e.target.value
        if (mobile.length <= 10) {
            this.setState(() => ({ mobile }))
        }
    }

    handleDeptChange(e) {
        const department = e.target.value 
        // this.setState(() => ({ department }))
        this.setState({ department })
    }

    render() {
        console.log(this.props.formTitle)
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input type="text" value={this.state.name} onChange={this.handleNameChange} />
                </label> <br />
                <label>
                    Email
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label> <br />
                <label>
                    Mobile
                    <input type="text" value={this.state.mobile} onChange={this.handleMobileChange.bind(this)} />
                </label> <br />
                <label>
                    Department 
                    <select value={this.state.department} onChange={this.handleDeptChange}>
                        <option value="">Select</option>
                        { this.state.departments.map(department => {
                            return <option value={department._id} key={department._id}>{department.name}</option> 
                        })}
                    </select>
                </label><br/>
                <input type="submit" /> or <Link to="/customers">back</Link>
            </form>
        )
    }
}

export default EmployeeForm