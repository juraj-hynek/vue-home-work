const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const http = require("http"); // Require http module for creating an HTTP server
const socketio = require("socket.io"); //
const port = 3000;

const app = express();
const server = http.createServer(app); // Create an HTTP server instance// Attach socket.io to the HTTP server

const io = new socketio.Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const dotenv = require("dotenv");
// Enable CORS for Socket.IO

// Load environment variables from .env file
dotenv.config();
const secretKey = process.env.SECRET_KEY;

const isAuthenticated = require("./isAuthnticated");
const logout = require("./handlers/logout");

const removePasswordFromUser = (data = []) => {
  return data.map((user) => {
    const u = { ...user };
    delete u.password;
    return u;
  });
};

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
const sessionMiddleWare = session({
  secret: secretKey, // Secret key used to sign the session ID cookie
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false }, // Set httpOnly to false to allow JavaScript access
});
app.use(sessionMiddleWare);
io.engine.use(sessionMiddleWare);

io.on("connection", (socket) => {
  const session = socket.request.session;
  console.log("sessionID", session.id);
});

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
];
// Logout route
app.post("/logout", isAuthenticated, logout);

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (userToFind) =>
      userToFind.username === username && userToFind.password === password
  );

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  if (!user || user?.status === "BLOCKED") {
    // If user is not found or blocked, return a 404 status with a delay
    setTimeout(() => {
      res.status(404).json({
        status: 404,
      });
    }, 2000); // Delay response by 2000ms
    return;
  }

  // If user is found and not blocked, proceed with authentication and session setup
  req.session.authenticated = true;
  req.session.user = user; // Store user data in the session
  req.session.isAdmin = user.isAdmin; // Set isAdmin flag based on user's admin status
  res.cookie("isAuthenticated", true, { httpOnly: false });
  res.cookie(req.session.user.isAdmin ? "isAdmin" : "isUser", true, {
    httpOnly: false,
  });

  // Return success response with a delay
  setTimeout(() => {
    res.status(200).json({
      user: req.session.user,
      status: 200,
    });
  }, 2000); // Delay response by 2000ms
});

app.get("/users", isAuthenticated, (req, res) => {
  const { isAdmin, user } = req.session;

  if (isAdmin) {
    // If the user is an admin, send all users' data
    res.status(200).json({
      data: removePasswordFromUser(users).filter(
        (userFind) => !userFind.isAdmin
      ),
      message: "Admin user data retrieved successfully",
      user: user,
    });
  } else {
    // If the user is not an admin, find the user by ID
    const getUser = users.find((u) => u.id === user.id);

    if (!getUser || getUser.status === "BLOCKED") {
      // If the user is not found or blocked, return a 404 Not Found response
      res.status(404).json({ message: "User not found", status: "blocked" });
    } else {
      // If the user is found and not blocked, send the user's data
      res.status(200).json({
        data: removePasswordFromUser([user]),
        message: "User data retrieved successfully",
        status: "ok",
        user: user,
      });
    }
  }
});

app.put("/users", isAuthenticated, (req, res) => {
  const body = req.body;
  const updatedUser = body;
  const user = req.session.user;
  const isAdmin = req.session.user.isAdmin;

  const index = users.findIndex((user) => user.id === updatedUser.id);

  if (index > -1) {
    setTimeout(() => {
      // Introduce delay here
      if (isAdmin) {
        users[index] = { ...users[index], ...updatedUser }; // edit any props of user
        io.emit("update", users[index] || {});
        const jsonConfig = {
          status: "ok",
          data: removePasswordFromUser(users).filter((user) => !user.isAdmin),
          user: user,
          message: "User updated",
        };
        res.status(200).json(jsonConfig);
      } else {
        // Non-admin user cannot update users, destroy session
        req.session.destroy((err) => {
          if (err) {
            console.error("Error destroying session:", err);
            res.status(500).json({
              message: "Internal Server Error",
            });
          } else {
            res.status(200).json({
              message: "Session destroyed for non-admin user",
              logout: true,
            });
          }
        });
      }
    }, 2000); // Delay response by 2000ms
  } else {
    // User not found
    res.status(404).json({
      message: "Invalid User",
      logout: true,
    });
  }
});

