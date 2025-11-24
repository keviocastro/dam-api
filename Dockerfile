# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application's source code from your host to your image filesystem.
COPY . .

# Build the TypeScript code
RUN npm install -g typescript
RUN tsc

# Make sure the prisma client is generated
RUN npx prisma generate

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app
CMD [ "node", "dist/index.js" ]
