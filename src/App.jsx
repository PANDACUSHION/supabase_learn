import Layout from './layout/Layout.jsx'
import Home from './component/Home';
import Create from './component/Create.jsx';
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add" element={<Create />} />
            </Routes>
        </Layout>
    )
}

export default App