// app.put("/users", isAuthenticated, (req, res) => {
//   const body = req.body;
//   const updatedUser = body;
//   const user = req.session.user;
//   const isAdmin = req.session.user.isAdmin;

//   const index = users.findIndex((user) => user.id === updatedUser.id);

//   if (index > -1) {
//     if (isAdmin) {
//       users[index] = { ...users[index], ...updatedUser }; // edit any props of user
//       io.emit("update", users[index] || {});
//       const jsonConfig = {
//         status: "ok",
//         data: removePasswordFromUser(users),
//         user: user,
//         message: "User updated",
//       };
//       res.status(200).json(jsonConfig);
//     } else {
//       // non-admin user can only edit pdfImageQt
//       io.emit("update", {
//         users: [],
//         user: users[index],
//       });

//       const jsonConfig = {
//         status: "ok",
//         message: "User updated",
//         user: user,
//       };
//       res.status(200).json(jsonConfig);
//     }
//   } else {
//     res.status(404).json({
//       message: "Invalid User",
//     });
//   }
// });

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");
// const port = 3000;

// const app = express();
// const dotenv = require("dotenv");

// // Load environment variables from .env file
// dotenv.config();
// const secretKey = process.env.SECRET_KEY;

// const isAuthenticated = require("./isAuthnticated");
// const logout = require("./handlers/logout");

// const removePasswordFromUser = (data = []) => {
//   return users.map((user) => {
//     const u = { ...user };
//     delete u.password;
//     return u;
//   });
// };

// app.use(express.json()); // Enable body parsing (put)
// // app.use(cors()); // Enable CORS
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );
// app.use(cookieParser()); // Use cookie parser middleware

// // Setup session middleware
// app.use(
//   session({
//     secret: secretKey, // Secret key used to sign the session ID cookie
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, httpOnly: false }, // Set httpOnly to false to allow JavaScript access
//   })
// );

// const users = [
//   {
//     id: 1,
//     username: "John",
//     surname: "Doe",
//     status: "ACTIVE",
//     pdfImageLimit: 10,

//     isAdmin: true,
//     password: "123321",
//   },
//   {
//     id: 2,
//     username: "Jane",
//     surname: "Smith",
//     status: "ACTIVE",
//     pdfImageLimit: 15,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 3,
//     username: "Alice",
//     surname: "Johnson",
//     status: "ACTIVE",
//     pdfImageLimit: 5,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 4,
//     username: "Robert",
//     surname: "Brown",
//     status: "ACTIVE",
//     pdfImageLimit: 8,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 5,
//     username: "Emily",
//     surname: "Williams",
//     status: "ACTIVE",
//     pdfImageLimit: 12,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 6,
//     username: "Michael",
//     surname: "Jones",
//     status: "ACTIVE",
//     pdfImageLimit: 7,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 7,
//     username: "Jennifer",
//     surname: "Davis",
//     status: "ACTIVE",
//     pdfImageLimit: 6,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 8,
//     username: "William",
//     surname: "Miller",
//     status: "ACTIVE",
//     pdfImageLimit: 9,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 9,
//     username: "Sophia",
//     surname: "Taylor",
//     status: "ACTIVE",
//     pdfImageLimit: 11,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 10,
//     username: "Ethan",
//     surname: "Anderson",
//     status: "ACTIVE",
//     pdfImageLimit: 4,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 11,
//     username: "John",
//     surname: "Doe",
//     status: "ACTIVE",
//     pdfImageLimit: 10,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 12,
//     username: "Jane",
//     surname: "Smith",
//     status: "ACTIVE",
//     pdfImageLimit: 15,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 13,
//     username: "Alice",
//     surname: "Johnson",
//     status: "ACTIVE",
//     pdfImageLimit: 5,
//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 14,
//     username: "Robert",
//     surname: "Brown",
//     status: "ACTIVE",
//     pdfImageLimit: 8,
//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 15,
//     username: "Emily",
//     surname: "Williams",
//     status: "ACTIVE",
//     pdfImageLimit: 12,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 16,
//     username: "Michael",
//     surname: "Jones",
//     status: "ACTIVE",
//     pdfImageLimit: 7,
//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 17,
//     username: "Jennifer",
//     surname: "Davis",
//     status: "ACTIVE",
//     pdfImageLimit: 6,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 18,
//     username: "William",
//     surname: "Miller",
//     status: "ACTIVE",
//     pdfImageLimit: 9,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 19,
//     username: "Sophia",
//     surname: "Taylor",
//     status: "ACTIVE",
//     pdfImageLimit: 11,

