const express = require("express");
const router = express.Router();
const Navmenu = require("../models/navmenu");
const verify = require("../jwt/verifyToken");
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, 'uploads');
      fs.mkdirSync(uploadDir, { recursive: true });
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  router.post('/uploadmenudata',  upload.single('content_data'), async (req, res) => {
    try {
      const {id, name, is_submenu, content_id, content_type } = req.body;
      let contentData;
  
      if (content_id === "1") {
        contentData = req.body.content_data;
      } else if (content_id === "2") {
        contentData = req.file ? req.file.path : null;
      } else if (content_id === "3") {
        contentData = req.body.content_data;
      } else {
        throw new Error('Invalid content_type');
      }
  
      const menuItem = new Navmenu({
        id,
        name,
        is_submenu,
        content_id,
        content_type,
        content_data: contentData,
      });
  
      await menuItem.save();
  
      res.status(201).json({ message: 'Menu item created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// UPDATE
router.put('/updatemenudata/:id', verify, async (req, res) => {
    try {
        const updateNavmenu = await Navmenu.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true });
        res.status(200).json(updateNavmenu);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/deletemenudata/:id', verify, async (req, res) => {
    try {
        await Navmenu.findByIdAndDelete(req.params.id);
        res.status(200).json("Navmenu deleted.");
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET
router.get('/getmenudata/:id', async (req, res) => {
    try {
        const navmenu = await Navmenu.findById(req.params.id);
        const { ...info } = navmenu._doc;
        res.status(200).json(info);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// GET ALL
router.get('/getmenudata', async (req, res) => {
    try {
        const limit = req.query.limit || 10; // Use query parameter for limit
        const navmenu = await Navmenu.find().limit(limit);
        res.status(200).json(navmenu);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
router.use((req, res) => {
    res.status(404).json("404 - Not Found");
})

module.exports = router;
