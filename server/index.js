const express = require('express');
require("dotenv").config({ path: "./config.env" });
const cors = require('cors');
const errorMiddleware=require('./middleware/errorMiddleware')
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/role');
const projectRoutes = require('./routes/project');
const companyRoutes = require('./routes/company');
const documentRoutes = require('./routes/document');
const permissionRoutes = require('./routes/permission');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/permission', permissionRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to the Company and Project Management API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
