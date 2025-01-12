import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bearRoutes from './routes/bearRoutes';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/api', bearRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
