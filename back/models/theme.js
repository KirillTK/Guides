const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema({
  value: String,
  title: String
});

const Theme = mongoose.model('themes', ThemeSchema);

module.exports = Theme;
