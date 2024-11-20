import mongoose, {Schema} from 'mongoose';

const productsSchema = mongoose.Schema({
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    picture: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
        min:0
    },
    discount_type: {
        type: String, 
        enum: ['percentage', 'fixed'], 
        required: false
    },
    discount_value: {
        type: Number,
        required: false,
        min:0,
    },
    tags: {
        type: [String],
        required:false
    }
},{
    timestamps:true,
}
);

export const Product =  mongoose.model('Product', productsSchema);
