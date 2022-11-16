import Playbook from "./homepage/Playbook";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TestPage from "./TestPage"

function App() {
  return (
    <div className="app">
      <div className="app_body">
        {/* <Playbook/> */}
        <Router>
          <Routes>
            <Route path="/">
              <Route index element={<Playbook />} />
              <Route path="test" element={<TestPage />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </div>
  );}

export default App;
