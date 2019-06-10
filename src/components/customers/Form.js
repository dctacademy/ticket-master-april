import React from 'react' 
import { Link } from 'react-router-dom'

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile: ''
        }
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault() 
        const formData = {
            name: this.state.name, 
            mobile: this.state.mobile, 
            email: this.state.email 
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
        if(mobile.length <= 10) {
            this.setState(() => ({ mobile }))
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                    <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                </label> <br />
                <label>
                    Email
                    <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                </label> <br />
                <label>
                    Mobile
                    <input type="text" value={this.state.mobile} onChange={this.handleMobileChange.bind(this)} />
                </label> <br />
                <input type="submit" /> or <Link to="/customers">back</Link>
            </form>
        )
    }
}

export default CustomerForm