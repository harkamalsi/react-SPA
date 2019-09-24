import React from 'react';

class ChoiceSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: this.props.alternative1
    };
    this.handleChange = this.handleChange.bind(this);
    this.props.sendCategory(this.state.selectedOption);
  }

  handleChange(e) {
    this.setState({
      selectedOption: e.target.value
    });
    this.props.sendCategory(e.target.value); //bug here, cannot pass this.state.selectedOption because is wrong. To fix
  }

  render() {
    return (
      <div className='ChoiceForm'>
        <h3>{this.props.categoryName}</h3>
        <form>
          <label>
            {this.props.alternative1}
            <input
              type='radio'
              checked={this.state.selectedOption === this.props.alternative1}
              value={this.props.alternative1}
              onChange={this.handleChange}
              name='category'
            />
          </label>

          <label>
            {this.props.alternative2}
            <input
              type='radio'
              checked={this.state.selectedOption === this.props.alternative2}
              value={this.props.alternative2}
              onChange={this.handleChange}
              name='category'
            />
          </label>

          <label>
            {this.props.alternative3}
            <input
              type='radio'
              checked={this.state.selectedOption === this.props.alternative3}
              value={this.props.alternative3}
              onChange={this.handleChange}
              name='category'
            />
          </label>
        </form>
      </div>
    );
  }
}

export default ChoiceSelector;
