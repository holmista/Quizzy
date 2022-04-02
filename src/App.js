import './App.css';
import Menu from './components/menu/Menu';
import Questions from './components/questions/Questions';
import {BrowserRouter as Router, Route,} from 'react-router-dom'
import Score from './components/score/Score';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const THEME = createTheme({
  typography: {
   "fontFamily": `'Nunito', sans-serif;`
  }
});

function App() {
  return (
    <ThemeProvider theme={THEME}>
    <div className="App">
      <Router>
        <Route exact path='/'>
          <Menu/>
        </Route>
        <Route exact path = '/:category/:difficulty'>
            <Questions />
          </Route>
        <Route exact path = '/score'>
            <Score />
          </Route>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
