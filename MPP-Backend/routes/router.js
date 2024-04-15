const express = require("express")
const magicitemController = require("../controller/MagicItemController");

const router = express.Router()

router.get("/", magicitemController.getAllMagicItems)
router.get("/:id", magicitemController.getMagicItemByID)
router.post("/", magicitemController.createMagicItem)
router.put("/:id", magicitemController.editMagicItem)
router.delete("/:id", magicitemController.deleteMagicItem)
router.get("/faker/:count", magicitemController.getFakerData)

module.exports = router