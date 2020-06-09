import React from "react";
import { Home, Search, Auction, Info } from "./components/pages";
import { Navigation } from "./components/lib";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  app: {
    maxWidth: 1200,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    alignItems: "center",
    margin: "0 auto",
  },
});

const App = () => {
  const css = useStyles();

  return (
    <div className={css.app}>
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/searchresult/:server/:name" component={Search} />
          <Route path="/info/:server/:id" component={Info} />
          <Route path="/auction" component={Auction} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
