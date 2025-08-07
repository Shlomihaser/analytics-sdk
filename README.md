# Analytics SDK Project

A comprehensive analytics platform with a React frontend, Spring Boot backend, and Android SDK.

## 🏗️ Project Structure

```
analytics-sdk/
├── backend/           # Spring Boot REST API
├── frontend/          # React + TypeScript dashboard
└── sdk-library/       # Android SDK for analytics
```

## 📋 Prerequisites

### Required Software
1. **Java 17+** - for Spring Boot backend
2. **Node.js 18+** - for React frontend
3. **MongoDB** - database (local or cloud)
4. **Git** - version control
5. **Android Studio** (optional) - for SDK development

### Recommended Tools
- **Maven** (included with backend via mvnw)
- **npm/yarn** (comes with Node.js)
- **MongoDB Compass** - GUI for MongoDB

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd analytics-sdk
```

### 2. Database Setup

#### Option A: Local MongoDB
1. **Install MongoDB Community Edition**:
   - Windows: Download from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: Follow [official guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB**:
   ```bash
   # Windows (as service)
   net start MongoDB
   
   # macOS/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

3. **Verify MongoDB is running**:
   ```bash
   mongo --eval "db.adminCommand('ismaster')"
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `backend/src/main/resources/application.properties`

### 3. Backend Setup

```bash
cd backend

# Make mvnw executable (Linux/macOS)
chmod +x mvnw

# Build the project
./mvnw clean install

# Run the backend (will start on port 8080)
./mvnw spring-boot:run
```

**Windows users:**
```cmd
cd backend
mvnw.cmd clean install
mvnw.cmd spring-boot:run
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server (will start on port 5173)
npm run dev
```

### 5. Verify Setup

1. **Backend health check**: http://localhost:8080/api/statistics/total-events
2. **Frontend dashboard**: http://localhost:5173
3. **Database**: Check MongoDB Compass or Atlas dashboard

## ⚙️ Configuration

### Backend Configuration
File: `backend/src/main/resources/application.properties`

```properties
# MongoDB Configuration
spring.data.mongodb.uri=mongodb://localhost:27017/analytics

# Server Configuration
server.port=8080

# CORS Configuration (handled in CorsConfig.java)
```

### Frontend Configuration
File: `frontend/src/services/api.ts`

```typescript
const BASE_URL = 'http://localhost:8080'; // Update if backend runs elsewhere
```

## 🔧 Development Workflow

### Starting the Development Environment
```bash
# Terminal 1: Start MongoDB (if local)
mongod

# Terminal 2: Start Backend
cd backend && ./mvnw spring-boot:run

# Terminal 3: Start Frontend
cd frontend && npm run dev
```

### Building for Production

#### Backend
```bash
cd backend
./mvnw clean package
java -jar target/analytics-sdk-backend-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
cd frontend
npm run build
# Serve dist/ folder with your preferred web server
```

## 📊 Available Features

### Dashboard Analytics
- **Total Events**: Real-time event count
- **Total Users**: Unique user count  
- **Average Events per User**: User engagement metrics
- **User Retention Rate**: Retention analytics
- **Events by Type**: Distribution charts
- **Events by Month**: Timeline visualization
- **Top Users**: Most active users

### Export Functionality
- **CSV Export**: Comma-separated values
- **JSON Export**: JSON format
- **Excel Export**: XLSX format (configurable in settings)

### SDK Integration
The Android SDK allows you to:
- Track user events
- Send analytics data to backend
- Manage event metadata

## 🛠️ Troubleshooting

### Common Issues

#### "MongoDB connection failed"
- Ensure MongoDB is running
- Check connection string in `application.properties`
- Verify network/firewall settings

#### "Port 8080 already in use"
- Kill existing process: `lsof -ti:8080 | xargs kill`
- Or change port in `application.properties`

#### "CORS errors in browser"
- Verify `CorsConfig.java` allows your frontend URL
- Check if both frontend/backend are running

#### "npm install fails"
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

### Port Information
- **Backend**: http://localhost:8080
- **Frontend**: http://localhost:5173
- **MongoDB**: mongodb://localhost:27017

## 📝 API Endpoints

### Statistics
- `GET /api/statistics/total-events` - Total event count
- `GET /api/statistics/total-users` - Total user count
- `GET /api/statistics/average-events-per-user` - Average metrics
- `GET /api/statistics/user-retention-rate` - Retention data
- `GET /api/statistics/events-by-type` - Event type distribution
- `GET /api/statistics/events-by-month` - Monthly event data
- `GET /api/statistics/top-users` - Most active users

### Events Management
- `GET /api/events` - Get filtered events (with pagination)
- `POST /api/events` - Create new event
- `DELETE /api/events/{id}` - Delete event
- `GET /api/events/export` - Export events (CSV/JSON)

## 🏃‍♂️ Next Steps

After setup:
1. **Test the dashboard** - Navigate through all pages
2. **Create sample events** - Use the SDK or API directly
3. **Explore analytics** - Check charts and export functionality
4. **Integrate SDK** - Add to your Android project
5. **Customize settings** - Configure export formats and themes

## 🆘 Need Help?

- Check the troubleshooting section above
- Verify all prerequisites are installed
- Ensure all services are running on correct ports
- Check console logs for specific error messages

Happy coding! 🚀