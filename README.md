Project Documentation
Project Name: Wine Application (wineapps)

Architecture: Model–View–Controller (MVC) Pattern

Tech Stack: Node.js, Express.js, MongoDB Atlas, Mongoose ODM, HTML5, CSS3, JavaScript (Fetch API)

1. Project Overview & Concept
The wineapps project is a web application designed for online wine management and ordering. Developed using the MVC (Model-View-Controller) architectural pattern, it separates concerns to ensure the codebase is structured, secure, and maintainable.
The application fully implements fundamental CRUD (Create, Read, Update, Delete) operations:
Create (C): Add new wine entries to inventory, register new users, and place orders.
Read (R): Browse the wine catalog, search/filter items, and verify user credentials.
Update (U): Edit wine details such as price, name, region, or rating.
Delete (D): Remove wine entries from the database.

2. Directory Structure
The project directory for wineapps is organized according to the MVC pattern:

wineapps/
│
├── config/                     # ⚙️ Configuration & Database Connection
│   └── db.js                   # MongoDB Atlas connection via Mongoose
│
├── controllers/                # 🧠 [Controller] Business Logic & Handlers
│   ├── authController.js       # User registration and login logic
│   ├── orderController.js      # Order placement and total calculation
│   └── wineController.js       # Wine CRUD logic (Fetch, Create, Update, Delete)
│
├── models/                     # 🗄️ [Model] Data Schemas (Mongoose)
│   ├── Order.js                # Order data schema
│   ├── User.js                 # User account data schema
│   └── Wine.js                 # Wine inventory data schema
│
├── public/                     # 🖥️ [View] Frontend Web Pages (HTML)
│   ├── cart.html               # Shopping cart & checkout page
│   ├── cellar.html             # Wine inventory management page (Add / Edit / Delete)
│   ├── login.html              # User login page
│   ├── signup.html             # User registration page
│   ├── store.html              # Homepage showing featured items and navigation
│   └── wines.html              # Wine catalog page with search and filter options
│
├── routes/                     # 🛣️ API Endpoints (Routers)
│   ├── authRoutes.js           # Authentication URL routes
│   ├── orderRoutes.js          # Order management URL routes
│   └── wineRoutes.js           # Wine management URL routes
│
├── node_modules/               # Installed Node.js packages/dependencies
├── package-lock.json           # Locked versions of installed packages
├── package.json                # Project manifest and dependencies list
└── server.js                   # 🚀 Application Entry Point

3. Explanation of MVC Components

3.1 Model (Data Layer)
Defines the database schemas and structure stored in MongoDB using Mongoose:
models/User.js: Stores user account credentials (fullName, email, password, dob).
models/Wine.js: Stores wine inventory details (winery, name, type, region, country, price, rating, image).
models/Order.js: Stores order item details and total price (order_details, total_price).

3.2 View (Presentation Layer)
Serves as the User Interface (UI) built with HTML, CSS, and client-side JavaScript:
public/store.html: Store landing page featuring top wines and main site links.
public/wines.html: Catalog page displaying wine products with search, filter, and add-to-cart functionality.
public/cellar.html: Admin inventory management page containing forms for adding/editing wines and a management table with Edit and Delete buttons.
public/cart.html: Shopping cart page displaying item summary, price calculation, and checkout form.
public/login.html & signup.html: Authentication pages for login and new account registration.

3.3 Controller (Business Logic Layer)
Processes incoming HTTP requests from Views, interacts with Models, and sends appropriate responses:
controllers/wineController.js:
getWines: Fetches wine lists with support for search, filtering, and sorting (Read).
createWine: Saves new wine items to the database (Create).
updateWine: Modifies wine details by specific ID (Update).
deleteWine: Removes wine entries from the database by ID (Delete).
controllers/authController.js: Validates credentials and handles user signup and login operations.
controllers/orderController.js: Calculates totals and records completed order transactions.

3.4 Routes & Configuration
config/db.js: Encapsulates MongoDB Atlas connection logic for better code modularity.
routes/: Maps request endpoints directly to corresponding Controller methods.
server.js: Initializes Express middleware, serves static files from the public/ directory, and starts the server on Port 3000.


4. API Endpoints Specification

Endpoint
HTTP Method
Controller Function
Description
CRUD Type
/api/wines
GET
wineController.getWines
Fetch all wines with search/filter capabilities
Read


/api/wines
POST
wineController.createWine
Add a new wine entry
Create


/api/wines/:id
PUT
wineController.updateWine
Update wine details by ID
Update


/api/wines/:id
DELETE
wineController.deleteWine
Delete a wine entry by ID
Delete


/api/signup
POST
authController.signup
Register a new user account
Create


/api/login
POST
authController.login
Authenticate user login
Read


/api/checkout
POST
orderController.checkout
Process payment and create order
Create

5. How to Run (Step-by-Step Guide)
Follow these steps to set up and run the wineapps project on your local machine:
Step 1: Clone the Repository
Open your terminal or command prompt and clone the project repository from GitHub:

git clone <repository-url>


Step 2: Navigate to the Project Directory
Change your active directory to the root of the project folder:

cd wineapps


Step 3: Install Project Dependencies
Install all required Node.js modules defined in package.json (such as express, mongoose, and cors):

npm install


Step 4: Configure the Database Connection
Open config/db.js in your code editor and verify your MongoDB Atlas connection string:

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/winedee?retryWrites=true&w=majority';


Step 5: Start the Application Server
Run the entry point file server.js to start the local server:

node server.js


Output on success: Connected to MongoDB Atlas successfully! and Server running on http://localhost:3000.
Step 6: Access the Web Application
Open your web browser and navigate to:

http://localhost:3000


