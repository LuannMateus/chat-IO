import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateRoom from './pages/CreateRoom';
import Home from './pages/Home';
import Room from './pages/Room';

const Routes = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createRoom" component={CreateRoom} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routes;
