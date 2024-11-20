import mongoose, {Schema} from 'mongoose';

const addressSchema = mongoose.Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    address_line_1: {
        type: String,
        required: true,
        trim: true,
    },
    address_line_2: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    postal_code: {
        type: String,
        required: true,
        trim: true,
    },
    phone_number: {
        type: String,
        required: true,
        trim: true,
    },
    landmark: {
        type: String
    }
});

export const Addresses =  mongoose.model('addresses', addressSchema);
