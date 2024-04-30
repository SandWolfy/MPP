const {fakerEN:faker} = require('@faker-js/faker');
const sql = require('mssql/msnodesqlv8')
const {getRowCount: getMagicItemsRowCount} = require('./MagicItemController')

var config = {
    connectionString: "Driver={ODBC Driver 17 for SQL Server};Server=David\\SQLEXPRESS;Database=MPP;Trusted_Connection=yes;",
};

async function getAllBuffsAsync() {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`SELECT * FROM Buff`);
    await pool.close();
    return result.recordset;
}

const getAllBuffs = async (req, res) => {
    const BUFFS = await getAllBuffsAsync()
    res.send(BUFFS)
}

async function getBuffByIDAsync(id) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`SELECT * FROM BUFF WHERE bid = '${id}'`);
    await pool.close();
    return result.recordset;
}

async function getRowCount() {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`SELECT COUNT(*) as rCount FROM Buff`);
        const rows = result.recordset[0];
        await sql.close();
        return rows.rCount;
    } catch (error) {
        console.error('Error executing query:', error.message);
        throw error; 
    }
}

const getBuffByID = async (req, res) => {
    const requestID = req.params.id;
    
    var buff = await getBuffByIDAsync(requestID)
    if (!buff) res.status(404).json('No record with given ID')

    res.send(buff)
}

async function createBuffAsync(bid, mid, name, intensity) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`INSERT INTO Buff VALUES(${bid}, ${mid}, '${name}', ${intensity})`);
    await pool.close();
    return result.rowsAffected;
}

const createBuff = async (req, res) => {
    var bid = await getRowCount()
    const item = req.body;
    if (item.name == '') {
        console.error('No name was provided for the buff');
        return;
    }
    if (isNaN(Number(item.mid)) || Number(item.mid) < 0) {
        var itemCount = getMagicItemsRowCount()
        if (item.mid >= itemCount){
            console.error('There exist no magic item with the provided id');
            return;
        }
    }
    if (isNaN(Number(item.intensity)) || Number(item.intensity) < 0) {
        console.error('No intensity was provided or it is smaller than 0');
        return;
    }
    try {
        await createBuffAsync(Number(bid), Number(item.mid), item.name, Number(item.intensity));
    } catch (error) {
        console.error('Error retrieving buffs', error);
        return;
    }
    res.send(item);
}

async function buffNotExists(id) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`SELECT * FROM Buff WHERE bid = '${id}'`);
    await pool.close();
    return result.recordset.length == 0;
}

async function editBuffAsync(bid, mid, newName, newIntensity) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`UPDATE Buff SET mid = '${mid}', [name] = '${newName}', intensity = ${newIntensity} WHERE bid = '${bid}'`);
    await pool.close();
    return result.rowsAffected;
}

const editBuff = async (req, res) => {
    const item = req.body;

    if (item.name == '') {
        console.error('No name was provided for the buff');
        return;
    }
    if (isNaN(Number(item.mid)) || Number(item.mid) < 0) {
        var itemCount = getMagicItemsRowCount()
        if (item.mid >= itemCount){
            console.error('There exist no magic item with the provided id');
            return;
        }
    }
    if (isNaN(Number(item.intensity)) || Number(item.intensity) < 0) {
        console.error('No intensity was provided or it is smaller than 0');
        return;
    }
    try {
        const result = await buffNotExists(Number(item.bid));
        if (result == true) {
            console.error('There exists no buff with the provided id');
            return;
        }
    } catch (error) {
        console.error('Error retrieving buffs', error);
        return;
    }
    try {
        await editBuffAsync(Number(item.bid), Number(item.mid), item.name, Number(item.intensity));
    } catch (error) {
        console.error('Error while updating buffs', error);
        return;
    }
    const result = await getAllBuffsAsync();
    res.send(result);
}

async function deleteBuffAsync(id) {
    const pool = await sql.connect(config); 
    const result = await pool.request().query(`DELETE FROM Buff WHERE bid = ${id}`);
    await pool.close();
    return result.rowsAffected;
}

const deleteBuff = async (req, res) => {
    const deleteID = req.params.id;

    try {
        const aux = await deleteBuffAsync(Number(deleteID));
        if (aux == 0) {
            console.error('Error deleting the buff');
        }
        const result = await getAllBuffsAsync();
        res.status(200).send(result);
    } catch (error) {
        console.error('Error deleting buff.', error);
    }
}

module.exports = {
    getAllBuffs,
    getBuffByID,
    createBuff,
    editBuff,
    deleteBuff,
}