import React from 'react';
//Generic componet for selecting a value between 3 posible choices
//Since the module is generic
class ChoiceSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.alternative1,
        };
        this.handleChange = this.handleChange.bind(this);
        this.props.sendCategory(this.state.selectedOption);
    }

    handleChange(e) {
        //On change of the state of the radio buttons, it updates the state of the component and updated the parent component
        this.setState({
            selectedOption: e.target.value,
        });
        this.props.sendCategory(e.target.value);
    }
    
    render() {
        //Since the module is generic, it needs information about the 3 possible choices and the category text to display.
        //checked propriety is used to check the radio button that is selected. This makes it an controlled component.

        return (
            <div className='ChoiceForm'>
                <h3>{this.props.categoryName}</h3>
                <form>
                    <label>
                        {this.props.alternative1}
                        <input type="radio" checked={this.state.selectedOption === this.props.alternative1} value={this.props.alternative1} onChange={this.handleChange} name="category" />
                    </label>

                    <label>
                        {this.props.alternative2}
                        <input type="radio" checked={this.state.selectedOption === this.props.alternative2} value={this.props.alternative2} onChange={this.handleChange} name="category" />
                    </label>

                    <label>
                        {this.props.alternative3}
                        <input type="radio" checked={this.state.selectedOption === this.props.alternative3} value={this.props.alternative3} onChange={this.handleChange} name="category" />
                    </label>
                </form>
            </div >
        )
    }
}

export default ChoiceSelector;