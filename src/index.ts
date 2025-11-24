import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import assetRoutes from './routes/asset.routes.js';
import { swaggerSpec } from './config/swagger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'DAM API Documentation',
}));

app.use('/assets', assetRoutes);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});
