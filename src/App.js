import React, { Component } from 'react';
import { Grid, Cell } from 'react-md'
import './App.scss';
import Salary from './components/Salary'
import Result from './components/Result'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      salary: 0,
      pagibig: 100
    }
  }

  salaryChange(salary) {
    this.setState({salary: salary})
  }

  pagibigChange(pagibig) {
    this.setState({pagibig: pagibig})
  }

  render() {
    return (
      <Grid noSpacing={true} gutter={0} className="Main-container">
        <Cell size={4} tabletSize={12} phoneSize={12}>
          <Salary salary={this.state.salary} pagibig={this.state.pagibig} 
            salaryChange={this.salaryChange.bind(this)} 
            pagibigChange={this.pagibigChange.bind(this)} />
        </Cell>
        <Cell size={8} tabletSize={12} phoneSize={12}>
          <Result salaryToCompute={this.state.salary} pagibig={this.state.pagibig} />
        </Cell>
      </Grid>
    );
  }
}

export default App;
