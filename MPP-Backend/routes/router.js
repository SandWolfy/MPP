const express = require("express")
const magicitemController = require("../controller/MagicItemController");
const buffController = require("../controller/BuffController")

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

module.exports = router