import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
const Main = (props) => {
  
  return (
    <>
      <Router>
        <Header logout={props.logout}/>
        <Routes>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  );
};
export default Main;
