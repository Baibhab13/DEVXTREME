const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');
const publicPath = path.join(__dirname, '../public');
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.static(publicPath));

const routes = [
    "/", "/register", "/login", "/account", "/farmer", "/help", "/consumer",
    "/conAcc", "/confarm", "/season", "/emp", "/scheme", "/inv", "/commerce",
    "/vendor", "/rider"
];

routes.forEach(route => {
    app.get(route, (req, res) => {
        const viewName = route === "/" ? "index" : route.slice(1); // Remove leading slash
        res.render(viewName);
    });
});

app.get("/account", (req, res) => {
    res.render("account", {
        name: "Ram Lal",
        phoneNumber: "789XXXXX",
        role: "farmer"
    });
});

app.get("/conAcc", (req, res) => {
    // Fetch user data from the database or session
    const userData = {
        name: "Rajesh Kumar",
        phoneNumber: "98XXXXXXX",
        role: "consumer"
    };
    res.render("conAcc", userData);
});

app.post("/register", async (req, res) => {
    const { name, phoneNumber, password, role } = req.body;

    // Validate the role
    if (role !== "farmer" && role !== "consumer") {
        return res.status(400).send("Invalid role. Please select either 'farmer' or 'consumer'.");
    }

    const data = {
        name,
        phoneNumber,
        password,
        role
    };

    try {
        // Check if the phone number already exists
        const existingUser = await collection.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).send("Phone number already in use.");
        }

        // Insert the new user into the database
        await collection.insertMany([data]);
        res.redirect("/login");
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Registration failed. Please try again.");
    }
});

app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ phoneNumber: req.body.phoneNumber });
        if (check && check.password === req.body.password) {
            // Redirect based on role and pass user details
            if (check.role === "farmer") {
                res.render("account", {
                    name: check.name,
                    phoneNumber: check.phoneNumber,
                    role: check.role
                });
            } else if (check.role === "consumer") {
                res.render("conAcc", {
                    name: check.name,
                    phoneNumber: check.phoneNumber,
                    role: check.role
                });
            }
        } else {
            res.send("Wrong phone number or password");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.send("An error occurred during login");
    }
});

app.listen(3000, () => {
    console.log("Server connected on port 3000");
});