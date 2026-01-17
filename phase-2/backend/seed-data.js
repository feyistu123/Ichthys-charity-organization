require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./src/models/Project');
const User = require('./src/models/User');
const bcrypt = require('bcryptjs');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Project.deleteMany({});
        await User.deleteMany({});

        // Create admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = new User({
            fullName: 'Admin User',
            email: 'admin@ichthys.org',
            password: hashedPassword,
            userType: 'Staff',
            role: 'admin',
            secretCode: 'admin123'
        });

        await adminUser.save();
        console.log('Admin user created: admin@ichthys.org / admin123');

        // Create sample projects
        const sampleProjects = [
            {
                title: 'Education Support Program',
                description: 'Providing quality education resources and scholarships to underserved communities, ensuring every child has access to learning opportunities.',
                category: 'Education',
                location: 'Addis Ababa, Ethiopia',
                goalAmount: 50000,
                raisedAmount: 35000,
                peopleImpacted: 500,
                startDate: '2024-01-15',
                endDate: '2024-12-15',
                status: 'Active'
            },
            {
                title: 'Community Health Initiative',
                description: 'Improving healthcare access and health education in rural communities through mobile clinics and health awareness programs.',
                category: 'Health',
                location: 'Bahir Dar, Ethiopia',
                goalAmount: 75000,
                raisedAmount: 45000,
                peopleImpacted: 1200,
                startDate: '2024-02-01',
                endDate: '2024-11-30',
                status: 'Active'
            },
            {
                title: 'Skills Training Workshop',
                description: 'Empowering individuals with practical skills for sustainable livelihoods and economic independence through vocational training.',
                category: 'Skills Development',
                location: 'Hawassa, Ethiopia',
                goalAmount: 30000,
                raisedAmount: 30000,
                peopleImpacted: 200,
                startDate: '2023-06-01',
                endDate: '2023-12-31',
                status: 'Completed'
            },
            {
                title: 'Clean Water Access Project',
                description: 'Installing water wells and purification systems to provide clean drinking water to remote villages.',
                category: 'Water & Sanitation',
                location: 'Mekelle, Ethiopia',
                goalAmount: 100000,
                raisedAmount: 25000,
                peopleImpacted: 800,
                startDate: '2024-03-01',
                endDate: '2025-02-28',
                status: 'Active'
            }
        ];

        await Project.insertMany(sampleProjects);
        console.log('Sample projects created successfully!');

        console.log('\n=== SETUP COMPLETE ===');
        console.log('Admin Login: admin@ichthys.org / admin123');
        console.log('4 sample projects added to database');
        console.log('You can now start the servers and login as admin');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();