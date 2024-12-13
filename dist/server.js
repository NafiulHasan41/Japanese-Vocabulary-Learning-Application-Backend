"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const lessonRoutes_1 = __importDefault(require("./routes/lessonRoutes"));
const vocabularyRoutes_1 = __importDefault(require("./routes/vocabularyRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
const corsOptions = {
    origin: ['http://localhost:3000', 'https://japanese-vocabulary-learning-application-frontend.vercel.app'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
// Database Connection
(0, db_1.default)();
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use("/api/lessons", lessonRoutes_1.default);
app.use("/api/vocabularies", vocabularyRoutes_1.default);
app.use("/api/users", userRoutes_1.default);
// Default Route
app.get('/', (req, res) => {
    res.send('API is running... checking');
});
// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
