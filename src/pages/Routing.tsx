import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./PageNotFound";

const Routing = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path={`newstemplate/:newstemplateid`} element={<Home />} />
      
    </Routes>
  );
};

export default Routing;
