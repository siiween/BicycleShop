# BicycleShop

## Table of Contents

1. [Overview](#overview)
2. [Backend](#backend)
   - [Technology Choices](#technology-choices)
   - [Project Structure](#project-structure)
   - [Database Logic](#database-logic)
3. [Frontend](#frontend)
   - [Technology Choices](#technology-choices-1)
   - [Project Structure](#project-structure-1)
4. [Project Setup](#project-setup)
5. [Key Technical Decisions](#key-technical-decisions)
6. [Trade-offs and Constraints](#trade-offs-and-constraints)
5. [Ideas and Future Improvements](#ideas-and-future-improvements)

---

## Overview

This project is an online shop primarily dedicated to selling bicycles, with plans to expand into other product categories, such as skateboards. What makes this store unique is that customers cannot just select a product and pay for it directly. Instead, they must configure it to their liking before proceeding to checkout. 

To achieve this, we have developed a **Frontend** and a **Backend** system, both of which will be explained below.

---

## Backend

### Technology Choices

#### Why Node.js with Express and TypeScript?

When starting this project, it was clear that given the short development timeframe, I needed to make everything as efficient and error-resistant as possible. Using the same language for both the frontend and backend—JavaScript—was a logical choice. Despite being more familiar with other backend frameworks, I decided to use **Express.js** with **TypeScript**, as it adds a layer of type safety, making the codebase more robust and less prone to runtime errors.

#### Why TypeORM?

For database communication and schema management, **TypeORM** was chosen. This allowed for an abstraction of SQL logic, making it easier to focus on the application rather than database management. Moreover, **TypeORM** makes switching databases straightforward. For local development, I used **SQLite**, and for production/Docker, I chose **PostgreSQL**, which is a more robust option.

#### Handling Product Images

In production, **AWS S3** is configured for image storage. However, during local development and for Dockerized environments, I used a simple mock system that saves uploaded images to a public `uploads` folder. This avoids exposing sensitive AWS credentials and simplifies local testing.

---

### Project Structure

The backend is organized as follows:

- **`config/`**: Contains general configuration files like AWS S3 and TypeORM setup. For development, the database schema is auto-synchronized instead of using migrations, which simplifies local and testing environments.

- **`controllers/`**: Each entity has its own controller, which handles request/response logic and delegates business logic to services. To standardize responses and errors:
  - A `api-response` interface ensures consistent response structures.
  - An `error-handler` middleware ensures all errors are sent in a normalized format.

- **`database/`**:
  - **`entities/`**: Defines the database schema.
  - **`seeders/`**: Provides basic seeders to populate the database.  
    ⚠️ Note: These are manually created and may duplicate entries if run multiple times. In a real-world scenario, I would use **typeorm-seeding** and faker.js for more robust, realistic seed data.

- **`errors/`**: Contains an `HttpError` class to standardize error handling throughout the application.

- **`interfaces/`**: Centralized TypeScript interfaces for strong typing.

- **`middlewares/`**:
  - **`error-handler`**: Normalizes error responses.
  - **`upload`**: Manages file uploads using Multer, handling both S3 and local mock environments.
  - **`validate`**: Uses **express-validator** to validate incoming request data.

- **`routes/`**: API route definitions, combining validation middleware and controllers.

- **`services/`**: Business logic and database interactions are encapsulated in service classes.

- **`utils/`**: Utility functions shared across the application, including image upload logic and forbidden combination validation.

---

### Database Logic

The database consists of the following key entities and relationships:

- **Product**: A product belongs to one category and is composed of multiple parts.
- **Category**: A product category groups related products (e.g., bicycles, skateboards).
- **Part**: Represents a configurable part of a product (e.g., handlebars, wheels). A part can belong to multiple products.
- **Option**: A part has multiple options (e.g., "Red Handlebar," "Black Handlebar"). Each option belongs to a single part.
- **Dependent Prices**: Represents price dependencies where the price of an option changes based on the selection of another option.
- **Forbidden Combinations**: Represents rules that prevent certain options from being selected together.

---

## Frontend

### Technology Choices

#### Why Next.js 14 with TypeScript and Tailwind?

**TypeScript** was chosen for its type safety, improving code robustness and developer productivity. **Next.js 14** was selected over plain React for the following reasons:

1. **SEO Optimization**: Critical for an e-commerce platform.
2. **Static Site Generation (SSG)**: Faster page loads and reduced server load.
3. **Ease of Deployment**: Seamless integration with platforms like Vercel.
4. **Security**: Server components and server actions allow sensitive logic to remain server-side.
5. **Efficiency**: Features like `next/image` optimize image loading and delivery.

**TailwindCSS** was chosen for its utility-first approach, which brings the following benefits:

1. Rapid Development: Enables faster styling with a consistent and scalable design system directly in the HTML.
2. Customizability: Highly configurable to align with the specific design needs of the project.
3. Performance: Eliminates unused styles during build time, resulting in smaller CSS bundles.
4. Developer Productivity: Removes context switching between HTML and CSS files, keeping focus on the component structure.
5. Community and Ecosystem: A rich ecosystem of plugins and an active community ensure a wide range of pre-built solutions and continuous improvements.

---

### Project Structure

The frontend is structured as follows:

- **`actions/`**: Server actions for all API requests.
- **`app/`**:
  - **`/admin`**: Administrative interface for managing products, parts, and forbidden combinations.
    - **`/admin/products/:id`**: Update product details and add parts.
    - **`/admin/products/create`**: Create a new product.
    - **`/admin/parts/:id`**: Edit part details and view associated options.
    - **`/admin/parts/:id/options/create`**: Add new options to a part.
    - **`/admin/parts/:id/options/:optionId`**: Edit option, manage stock and create dependent prices
  - **`/`**: Main page showing product categories.
  - **`/configurator/:id`**: Interactive product configurator, validating user selections in real-time.

- **`hooks/`**: Custom hooks for managing features like the shopping cart.  
  ⚠️ Cart data is stored in IndexedDB for persistence but lacks a backend reservation system, which could lead to stock conflicts.

- **`lib/`**: Contains reusable utilities like API endpoints and Axios configuration.

- **`store/`**: Implements state management using **Zustand** for the product configurator.

- **`types/`**: TypeScript interfaces for frontend entities.

---

## Project Setup


### Docker Setup (Recommended)

1. Build and start the services:

    ```bash
    docker-compose up --build -d
    ```

2. Seed the database (run only once):
    
    ```bash
    docker-compose exec backend sh -c "RUN_SEED=true npm run seed"
    ```


### Monorepo Setup (Local Development)

#### Requirements
- Node.js (version 18 or higher)
- npm (version 7 or higher to support workspaces)

#### Steps

1. Create environment files for both backend and frontend:

   - **Backend (`bicycle-shop-backend/.env.local`)**:
     ```bash
     PORT=3030
     MOCK_AWS=true
     DB_TYPE=sqlite
     DB_NAME=database.sqlite
     ```

   - **Frontend (`bicycle-shop-frontend/.env.local`)**:
     ```bash
     REACT_APP_API_URL=http://localhost:3030
     ```
2. Install dependencies for the entire monorepo:
    ```bash
    npm install
    ```

3. Seed the database (optional but recommended):
   ```bash
    npm run seed --workspace=bicycle-shop-backend
    ```
4. Start both backend and frontend services in parallel:
    ```bash
    npm run dev
    ```

### Local Setup (Withour monorepo)

#### Frontend 

1. Create **.env.local**
    ```bash
    REACT_APP_API_URL=http://localhost:3030
   ``` 

2. Install dependencies:
   ```bash
   npm install
   ``` 

3. Run the development server:
    ```bash
    npm run dev
    ``` 

#### Backend 

1. Create **.env.local**
    - Image mock and SQLite (Recommended)

        ```bash
        PORT=3030
        MOCK_AWS=true
        DB_TYPE=sqlite
        DB_NAME=database.sqlite
        ``` 
    - S3 images and postgres

        ```bash
        PORT=3030
        AWS_ACCESS_KEY_ID=your_access_key
        AWS_SECRET_ACCESS_KEY=your_secret_access_key
        AWS_REGION=your_region
        AWS_BUCKET_NAME=your_bucket_name
        DB_TYPE=postgres
        DB_HOST=postgres
        DB_PORT=5432
        DB_USERNAME=postgres
        DB_PASSWORD=postgrespassword
        DB_NAME=bicycle_shop
        ```

2. Install dependencies:
   ```bash
   npm install
   ``` 
3. Seed the database (optional but recommended):
   ```bash
   npm run seed
   ``` 

4. Run the development server:
    ```bash
    npm run dev
    ``` 

---



## Key Technical Decisions

### Unified Language Across Stack
Using TypeScript for both the frontend and backend simplifies the development process, reduces context switching, and ensures type safety throughout the project.

### TypeORM for Database Management
TypeORM was chosen because:
- It abstracts complex SQL queries, allowing the focus to remain on business logic.
- It supports multiple database engines, making it easy to switch between SQLite for development and PostgreSQL for production.
- Its schema synchronization during development accelerates prototyping and testing.

### Dynamic Image Handling
- **AWS S3**: Configured for production to securely manage product images.
- **Local Storage Mock**: Used in development and Docker environments to simplify testing without requiring AWS credentials.


### State Management
- **Zustand**: Lightweight and fast state management library, suitable for the configurator's simple requirements.
- A more scalable solution like Redux could be considered for complex features or multi-user configurations in the future.

### Testing Strategy (Not Yet Implemented)
Due to time constraints, testing was not implemented as the focus was on delivering the requested features. However, a proper testing strategy would include:
- **Frontend Testing**:
  - **Cypress** for End-to-End (E2E) testing to ensure complete user workflows function as expected.
  - **React Testing Library** for unit and integration tests of individual components.
- **Backend Testing**:
  - **Jest** with **Supertest** to perform unit and integration tests for API endpoints and services.


### Dockerized Environment
- Docker Compose ensures consistency across development and testing environments.
- PostgreSQL is used for production-ready deployments, while SQLite simplifies local development.

---

## Trade-offs and Constraints

### Simplified Seeding
- **Current Approach**: Manually written seeders populate the database with test data. However, executing them multiple times causes data duplication.
- **Ideal Approach**: Use `typeorm-seeding` with Faker.js to generate realistic data dynamically and include a control mechanism to avoid re-execution.

### Lack of Data Pagination
- **Current Constraint**: No pagination for products, categories, or options, which may lead to performance issues with large datasets.
- **Future Solution**: Implement server-side pagination and filters.

### Stock Management
- **Current Constraint**: Stock is managed per option but lacks temporary reservation for items in carts.
- **Impact**: Simultaneous users can oversell limited stock.
- **Future Solution**: Implement temporary stock reservations during checkout and use server-side validation to prevent conflicts.

### Configuration Persistence
- **Current Approach**: The configurator persists data for one product using client-side storage (IndexedDB). However, it doesn’t support multiple concurrent configurations.
- **Future Solution**: Store configurations server-side with unique session IDs, allowing multi-product configurations and better recovery, so you can share or review later a configuration.

### Simplified Error Handling
- **Current Constraint**: Error responses are functional but lack detailed feedback in some cases.
- **Future Solution**: Expand error types and improve user-friendly messages on the frontend.

### Dependency Management for Option Pricing
- **Current Issue**: Pricing dependencies are limited to one-on-one relationships between options.
- **Impact**: Complex scenarios with multiple dependencies aren't handled.
- **Future Solution**: Allow multi-option dependencies similar to forbidden combinations.

### Minimal Loading UX
- **Current Approach**: Global loading states are used instead of fine-grained skeleton loaders.
- **Future Solution**: Introduce skeleton loaders for individual components to enhance user experience.

### Frontend and Backend Sync in Docker
- **Constraint**: The current Docker setup uses a dev server instead of a production build to avoid timing issues during container startup.
- **Future Improvement**: Adjust startup scripts to build the frontend after ensuring backend readiness.

### Testing (Not Yet Implemented)
- **Current Constraint**: Testing is not present in the project.
- **Impact**: Potential regressions or unnoticed bugs during development.
- **Future Solution**:
  - Use **Cypress** for comprehensive E2E testing on the frontend.
  - Use **React Testing Library** for unit and integration testing of components.
  - Use **Jest** with **Supertest** for API endpoint and service testing in the backend.


### Time Constraints on Features
- Due to time limitations:
  - Advanced image management for parts and options was skipped, focusing solely on products.
  - React Query wasn't implemented for caching API calls, which could enhance performance.

By addressing these trade-offs, the application can become more robust, scalable, and user-friendly in the future.


---


## Ideas and Future Improvements

1. Database Enhancements:
    - Separate tables for stock and pricing to manage regions or historical data.
    - Add serial numbers or unique identifiers for products, parts or options instead of autoincremental Ids.

2. Frontend Improvements:
    - Pagination for large datasets.
    - Enhanced form validation.

3. Backend Improvements:
    - Improve seeders using typeorm-seeding and faker.js for realistic data.
    - Optimize forbidden combination and dependent price calculations.

4. User Experience:
    - Add skeleton loaders for better UX during page transitions.
    - Display error and success states consistently with detailed messaging.

5. Performance:
    - Implement aggressive caching with React Query for client-side API calls.
    - Preload frequently accessed data for improved configurator performance.

6. Shopping Cart
    - Create a cart system in the backend where users only have their guestId locally, if they are not authenticated. This way we could correctly manage the stock and make temporary reservations and synchronize the cart with both the product and the real stock.