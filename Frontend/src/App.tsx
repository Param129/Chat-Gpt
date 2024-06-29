import Header from "./components/Header"
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Chat from "./pages/Chat"
import { useAuth } from "./context/AuthContext"


function App() {

   return (

      <main>

        <Header/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/chat" element={<Chat/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>

   )
}

export default App
