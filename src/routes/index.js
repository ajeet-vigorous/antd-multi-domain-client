// import React from "react";
// import {Route, Switch} from "react-router-dom";
// import Main from "./main/index";


// const App = ({match}) => (
//   <div className="gx-main-content-wrapper">
//     <Switch>
//       <Route path={`${match.url}main`} component={Main}/>
//     </Switch>
//   </div>
// );

// export default App;




import React, { useEffect } from "react";
import {Route, Switch} from "react-router-dom";
import Main from "./main/index";


const App = ({ match }) => {
  useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 123) {
        event.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gx-main-content-wrapper">
          <Switch>
            <Route path={`${match.url}main`} component={Main} />

            
          </Switch>

    </div>
  );
};

export default App;
