import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DAM API',
      version: '1.0.0',
      description: 'Digital Asset Management API - Upload, manage and track digital assets',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Asset: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier',
            },
            filename: {
              type: 'string',
              description: 'Original filename',
            },
            mimetype: {
              type: 'string',
              description: 'File MIME type',
            },
            size: {
              type: 'integer',
              description: 'File size in bytes',
            },
            storagePath: {
              type: 'string',
              description: 'Storage path in GCS',
            },
            publicUrl: {
              type: 'string',
              description: 'Public URL to access the asset',
            },
            redirectUrl: {
              type: 'string',
              example: 'https://google.com',
              nullable: true,
              description: 'Optional redirect URL',
            },
            ruleId: {
              type: 'string',
              nullable: true,
              description: 'Distribution rule ID',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Click: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier',
            },
            assetId: {
              type: 'string',
              description: 'Associated asset ID',
            },
            userId: {
              type: 'string',
              description: 'User who clicked',
            },
            metadata: {
              type: 'object',
              nullable: true,
              description: 'Additional metadata as JSON object',
            },
            clickedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Click timestamp',
            },
          },
        },
        DistributionRule: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Unique identifier',
            },
            name: {
              type: 'string',
              description: 'Rule name',
            },
            type: {
              type: 'string',
              enum: ['DATE_RANGE', 'LOCATION', 'DEVICE'],
              description: 'Rule type',
            },
            config: {
              type: 'string',
              description: 'Rule configuration as JSON string',
            },
            isActive: {
              type: 'boolean',
              description: 'Whether the rule is active',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);

