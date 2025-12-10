import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
title: { type: String, required: true },
author: { type: String, required: true },
tags: [{ type: String }],
status: {
type: String,
enum: ['Want to Read', 'Reading', 'Completed'],
default: 'Want to Read'
},
userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
createdAt: { type: Date, default: Date.now }
});


export default mongoose.model('Book', bookSchema);