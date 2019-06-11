import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class EmployeeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [], 
            isLoading: true 
        }
    }

    componentDidMount() {
        axios.get('http://dct-ticket-master.herokuapp.com/employees', {
            headers: {
                'x-auth': localStorage.getItem('token')
            }
        })
            .then(response => {
                const employees = response.data
                console.log(employees)
                this.setState(() => ({ employees, isLoading: false  }))
            })
    }
    render() {
        return (
            <div>
                <h2>Listing Employees</h2>
                { this.state.isLoading ? ( <p> loading... </p> ) : (
                        this.state.employees.length === 0 ? (
                            <p> No employee found. Add your first employee </p>
                        ) : (
                                <ul>
                                    {this.state.employees.map(employee => {
                                        return <li key={employee._id}>{employee.name} - {employee.department.name} </li>
                                    })}
                                </ul>
                            )
                )}
               

                <Link to="/employees/new">Add Employee</Link>
            </div>
        )
    }
}

export default EmployeeList