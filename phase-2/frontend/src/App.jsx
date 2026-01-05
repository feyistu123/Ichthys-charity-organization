import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./PublicPages/HomePage";
import AboutPage from "./PublicPages/AboutPage";
import ContactUsPage from "./PublicPages/ContactUsPage";
import GetInvolved, { DonationForm } from "./PublicPages/GetInvolved";
import ProgramsPage, {
  ActiveProjects,
  Completed,
  Projects,
} from "./PublicPages/ProgramsPage";
import EventPage from "./PublicPages/EventPage";
import BlogPage, {
  AllNews,
  EducationNews,
  EmergencyNews,
  HealthNews,
} from "./PublicPages/BlogPage";
import RegisterPage from "./PublicPages/RegisterPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashBoard from "./AdminPage/AdminDashBoard";
import CreateProject from "./components/CreateProject";
import AdminProjects from "./AdminPage/AdminProjects";
import CreateEvent from "./components/CreateEvent";
import Events from "./AdminPage/Events";
import Blogs from "./AdminPage/Blogs";
import Donation from "./AdminPage/Donation";
import Volunteer from "./AdminPage/Volunteer";
import VolunteerDashboard from "./VolunteerDashboard/VolunteerDashboard";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/donation" element={<DonationForm />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/donate" element={<DonationForm />} />
        <Route path="/accounts" element={<RegisterPage />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Signup />} />
        </Route>
        <Route path="/blogs" element={<BlogPage />}>
          <Route index element={<AllNews />} />
          <Route path="articles" element={<AllNews />} />
          <Route path="health" element={<HealthNews />} />
          <Route path="education" element={<EducationNews />} />
          <Route path="emergency" element={<EmergencyNews />} />
        </Route>
        <Route path="/programs" element={<ProgramsPage />}>
          <Route index element={<Projects />} />
          <Route path="program" element={<Projects />} />
          <Route path="complete" element={<Completed />} />
          <Route path="active" element={<ActiveProjects />} />
        </Route>
        <Route path="adminDashboard" element={<AdminDashBoard />}>
          <Route index element={<AdminProjects />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="events" element={<Events />} />
          <Route path="volunteer-approval" element={<Volunteer />} />
          <Route path="posts" element={<Blogs />} />
          <Route path="donation-management" element={<Donation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
