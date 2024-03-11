const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3000;

app.use(express.json()); // Enable body parsing (put)
// app.use(cors()); // Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser()); // Use cookie parser middleware

// Setup session middleware
app.use(
  session({
    secret: "secrasdadasdasasiduasd08sd09aa7s6et", // Secret key used to sign the session ID cookie
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true if using HTTPS
  })
);

const users = [
  {
    id: 1,
    username: "John",
    surname: "Doe",
    status: "ACTIVE",
    pdfImageLimit: 10,

    isAdmin: true,
    password: "123321",
  },
  {
    id: 2,
    username: "Jane",
    surname: "Smith",
    status: "ACTIVE",
    pdfImageLimit: 15,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 3,
    username: "Alice",
    surname: "Johnson",
    status: "ACTIVE",
    pdfImageLimit: 5,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 4,
    username: "Robert",
    surname: "Brown",
    status: "ACTIVE",
    pdfImageLimit: 8,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 5,
    username: "Emily",
    surname: "Williams",
    status: "ACTIVE",
    pdfImageLimit: 12,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 6,
    username: "Michael",
    surname: "Jones",
    status: "ACTIVE",
    pdfImageLimit: 7,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 7,
    username: "Jennifer",
    surname: "Davis",
    status: "ACTIVE",
    pdfImageLimit: 6,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 8,
    username: "William",
    surname: "Miller",
    status: "ACTIVE",
    pdfImageLimit: 9,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 9,
    username: "Sophia",
    surname: "Taylor",
    status: "ACTIVE",
    pdfImageLimit: 11,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 10,
    username: "Ethan",
    surname: "Anderson",
    status: "ACTIVE",
    pdfImageLimit: 4,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 11,
    username: "John",
    surname: "Doe",
    status: "ACTIVE",
    pdfImageLimit: 10,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 12,
    username: "Jane",
    surname: "Smith",
    status: "ACTIVE",
    pdfImageLimit: 15,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 13,
    username: "Alice",
    surname: "Johnson",
    status: "ACTIVE",
    pdfImageLimit: 5,
    isAdmin: false,
    password: "123321",
  },
  {
    id: 14,
    username: "Robert",
    surname: "Brown",
    status: "ACTIVE",
    pdfImageLimit: 8,
    isAdmin: false,
    password: "123321",
  },
  {
    id: 15,
    username: "Emily",
    surname: "Williams",
    status: "ACTIVE",
    pdfImageLimit: 12,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 16,
    username: "Michael",
    surname: "Jones",
    status: "ACTIVE",
    pdfImageLimit: 7,
    isAdmin: false,
    password: "123321",
  },
  {
    id: 17,
    username: "Jennifer",
    surname: "Davis",
    status: "ACTIVE",
    pdfImageLimit: 6,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 18,
    username: "William",
    surname: "Miller",
    status: "ACTIVE",
    pdfImageLimit: 9,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 19,
    username: "Sophia",
    surname: "Taylor",
    status: "ACTIVE",
    pdfImageLimit: 11,

    isAdmin: false,
    password: "123321",
  },
  {
    id: 20,
    username: "Ethan",
    surname: "Anderson",
    status: "ACTIVE",
    pdfImageLimit: 4,

    isAdmin: false,
    password: "123321",
  },
];

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.authenticated) {
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: "Unauthorized" }); // User is not authenticated, send 401 Unauthorized response
  }
};

app.get("/test", (req, res) => {
  res.cookie("name", "express", { expire: 360000 + Date.now() });
  res.json({
    data: "ahoj",
  });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    // Set session variable to mark user as authenticated
    req.session.authenticated = true;
    // Set isAdmin cookie based on user's admin status
    res.cookie("isAdmin", user.isAdmin, { httpOnly: false, path: "/" });
    res.cookie("isAuthentificated", true, { httpOnly: false, path: "/" });

    // res.cookie("isAdmin", "true", { expire: 360000 + Date.now() });
    // res.cookie("isAuthentificated", "true", { expire: 360000 + Date.now() });

    if (user.isAdmin) {
      res.status(200).json({
        user: user,
        data: users,
        message: "Login successful",
      });
    } else {
      res
        .status(200)
        .json({ user: user, data: [], message: "Login successful" });
    }
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});
// Logout route
app.post("/logout", isAuthenticated, (req, res) => {
  // Destroy session to log out user
  req.session.destroy();
  res.status(200).json({ message: "Logout successful" });
});

// Get all users (requires authentication)
app.get("/users", isAuthenticated, (req, res) => {
  res.status(200).json(users); // 200 OK
});

// Update a user by ID (requires authentication)
// app.put("/users/:id", isAuthenticated, (req, res) => {
//   const userId = parseInt(req.params.id);
//   const updatedUser = req.body;

//   const index = users.findIndex((user) => user.id === userId);
//   if (index !== -1) {
//     users[index] = { ...users[index], ...updatedUser };
//     res.status(200).json(users); // 200 OK
//   } else {
//     res.status(404).json({ message: "User not found" }); // 404 Not Found
//   }
// });

// Update a user by ID (requires authentication)
app.put("/users/:id", isAuthenticated, (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  const index = users.findIndex((user) => user.id === userId);
  if (index !== -1) {
    const currentUser = req.session.user;

    // Check if the authenticated user is the user being updated and is an admin
    if (
      currentUser.id === userId &&
      currentUser.isAdmin &&
      users[index].isAdmin
    ) {
      users[index] = { ...users[index], ...updatedUser };
      res.status(200).json(users); // 200 OK
    }
    // Check if the authenticated user is the user being updated and is not an admin
    else if (
      currentUser.id === userId &&
      !currentUser.isAdmin &&
      !users[index].isAdmin
    ) {
      // Restrict properties that can be updated if user is not an admin
      const updatedUser = {
        username: updatedUser.name,
        surname: updatedUser.surname,
        pwd: updatedUser.pwd,
      };

      users[index] = { ...users[index], ...updatedUser };
      res.status(200).json(users[index]); // 200 OK
    } else {
      res.status(403).json({ message: "Forbidden" }); // 403 Forbidden
    }
  } else {
    res.status(404).json({ message: "User not found" }); // 404 Not Found
  }
});
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
