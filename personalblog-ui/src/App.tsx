import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Portfolio } from './pages/Portfolio';
import { Home } from './pages/Home';
import { CreateBlog } from './pages/CreateBlog';
import { EditBlog } from './pages/EditBlog';
import { BlogPost } from './pages/BlogPost';
import { About } from './pages/About';
import { IdeaDemo } from './pages/IdeaDemo';
import { ProjectArchive } from './pages/ProjectArchive';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blogs" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ProjectArchive />} />
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/idea/:id" element={<IdeaDemo />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute requireRole="web-admin">
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute requireRole="web-admin">
                <EditBlog />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;