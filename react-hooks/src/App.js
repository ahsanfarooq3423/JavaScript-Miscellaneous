import React from 'react';


class App extends React.Component {

  chatThreadRef = React.createRef()

  state = {
    name : 'Ahsan Farooq',
    title : 'google autum sdf'
  }

  static getDerivedStateFromProps (props, state) {
    console.log('Get derived state called')
    return {
      name : 'Hamza Ali'
    }
  }



  componentDidMount() {
    console.log('Component did mount called')
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => this.setState({title : json.title}))
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
    if (this.state.title !== nextState.title) {
      return true;
    }
  }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log(prevProps, prevState)
  // }

  render() {
    console.log('Render called with ', this.state.title)
    return (
      <div ref = {this.chatThreadRef} >
        <h1 >{this.state.name}</h1>
    <p>{this.state.title}</p>
      </div>
    )
  }
}


export default App;
