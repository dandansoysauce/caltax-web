import React, { Component } from 'react';
import { Card, CardTitle, CardText, Grid, Cell } from 'react-md'
import './Result.scss'
import sssdata from '../data/sss.json'
import wholding from '../data/wholding.json'

const style = {
    wholdingCard: {
        maxWidth: 520,
        height: 200
    },
    normalCard: {
        marginTop: 20
    },
    cardText: {
        fontSize: "4rem"
    },
    normalCardText: {
        fontSize: 20
    }
};

class Result extends Component {
    render() {
        function getInfoFromBracket(bracket, annualAmount, addFixed = true) {
            let amount = 0
            const getBracket = wholding[bracket]
            if (!getBracket) {
                return 0
            }
            const deductAnnualToMin = annualAmount - getBracket.min
            const getExcessPercentage = (getBracket.percentage / 100) * deductAnnualToMin
            if (addFixed) {
                amount = getBracket.fixed + getExcessPercentage
            } else {
                amount = getExcessPercentage
            }

            return (amount / 12).toFixed(2)
        }

        function getSss(monthly) {
            const getsssData = sssdata.table
            let amount = 0
            if (monthly >= 1000) {
                getsssData.forEach(contrib => {
                    if (monthly >= contrib.min && monthly <= contrib.max) {
                        amount = contrib.value.toFixed(2)
                    } 
                })
            }

            return amount
        }

        function getWholding (salary) {
            const annualAmount = salary * 12
            let bracket = ""
            if (annualAmount <= 250000) {
                return 0
            } else if (annualAmount > 250000 && annualAmount <= 400000) {
                bracket = "one"
            } else if (annualAmount > 400000 && annualAmount <= 800000) {
                bracket = "two"
            } else if (annualAmount > 800000 && annualAmount <= 2000000) {
                bracket = "three"
            } else if (annualAmount > 2000000 && annualAmount <= 8000000) {
                bracket = "four"
            } else if (annualAmount > 8000000) {
                bracket = "five"
            }

            return getInfoFromBracket(bracket, annualAmount, true)
        }

        function getTakehome(salary, wholding, sss, philhealth, pagibig) {
            if (salary > 0) {
                return (salary - (wholding + sss + philhealth + pagibig)).toFixed(2)
            } else {
                return 0
            }
        }

        return (
            <div className="result-container">
                <div className="results">
                    <Card style={style.wholdingCard}>
                        <CardTitle title="Take-Home Pay" subtitle="Monthly" />
                        <CardText style={style.cardText}>
                            <p> &#8369; {(getTakehome(this.props.salaryToCompute, 
                                getWholding(this.props.salaryToCompute), 0, 0, 
                                this.props.pagibig))}</p>
                        </CardText>
                    </Card>
                    <h1 className="deduction-header">Deductions</h1>
                    <Grid className="cards-container">
                        <Cell className="card" size={3} tabletSize={12} phoneSize={12}>
                            <Card style={style.normalCard}>
                                <CardTitle title="Tax" subtitle="Withholding" />
                                <CardText style={style.normalCardText}>
                                    <p> &#8369; {(getWholding(this.props.salaryToCompute))}</p>
                                </CardText>
                            </Card>
                        </Cell>
                        <Cell className="card" size={3} tabletSize={12} phoneSize={12}>
                            <Card style={style.normalCard}>
                                <CardTitle title="SSS" subtitle="Contribution" />
                                <CardText style={style.normalCardText}>
                                    <p> &#8369; {getSss(this.props.salaryToCompute)}</p>
                                </CardText>
                            </Card>
                        </Cell>
                        <Cell className="card" size={3} tabletSize={12} phoneSize={12}>
                            <Card style={style.normalCard}>
                                <CardTitle title="Philhealth" subtitle="Contribution" />
                                <CardText style={style.normalCardText}>
                                    <p>&#8369; {(getWholding(this.props.salaryToCompute))}</p>
                                </CardText>
                            </Card>
                        </Cell>
                        <Cell className="card" size={3} tabletSize={12} phoneSize={12}>
                            <Card style={style.normalCard}>
                                <CardTitle title="Pag-Ibig" subtitle="Contribution" />
                                <CardText style={style.normalCardText}>
                                    <p>&#8369; {this.props.pagibig}</p>
                                </CardText>
                            </Card>
                        </Cell>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Result