const { v4: uuid } = require("uuid");
const { fakerEN: faker } = require("@faker-js/faker");
const sql = require("mssql/msnodesqlv8");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

var config = {
    connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=David\\SQLEXPRESS;Database=MPP;Trusted_Connection=yes;",
};

async function getUserByUsername(username) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM [Credentials] WHERE [username] = '${username}'`);
    await pool.close();
    return result.recordset;
}

async function getUserById(id) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM [Credentials] WHERE id = '${id}'`);
    await pool.close();
    return result.recordset;
}

async function addUser(username, password) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`INSERT INTO [Credentials]([username], [password]) VALUES ('${username}', '${password}')`);
    await pool.close();
    return result.rowsAffected;
}

const register = async (req, res) => {
    const user = req.body;
    if (!user.username || user.username == "") {
        console.error("No username was provided for the user");
        res.status(404).json("No username was provided for the user");
        return;
    }
    if (!user.password || user.password == "") {
        console.error("No password was provided for the user");
        res.status(404).json("No password was provided for the user");
        return;
    }

    const foundUsers = await getUserByUsername(user.username);
    if (foundUsers.length > 0) {
        console.error("A user with that username already exists!");
        res.status(404).json("A user with that username already exists!");
        return;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
        await addUser(user.username, hashedPassword);
    } catch (error) {
        console.error("Error while adding the magic item!", error);
        return;
    }

    await login(req, res);
};

const login = async (req, res) => {
    const user = req.body;
    if (!user.username || user.username == "") {
        console.error("No username was provided for the user");
        res.status(404).json("No username was provided for the user");
        return;
    }
    if (!user.password || user.password == "") {
        console.error("No password was provided for the user");
        res.status(404).json("No password was provided for the user");
        return;
    }

    const foundUsers = await getUserByUsername(user.username);
    const foundUser = foundUsers[0];
    if (!foundUser) {
        res.status(404).json("The username cannot be found in the database!");
        return;
    }

    const isPasswordValid = await bcrypt.compare(user.password, foundUser.password);
    if (!isPasswordValid) {
        res.status(404).json("The password is incorrect!");
        return;
    }

    const token = jwt.sign({ userId: foundUser.id }, "qoJknGP.eM9R5b1X36b[nA", { expiresIn: "1h" });
    res.send(token);
};

const getUser = async (req, res) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, "qoJknGP.eM9R5b1X36b[nA");
        const userId = decoded.userId;
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json("User not found" );
        }
        res.json(user);
    } catch (error) {
        return res.status(401).json("Invalid token");
    }
};

module.exports = {
    register,
    login,
    getUser,
};
