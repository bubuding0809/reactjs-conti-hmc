import "./App.css";
import { Container } from "@mui/system";
import { SnackbarProvider } from "notistack";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <Container maxWidth="xl">
        <Header />
        <Main />
      </Container>
    </SnackbarProvider>
  );
}

export default App;
