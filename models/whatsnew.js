
const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    news_title: String,
    startdate: Date,
    end_date: Date,
    contenttype: Number,
    html: String,
    file: String
  },
  {timestamps:true}
  );
  module.exports = mongoose.model('News', newsSchema);
  