import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Homepage from './homepage.jsx'

const start = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/dashboard" element={<App/>} />
    </Routes>
  )
}

export default start