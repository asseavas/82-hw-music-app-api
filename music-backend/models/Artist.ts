import mongoose, { Types } from 'mongoose';
import User from './User';
import { ArtistMutation } from '../types';

const Schema = mongoose.Schema;

const ArtistSchema = new mongoose.Schema<ArtistMutation>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  information: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;
