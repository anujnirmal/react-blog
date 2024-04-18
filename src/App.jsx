import { useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();


  return (
    <>
     <h1>A blog with appwrite</h1>
    </>
  )
}

export default App
