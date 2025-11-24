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

-   Node.js (v14 or later)
-   npm
-   A Google Cloud Platform account with a GCS bucket and service account credentials.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd dam-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Copy the `.env.example` file to a new file named `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Edit the `.env` file with your specific configuration:
        -   `GCS_BUCKET_NAME`: Your Google Cloud Storage bucket name.
        -   `GCS_KEYFILE`: The path to your GCS service account key file (JSON).
        -   `DATABASE_URL`: The connection string for your database. Defaults to a local SQLite database.
        -   `PORT`: The port the server will run on.

4.  **Apply database migrations:**
    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The server will be running on the port specified in your `.env` file (default: 3000).

## Running with Docker

You can also run the application using Docker and Docker Compose.

1.  **Set up environment variables:**
    -   Make sure you have an `.env` file with the correct configuration (see above).

2.  **Build and run the containers:**
    ```bash
    docker-compose up -d --build
    ```

3.  **Apply database migrations:**
    -   Once the containers are running, you need to apply the database migrations.
    ```bash
    docker-compose exec app npx prisma migrate dev
    ```

The server will be running on the port specified in your `.env` file (default: 3000).

## API Endpoints

-   **`POST /assets`**: Upload a new asset.
    -   **Body (form-data):**
        -   `file`: The image or video file.
        -   `redirectUrl` (optional): The URL to redirect to on click.
        -   `startDate` (optional): The date the asset becomes available (ISO 8601 format).
        -   `endDate` (optional): The date the asset expires (ISO 8601 format).

-   **`GET /assets/:id`**: Retrieve an asset.
    -   This will redirect to the public URL of the asset if it's currently available.

-   **`POST /assets/:id/track`**: Track a click on an asset.
    -   **Body (JSON):**
        -   `userId`: The ID of the user who clicked.
        -   `metadata` (optional): Any additional JSON data to store with the click.
    -   This will redirect to the asset's `redirectUrl` if one is configured.

-   **`GET /assets/:id/stats`**: Get click statistics for an asset.
    -   Returns a JSON object with the total number of clicks.

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
