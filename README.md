# Grants Dashboard: Administrative Dashboard for Charity Foundations

The **Grants Dashboard** is an administrative tool designed to help charity foundations manage and acquire grants efficiently. 
The dashboard presents users with two primary views:
- **Grant Opportunities:** Displayed in a card format, showcasing available grants.
- **Historical Grants:** Displayed in a table format, allowing users to review grants they have previously marked as relevant.

The docker-compose.yaml has beckend, frontend services and besides testing and seed (add 50 items records) services.
  

## Getting Started

1. **Set Up the `.env` File**

   Create a `.env` file in the root directory of your project. This file will store your environment variables, which are essential for connecting to the PostgreSQL database.

   Here’s an example of the necessary environment variables:

   ```env
   DATABASE_HOST=db  # The name should match the Postgres service name in the docker-compose.yaml
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=password
   DATABASE_NAME=opportunities

2. **Build and Start the Application**

   To build and run the application using Docker, follow these steps:

   Open a terminal in the project directory.

   Execute the following command:

   docker-compose up --build

4. **Access the Demo Application**
   Once the application is running, you can access the demo React app by navigating to the following URL in your web browser:

    http://localhost:3001

   
   
   
