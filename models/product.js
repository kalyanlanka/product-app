const mongoose = require('mongoose'),
      Schema = mongoose.Schema;


const ProductSchema = new Schema({
      name: {
          type: String,
          required: true
        },
      type: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: false
        },
        isAvailable: {
          type: Boolean,
          required: false
        }
      },
      {
        timestamps: true
      });


module.exports = mongoose.model('Product', ProductSchema);
