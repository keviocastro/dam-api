# Digital Asset Management (DAM) API

This is a backend API for a Digital Asset Management system. It allows you to upload images and videos, control their distribution, and track user interactions.

## Features

-   **File Uploads**: Upload images and videos to a configurable cloud storage provider.
-   **Distribution Control**: Define a start and end date for asset availability.
-   **Click Tracking**: Record clicks on assets, including user ID and custom metadata.
-   **Redirection**: Redirect users to a specified URL after a click is tracked.
-   **Analytics**: Get basic click statistics for each asset.

## Getting Started

### Prerequisites

-   Node.js (v20 or later)
-   PostgreSQL
-   A Google Cloud Platform account with a GCS bucket and service account credentials (optional)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone git@github.com:keviocastro/dam-api.git
    cd dam
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    ```bash
    cp .env.example .env
    ```
    Edit `.env` with your PostgreSQL connection string.

4.  **Run database migrations:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```

6.  **Access the API:**
    - API: http://localhost:3000
    - Interactive API Documentation: http://localhost:3000/api-docs

## API Documentation

The API includes interactive Swagger documentation. After starting the server, visit:

**http://localhost:3000/api-docs**

The documentation provides:
- Complete API endpoint descriptions
- Request/response schemas
- Interactive testing interface
- Example requests and responses

### Available Endpoints

-   **`POST /assets`**: Upload a new asset
-   **`GET /assets/:id`**: Retrieve an asset
-   **`POST /assets/:id/track`**: Track a click on an asset
-   **`GET /assets/:id/stats`**: Get click statistics for an asset

## Project Structure

-   `src/`: The main source code directory.
    -   `controllers/`: Handles incoming API requests and sends responses.
    -   `services/`: Contains the core business logic.
        -   `storage/`: A modular service for interacting with cloud storage providers.
    -   `routes/`: Defines the API routes.
    -   `prisma/`: Contains the Prisma schema and migrations.
-   `uploads/`: A directory for local file uploads (not used in the GCS implementation).

## Contributing

This project is open source. Contributions are welcome!
