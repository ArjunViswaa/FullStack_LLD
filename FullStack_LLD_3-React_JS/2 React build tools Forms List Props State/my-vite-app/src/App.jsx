import './App.css'
import MyComponent from './components/MyComponent';
import DisplayData from './components/DisplayData';
import ConditionalRendering from './components/ConditionalRendering';
import Button from './components/Button';

function App() {
  const fruits = ["Apple", "Banana", "Cherry"];
  const person = {
    name: "Alice",
    age: 25,
  };

  return (
    <>
      <h1>Hello React</h1>
      {/* <MyComponent />
      <MyComponent />
      <MyComponent /> */}
      {/* Using message props to set the text to be displayed in MyComponent h1 tag */}
      {/* <MyComponent message="Hello from Component 1" />
      <MyComponent message="Hello from Component 2" />
      <MyComponent message="Hello from Component 3" /> */}

      {/* Display list of array and objects handling in components */}
      {/* <DisplayData fruits={fruits} person={person} /> */}

      {/* Conditional rendering */}
      {/* <ConditionalRendering isLoggedIn={true} username={person.name}/> */}

      {/* Simple Event handling */}
      <Button />
    </>
  )
}

export default App;