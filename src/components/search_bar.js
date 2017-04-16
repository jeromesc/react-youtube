import React, {Component} from 'react'; // to have react generate element

// function-based component
/*const SearchBar = () => {
  return <input /> // JSX -> React.createElement ...
};*/

// Concept
// Class-based component
// only class-based component handles States

// Concept
// Downwards data flow (top level component)
// (parent component responsible of fetching the data)

class SearchBar extends Component {
  
  // initiatizes variables and state
  constructor(props) {
    // this is how we define state, as a simple Javascript object
    super(props);

    // this will be updated on event triggering
    this.state = { term: '' };
  }

  render() {
    return (
      <div className="search-bar">
        <input 
            value={this.state.term} // Controlled component has its value set by state
            onChange={event => this.onInputChange(event.target.value)} 
        />
      </div>
      
    );
  }

  // event handler
  //onInputChange() {}} 
  onInputChange = (term) => {
    console.log(term);
    this.setState({ term });
    this.props.onSearchTermChange(term);
  }

}



export default SearchBar;