import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actionType from '../../containers/store/actions';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

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
                <button onClick = {this.props.onStoreResult}>Store Result</button>

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
        ctr : state.counter,
        storedResults : state.results
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter : () => dispatch({type : actionType.INCREMENT}),
        onDecrement : () => dispatch({type : actionType.DECREMENT}),
        onAddCounter : () => dispatch({type : actionType.ADD, val : 10}),
        onSubtractCounter : () => dispatch({type : actionType.SUBTRACT, val : 15}),
        onStoreResult: () => dispatch({type : actionType.STORE_RESULT}),
        onDeleteResult : (id) => dispatch({type : actionType.DELETE_RESULT, resultElId : id})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

