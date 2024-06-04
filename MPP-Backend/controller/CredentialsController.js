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

async function addUserAsync(username, password, role) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`INSERT INTO [Credentials]([username], [password], [role]) VALUES ('${username}', '${password}', ${role})`);
    await pool.close();
    return result.rowsAffected;
}

const createUser = async (req, res) => {
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
    if (user.role != 'user' && user.role != 'manager' && user.role != 'admin') {
        console.error("The role provided is invalid!");
        res.status(404).json("The role provided is invalid!");
        return;
    }

    try {
        var roleId = 0;
        if (user.role == 'manager') roleId = 1;
        else if (user.role == 'admin') roleId = 2;

        await addUserAsync(user.username, user.password, Number(roleId));
    } catch (error) {
        console.error('Error retrieving userrs', error);
        return;
    }
    res.send(user);
}

async function userNotExists(id) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`SELECT * FROM [Credentials] WHERE id = '${id}'`);
    await pool.close();
    return result.recordset.length == 0;
}

async function editUserAsync(id, username, role, description) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`UPDATE [Credentials] SET username = '${username}', role = ${role}, description = '${description}' WHERE [id] = '${id}'`);
    await pool.close();
    return result.rowsAffected;
}

const editUser = async (req, res) => {
    const user = req.body;
    if (!user.username || user.username == "") {
        console.error("No username was provided for the user");
        res.status(404).json("No username was provided for the user");
        return;
    }
    if (Number(user.role) < 0 || Number(user.role) > 2) {
        console.error("The role provided is invalid!");
        res.status(404).json("The role provided is invalid!");
        return;
    }

    try {
        const result = await userNotExists(Number(user.id));
        if (result == true) {
            console.error('There exists no user with the provided id');
            return;
        }
    } catch (error) {
        console.error('Error retrieving users', error);
        return;
    }
    try {
        await editUserAsync(Number(user.id), user.username, Number(user.role), user.description);
    } catch (error) {
        console.error('Error while updating users', error);
        return;
    }
    const result = await getAllUsersAsync();
    res.send(result);
}

async function deleteUserAsync(id) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`DELETE FROM [Credentials] WHERE id = ${id}`);
    await pool.close();
    return result.rowsAffected;
}

const deleteUser = async (req, res) => {
    const deleteID = req.params.id;

    try {
        const aux = await deleteUserAsync(Number(deleteID));
        if (aux == 0) {
            console.error('Error deleting the user');
        }
        const result = await getAllUsersAsync();
        res.status(200).send(result);
    } catch (error) {
        console.error('Error deleting user.', error);
    }
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
    if (user.role != 'user' && user.role != 'manager' && user.role != 'admin') {
        console.error("The role provided is invalid!");
        res.status(404).json("The role provided is invalid!");
        return;
    }

    const foundUsers = await getUserByUsername(user.username);
    if (foundUsers.length > 0) {
        console.error("A user with that username already exists!");
        res.status(404).json("A user with that username already exists!");
        return;
    }

    var roleId = 0;
    if (user.role == 'manager') roleId = 1;
    else if (user.role == 'admin') roleId = 2;

    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
        await addUserAsync(user.username, hashedPassword, roleId);
    } catch (error) {
        console.error("Error while adding the user!", error);
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

async function getAllUsersAsync() {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`SELECT * FROM Credentials`);
    await pool.close();
    return result.recordset;
}

const getAllUsers = async (req, res) => {
    const USERS = await getAllUsersAsync()
    res.send(USERS)
}

module.exports = {
    register,
    login,
    getUser,
    getAllUsers,
    createUser,
    editUser,
    deleteUser
};
