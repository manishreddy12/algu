import Login from './pages/Login2'
import SignUp from './pages/SignUp'
import Home from './pages/Home.jsx';
import ProblemPage from './pages/ProblemPage.jsx';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route,Navigate, Router} from "react-router-dom"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateProblem from './pages/CreateProblem.jsx';
import { Admin } from './pages/Admin.jsx';
import SubmissionTable from './pages/SubmissionTable.jsx';


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/home' element={<Home/>}></Route>
      <Route path='/createproblem' element={<CreateProblem/>}></Route>
      <Route path='/admin' element={<Admin/>}></Route>
      <Route path='/problem/:pcode' element={<ProblemPage/>}></Route>
      <Route path='/submissions' element={<SubmissionTable></SubmissionTable>}></Route>
    </Routes>
  </BrowserRouter>
)
