import React from 'react';
import { tsConstructorType } from '@babel/types';

class Textform extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            category : null,
        };
    }
    render(){
        //var category;
        return(
        <div className='catForm'>
            <h3>Tekst</h3>
            <form>
                <label>
                    Christmas
                    <input type="radio" value="chrismas" onChange={() => {this.setState({category : "christmas"})}} name="category" />
                </label>

                <label>
                    Valentine
                    <input type="radio" value="valentine" onChange={() => {this.setState({category : "valentine"})}} name="category" />
                </label>

                <label>
                    Get Well
                    <input type="radio" value="getwell" onChange={() => {this.setState({category : "getwell"})}} name="category" />
                </label>
            </form>
        </div >
        )
    }
}
export default Textform;