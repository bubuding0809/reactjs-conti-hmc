import "./App.css";
import { Box, Container } from "@mui/system";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
    return (
        <Container maxWidth="xl">
            <Header />
            <Main />
        </Container>
    );
}

export default App;
