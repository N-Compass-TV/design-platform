import { Box } from "@mui/material";
import "./App.scss";
import DenseAppBar from "./common/components/DenseAppBar";
import Routing from "./pages/Routing";
import Header from "./common/layout/Header";
// import { useGetAllNewsTemplateQuery } from "./app/services/api/endpoints/newsTemplate";

const App = () => {
  // const { data } = useGetAllNewsTemplateQuery();
  return (
    <Box>
      <DenseAppBar>
        <Header />
      </DenseAppBar>
      <Routing />
    </Box>
  );
};

export default App;
