import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import TC from './pages/TC';
import AboutUs from './pages/AboutUs';
import Layout from './components/Layout';
import Blogs from './pages/Blogs';
import Careers from './pages/Careers';
import Dashboard from './pages/Admin/Dashboard';
import BlogAdmin from './pages/Admin/BlogAdmin';
import Customize from './pages/Admin/Customize';
import Analytics from './pages/Admin/Analytics';
import BlogDetailed from './components/BlogDetailed';
import ForgotPassword from './pages/ForgotPassword';
import ReligionChart from './pages/Admin/Analytics/ReligionChart';
import CityChart from './pages/Admin/Analytics/CityChart';
import AgeGenderChart from './pages/Admin/Analytics/AgeGenderChart';

function App() {
  return (
    <div style={{ height: "100dvh" }}>
      <Routes>
        <Route path="/signin-signup" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms-conditions" element={<TC />} />
        <Route path="/" element={<Navigate to="/home" />} />

        <Route path="/home" element={<Layout> <Home /> </Layout>} />
        <Route path="/about-us" element={<Layout> <AboutUs /> </Layout>} />
        <Route path="/blogs" element={<Layout> <BlogAdmin /> </Layout>} />
        <Route path="/careers" element={<Layout> <Careers /> </Layout>} />
        <Route path="/allblogs" element={<Layout><Blogs/></Layout>}/>
        <Route path="/dashboard" element={<Layout> <Dashboard /> </Layout>} />
        <Route path='/dashboard/blogs' element={<Layout><BlogAdmin /></Layout>} />
        <Route path='/blog/:blogid' element={<Layout><BlogDetailed /></Layout>} />
        <Route path='/dashboard/customise' element={<Layout><Customize /></Layout>} />
        <Route path='/dashboard/analytics' element={<Layout><Analytics /></Layout>} />
        <Route path='/dashboard/analytics/religionChart' element={<Layout><ReligionChart/></Layout>} />
        <Route path='/dashboard/analytics/cityChart' element={<Layout><CityChart/></Layout>} />
        <Route path='/dashboard/analytics/ageGenderChart' element={<Layout><AgeGenderChart/></Layout>} />
      </Routes>
    </div>
  );
}

export default App;
