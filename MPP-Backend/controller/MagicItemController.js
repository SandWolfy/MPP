const {v4:uuid} = require('uuid');
const MAGICITEMS = require('../model/magic_item');
const {fakerEN:faker} = require('@faker-js/faker');

const getAllMagicItems = (req, res) => {
    res.send(MAGICITEMS)
}

const getMagicItemByID = (req, res) => {
    const requestID = req.params.id;
    
    var magicItem = MAGICITEMS.filter(x => x.id == requestID)[0]
    if (!magicItem) res.status(404).json('No record with given ID')

    res.send(magicItem)
}

const createMagicItem = (req, res) => {
    const id = uuid();
    const item = req.body;

    const newItem = {
        ...item,
        id,
    }
    MAGICITEMS.push(newItem);
    res.send(newItem);
}

const editMagicItem = (req, res) => {
    const item = req.body;
    const id = req.params.id;

    const magicItem = MAGICITEMS.filter(x => x.id == id)[0]
    if (!magicItem) res.status(404).json('No record with given ID')

    const indexToUpdate = MAGICITEMS.indexOf(magicItem)
    MAGICITEMS[indexToUpdate] = item

    res.send(MAGICITEMS);
}

const deleteMagicItem = (req, res) => {
    const deleteID = req.params.id;

    var magicItem = MAGICITEMS.filter(x => x.id == deleteID)[0]
    if (!magicItem) res.status(404).json('No record with given ID')

    var itemIndex = MAGICITEMS.indexOf(magicItem);
    MAGICITEMS.splice(itemIndex, 1);
    
    res.send(MAGICITEMS);
}

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

module.exports = {
    getAllMagicItems,
    getMagicItemByID,
    createMagicItem,
    editMagicItem,
    deleteMagicItem,
    getFakerData,
}