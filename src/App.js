import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div id="nonfooter" class="container-fluid">
        <nav class="navbar navbar-expand-sm">
          <div>
            <a href="" class="navbar-brand">Glossi</a>
          </div>
        </nav>
      </div>
      <footer class="container-fluid">With thanks to <a href="https://dictionaryapi.dev/" class="link-primary text-decoration-none">
        the Free Dictionary API</a> and <a href="https://dictionaryapi.com/products/index" class="link-primary text-decoration-none">Merriam-Webster's Dictionary API</a>.
        <div>
          <img height="50" width="auto" src="https://dictionaryapi.com/images/info/branding-guidelines/MWLogo_LightBG_120x120_2x.png"></img>
        </div>
      </footer>
    </div>
  );
}

export default App;
