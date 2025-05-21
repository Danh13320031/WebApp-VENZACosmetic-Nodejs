# Base node
FROM node:latest

# Set the working container directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
EXPOSE 5000:5000

# Start the application
CMD ["npm", "start"]