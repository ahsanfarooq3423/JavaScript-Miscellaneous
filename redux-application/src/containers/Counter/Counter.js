import React, { Component } from 'react';
import {connect} from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';


import * as actionCreaters from '../../store/actions/actions';


class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

 

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrement}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />

                <hr/>
                <button onClick = {() =>this.props.onStoreResult(this.props.ctr)}>Store Result</button>

                <ul>
                    {this.props.storedResults.map(strResult => {
                        return(<li 
                            key = {strResult.id} 
                            onClick = {() =>this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>)
                    
                    })}
                </ul>
            
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr : state.ctr.counter,
        storedResults : state.res.results
    }
}

const mapDispatchToProps = dispatch => {
    let add_num = 10
    let subtract_num = 15
    return {
        onIncrementCounter : () => dispatch(actionCreaters.increment()),
        onDecrement : () => dispatch(actionCreaters.decrement()),
        onAddCounter : () => dispatch(actionCreaters.add(add_num)),
        onSubtractCounter : () => dispatch(actionCreaters.subtract(subtract_num)),
        onStoreResult: (result) => dispatch(actionCreaters.storeResult(result)),
        onDeleteResult : (id) => dispatch(actionCreaters.deleteResult(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