//     isAdmin: false,
//     password: "123321",
//   },
//   {
//     id: 20,
//     username: "Ethan",
//     surname: "Anderson",
//     status: "ACTIVE",
//     pdfImageLimit: 4,

//     isAdmin: false,
//     password: "123321",
//   },
// ];

// // Logout route
// app.post("/logout", isAuthenticated, logout);

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   // Find the user in the array based on username and password
//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );

//   if (!user) {
//     res.status(401).json({ message: "Invalid username or password" });
//     return;
//   }

//   if (user.status === "BLOCKED") {
//     res.status(403).json({ message: "Login not allowed" });
//     return;
//   }

//   req.session.authenticated = true;
//   req.session.user = user; // Store user data in the session
//   req.session.isAdmin = user.isAdmin; // Set isAdmin flag based on user's admin status
//   res.cookie("isAuthenticated", true, { httpOnly: false });

//   if (user.isAdmin) {
//     res.cookie("isAdmin", true, { httpOnly: false });
//     res.status(200).json({
//       message: "Admin logged in",
//     });
//   } else {
//     res.cookie("isUser", true, { httpOnly: false });
//     res.status(200).json({
//       status: "ok",
//       message: "User logged in",
//     });
//   }
// });

// app.get("/users", isAuthenticated, (req, res) => {
//   const { isAdmin, user } = req.session;

//   if (isAdmin) {
//     // If the user is an admin, send all users' data
//     res.status(200).json({
//       data: removePasswordFromUser(users).filter((user) => !user.isAdmin),
//       message: "Admin user data retrieved successfully",
//       id: user.id,
//     });
//   } else {
//     // If the user is not an admin, find the user by ID
//     const getUser = users.find((u) => u.id === user.id);

//     if (!getUser || getUser.status === "BLOCKED") {
//       // If the user is not found or blocked, return a 404 Not Found response
//       res.status(404).json({ message: "User not found", status: "blocked" });
//     } else {
//       // If the user is found and not blocked, send the user's data
//       res.status(200).json({
//         data: removePasswordFromUser([user]),
//         message: "User data retrieved successfully",
//         status: "ok",
//       });
//     }
//   }
// });

// app.put("/users", isAuthenticated, (req, res) => {
//   const body = req.body;
//   const updatedUser = body;
//   const isAdmin = req.session.user.isAdmin;

//   const index = users.findIndex((user) => user.id === updatedUser.id);

//   if (index > -1) {
//     if (isAdmin) {
//       users[index] = { ...users[index], ...updatedUser }; // edit any props of user

//       res.status(200).json({
//         status: "ok",
//         data: removePasswordFromUser(users),
//         isAdmin: true,
//       });
//       //
//     } else {
//       // non admin user can only edit pdfImagWQty
//       if (updatedUser.username || updatedUser.password) {
//         users[index].username = updatedUser.username;
//         users[index].password = updatedUser.password;

//         res.status(200).json({
//           status: "ok",
//           message: "User updated username or password",
//           data: removePasswordFromUser([users[index]]),
//           isAdmin: false,
//         });
//       }
//     }
//   } else {
//     res.status(404).json({
//       message: "Invalid User",
//     });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is listening at http://localhost:${port}`);
// });
