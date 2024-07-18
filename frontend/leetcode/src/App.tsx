
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Home from './pages/home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Otp from './pages/opt';
import Problem from './pages/problem';
import Topbar from './components/topbar';
import ProblemSingle from './pages/problemSingle';
import { RecoilRoot } from 'recoil';
import CodeEditor from './pages/codeeditor';



const App = () => {
  return (
    <RecoilRoot>
    <BrowserRouter>
      <ToastContainer />
      <Topbar/>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification/:id" element={<Otp />} />
        <Route path="/problem" element={<Problem/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/problem/:id" element={<ProblemSingle/>}/>
        <Route path="/codeexec" element={<CodeEditor/>}/>
       
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
