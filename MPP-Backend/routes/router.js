const express = require("express")
const magicitemController = require("../controller/MagicItemController");
const buffController = require("../controller/BuffController")
const credentialsController = require("../controller/CredentialsController")

const router = express.Router()

router.get("/items", magicitemController.getAllMagicItems)
router.get("/buffs", buffController.getAllBuffs)
router.get("/items/:id", magicitemController.getMagicItemByID)
router.get("/buffs/:id", buffController.getBuffByID)
router.post("/items", magicitemController.createMagicItem)
router.post("/buffs", buffController.createBuff)
router.put("/items/:id", magicitemController.editMagicItem)
router.put("/buffs/:id", buffController.editBuff)
router.delete("/items/:id", magicitemController.deleteMagicItem)
router.delete("/buffs/:id", buffController.deleteBuff)
router.get("/faker/:count", magicitemController.getFakerData)
router.post("/register", credentialsController.register)
router.post("/login", credentialsController.login)
router.get("/users", credentialsController.getAllUsers)
router.post("/users", credentialsController.createUser)
router.put("/users/:id", credentialsController.editUser)
router.delete("/users/:id", credentialsController.deleteUser)
router.get("/user", credentialsController.getUser)

module.exports = router