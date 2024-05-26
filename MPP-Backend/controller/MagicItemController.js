const {v4:uuid} = require('uuid');
const { fakerEN: faker } = require("@faker-js/faker");
const sql = require("mssql/msnodesqlv8");

var config = {
    connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=David\\SQLEXPRESS;Database=MPP;Trusted_Connection=yes;",
};

async function getAllMagicItemsAsync() {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM MagicItem`);
    await pool.close();
    return result.recordset;
}

async function getRowCount() {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`SELECT COUNT(*) as rCount FROM MagicItem`);
        const rows = result.recordset[0];
        await sql.close();
        return rows.rCount;
    } catch (error) {
        console.error("Error executing query:", error.message);
        throw error;
    }
}

const getAllMagicItems = async (req, res) => {
    const ITEMS = await getAllMagicItemsAsync();
    res.send(ITEMS);
};

async function getMagicItemByIDAsync(id) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM MagicItem WHERE id = '${id}'`);
    await pool.close();
    return result.recordset;
}

const getMagicItemByID = async (req, res) => {
    const requestID = req.params.id;

    var magicItem = await getMagicItemByIDAsync(requestID);
    if (!magicItem) res.status(404).json("No record with given ID");

    res.send(magicItem);
};

async function createMagicItemAsync(id, newName, newLocation, newClass, newPrice) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`INSERT INTO MagicItem VALUES(${id}, '${newName}', '${newLocation}', '${newClass}', ${newPrice})`);
    await pool.close();
    return result.rowsAffected;
}

const createMagicItem = async (req, res) => {
    var id = await getRowCount();
    const item = req.body;
    if (item.name == "") {
        console.error("No name provided for the magic item");
        return;
    }
    if (item.location == "") {
        console.error("No location provided for the magic item");
        return;
    }
    if (item.usableClass == "") {
        console.error("No class provided for the magic item");
        return;
    }
    if (isNaN(Number(item.price)) || Number(item.price) < 0) {
        console.error("The price was not provided or it was smaller than 0");
        return;
    }
    try {
        await createMagicItemAsync(Number(id), item.name, item.location, item.usableClass, Number(item.price));
    } catch (error) {
        console.error("Error while adding the magic item!", error);
        return;
    }
    res.send(item);
};

async function editMagicItemAsync(id, newName, newLocation, newClass, newPrice) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`UPDATE MagicItem SET [name] = '${newName}', [location] = '${newLocation}', usableClass = '${newClass}', price = ${newPrice} WHERE id = '${id}'`);
    await pool.close();
    return result.rowsAffected;
}

async function clientNotExists(id) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`SELECT * FROM MagicItem WHERE id = '${id}'`);
    await pool.close();
    return result.recordset.length == 0;
}

const editMagicItem = async (req, res) => {
    const item = req.body;
    const id = req.params.id;

    if (item.name == "") {
        console.error("No name provided for the magic item");
        return;
    }
    if (item.location == "") {
        console.error("No location provided for the magic item");
        return;
    }
    if (item.usableClass == "") {
        console.error("No class provided for the magic item");
        return;
    }
    if (isNaN(Number(item.price)) || Number(item.price) < 0) {
        console.error("The price was not provided or it was smaller than 0");
        return;
    }
    try {
        const result = await clientNotExists(Number(id));
        if (result == true) {
            console.error("There is no magic item with the provided ID!");
            return;
        }
    } catch (error) {
        console.error("Error retrieving magic items", error);
        return;
    }
    try {
        await editMagicItemAsync(Number(id), item.name, item.location, item.usableClass, Number(item.price));
    } catch (error) {
        console.error("Error while updating magic items", error);
        return;
    }
    const result = await getAllMagicItemsAsync();
    res.send(result);
};

async function deleteMagicItemAsync(id) {
    const pool = await sql.connect(config);
    const result = await pool.request().query(`DELETE FROM MagicItem WHERE id = ${id}`);
    await pool.close();
    return result.rowsAffected;
}

const deleteMagicItem = async (req, res) => {
    const deleteID = req.params.id;

    try {
        const aux = await deleteMagicItemAsync(Number(deleteID));
        if (aux == 0) {
            console.error("Error deleting the magic item");
        }
        const result = await getAllMagicItemsAsync();
        res.status(200).send(result);
    } catch (error) {
        console.error("Error deleting magic item.", error);
    }
};

const getFakerData = (req, res) => {
    const requestedCount = req.params.count;

    const fakerData = [];
    for (let i = 0; i < requestedCount; i++)
    {
        const fakerItem = {
            id: uuid(),
            name: faker.person.fullName(),
            location: faker.location.country(),
            usableClass: faker.color.human(),
            price: faker.number.float(),
        }

        fakerData.push(fakerItem)
    }

    res.send(fakerData)
}

const addFakerItem = async () => {
    var id = await getRowCount();
    var name = faker.person.fullName();
    var location = faker.location.country();
    var usableClass = faker.color.human();
    var price = faker.number.float();

    await createMagicItemAsync(Number(id), name, location, usableClass, Number(price));
}

module.exports = {
    getAllMagicItems,
    getMagicItemByID,
    createMagicItem,
    editMagicItem,
    deleteMagicItem,
    getFakerData,
    addFakerItem,
};
