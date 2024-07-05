const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role');
const projectRoutes = require('./routes/project');
const companyRoutes = require('./routes/company');
// const documentRoutes = require('./routes/document');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/project', projectRoutes);
// app.use('/api/documents', documentRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Company and Project Management API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
