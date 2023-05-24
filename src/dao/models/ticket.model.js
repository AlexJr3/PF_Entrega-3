import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchase_datatime: String,
  amount: Number,
  purchase: String,
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
