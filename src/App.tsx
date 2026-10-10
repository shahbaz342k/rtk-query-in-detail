import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import AddPost from './components/Posts/AddPost'

import PostList from './components/Posts/PostList'
import UpdatePost from './components/Posts/UpdatePost'
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/add" element={<AddPost />} />
          <Route path="/posts/edit/:id" element={<UpdatePost />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
