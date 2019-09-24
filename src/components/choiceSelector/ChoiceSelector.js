import React from 'react';
import './ChoiceSelector.css';


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

        this.setState({
            selectedOption: e.target.value,
        });
        this.props.sendCategory(e.target.value); //bug here, cannot pass this.state.selectedOption because is wrong. To fix
    }
    
    render() {

        return (
            <div className='choice-form'>
                <h3>{this.props.categoryName}</h3>
                <form>
                    <label>
                        <input type="radio" checked={this.state.selectedOption === this.props.alternative1} value={this.props.alternative1} onChange={this.handleChange} name="category" />
                        {this.props.alternative1}
                    </label>

                    <label>
                        <input type="radio" checked={this.state.selectedOption === this.props.alternative2} value={this.props.alternative2} onChange={this.handleChange} name="category" />
                        {this.props.alternative2}
                    </label>

                    <label>
                        <input type="radio" checked={this.state.selectedOption === this.props.alternative3} value={this.props.alternative3} onChange={this.handleChange} name="category" />
                        {this.props.alternative3}
                    </label>
                </form>
            </div >
        )
    }
}

export default ChoiceSelector;