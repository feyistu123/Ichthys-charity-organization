// Test script to add sample volunteers to the database
const axios = require('axios');

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 30000,
});

const sampleVolunteers = [
  {
    fullName: "John Smith",
    email: "john.smith@example.com",
    phoneNumber: "+1234567890",
    location: "New York, NY",
    areaOfInterest: "Education Tutor",
    availability: "Weekday Evenings",
    description: "I have 5 years of experience tutoring high school students in math and science."
  },
  {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phoneNumber: "+1234567891",
    location: "Los Angeles, CA",
    areaOfInterest: "Health Support",
    availability: "Weekends",
    description: "Registered nurse with experience in community health programs."
  },
  {
    fullName: "Mike Davis",
    email: "mike.davis@example.com",
    phoneNumber: "+1234567892",
    location: "Chicago, IL",
    areaOfInterest: "Environment",
    availability: "Flexible",
    description: "Environmental science graduate passionate about sustainability projects."
  }
];

async function addSampleVolunteers() {
  console.log('Adding sample volunteers...');
  
  for (const volunteer of sampleVolunteers) {
    try {
      const response = await api.post('/volunteers/signup', volunteer);
      console.log(`✓ Added ${volunteer.fullName}: ${response.data.message}`);
    } catch (error) {
      console.error(`✗ Failed to add ${volunteer.fullName}:`, error.response?.data?.error || error.message);
    }
  }
  
  console.log('Done adding sample volunteers!');
}

addSampleVolunteers();