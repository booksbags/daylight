import React from 'react'
import Router from './router'
import { BrowserRouter } from 'react-router-dom'
import Starts from '@components/stars'

const App = () => {
  return (
    <BrowserRouter>
        <Router></Router>
        <Starts></Starts>
    </BrowserRouter>
  )
}

export default App
