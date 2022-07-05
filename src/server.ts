import dotenv from 'dotenv';
import app from './index';
dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
