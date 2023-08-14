import React from "react";
import "./App.scss";
import Home from "pages/home/home.page";
import Cursor from "shared/ui/cursor/cursor.component";

const App = () => {
  // custom cursor logic

  return (
    <>
      <Cursor />
      <Home />
    </>
  );
};

export default App;
