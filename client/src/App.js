import React from 'react'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { Provider } from 'react-redux'
import ProvideApp from './ProvideApp'
import { theme } from './theme'
import { store } from './redux/store'
import RouteComponents from './containers/routes/RouteComponents'

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={ theme }>
        <CssBaseline />
          <Provider store={ store }>
            <ProvideApp>
              <RouteComponents />
            </ProvideApp>
          </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
