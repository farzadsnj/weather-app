import './App.css';
import Search from './components/search/Search'

function App() {

  const hanleOnSearchChange = (searchData) =>{
    console.log(searchData)
  }

  return (
    <div className="container">
      <Search onSearchChange={hanleOnSearchChange}/>
    </div>
  );
}

export default App;
