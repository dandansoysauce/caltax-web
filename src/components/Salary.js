import React, { Component } from 'react'
import { Paper, TextField } from 'react-md'
import './Salary.scss'

class Salary extends Component {
    constructor(props) {
        super(props)

        this.salaryTextChange = this.salaryTextChange.bind(this)
        this.pagibigTextChange = this.pagibigTextChange.bind(this)
    }

    salaryTextChange(e) {
        this.props.salaryChange(e)
    }

    pagibigTextChange(e) {
        this.props.pagibigChange(e)
    }

    render() {
        return (
            <div className="salary-container">
                <h1>Tax Calculator</h1>
                <Paper className="input-container" zDepth={2}>
                    <TextField
                        id="basic-salary"
                        inputClassName="input-salary"
                        type="number"
                        min={0}
                        label="Monthly Gross Salary"
                        placeholder="Amount"
                        helpOnFocus
                        helpText="Gross Salary is the money you've made before any deductions."
                        defaultValue={this.props.salary}
                        onChange={this.salaryTextChange}
                    />
                </Paper>

                <div className="train-info">
                    <h3>TRAIN</h3>
                    <p><b>Republic Act No. 10963 or Tax Reform for Acceleration and Inclusion (TRAIN)</b> addresses several weaknesses of the current tax system by lowering and simplifying personal income taxes, simplifying estate and donor’s taxes, expanding the value-added tax (VAT) base, adjusting oil and automobile excise taxes, and introducing excise tax on sugar-sweetened beverages. </p>
                    <p className="md-caption">source: www.dof.gov.ph/taxreform/</p>
                </div>
            </div>
        )
    }
}

export default Salary