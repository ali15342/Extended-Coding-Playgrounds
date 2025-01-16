## Project Structure

### Frontend

- Located in the `frontend` directory.
- Built using **React** with TypeScript.
- Includes linting (ESLint, Prettier) and testing (Vitest).

### Backend

- Located in the `backend` directory.
- Built with **Express.js** and TypeScript.

---

## Commands

### Frontend

Navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Format the code:
```bash
npm run format
```

Run tests:
```bash
npm run test
```

### Backend

Navigate to the `backend` directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

---

## Docker Setup

The project includes Docker support for both development and production environments.

### Development

To run the development environment with Docker:
```bash
docker-compose -f docker-compose.yml up --build
```

### Production

To run the production environment with Docker:
```bash
docker-compose -f docker-compose.prod.yml up --build
```
