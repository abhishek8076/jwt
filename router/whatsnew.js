const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.post('/whatsnew', async (req, res) => {
    try {
      const postData = req.body;
  
      // Create a new News instance
      const news = new News(postData);
  
      // Save the data to the database
      await news.save();
  
      res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  app.get('/whatsnew',async (res,req)=>{
    try {
      const GetWhatsNew = await Movies.find(req.body.id)

      res.status(201).json(GetWhatsNew)
 } catch (err) {
      res.status(500).json(err);
 }
  });

  
  