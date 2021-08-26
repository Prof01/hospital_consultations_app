import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from "./component/AppNavbar";
import Consultations from './component/Consultations'
import { Provider } from "react-redux";
import store from './store';
import { Container } from 'reactstrap';
import { loadOfficer } from "./actions/authActions";
import { useEffect } from 'react';
import Search from './component/Search';

function App() {
    useEffect(() => {
      store.dispatch(loadOfficer())
    })

    return (
      <Provider store={store}>
        <div className='App'>
          <AppNavbar/>
          <Container>
            <Consultations />
            <Search />
          </Container>
        </div>
      </Provider>
    )
}


export default App;
