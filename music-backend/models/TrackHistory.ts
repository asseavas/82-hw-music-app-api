import mongoose, { Types } from 'mongoose';
import { TrackHistoryMutation } from '../types';
import Artist from './Artist';
import User from './User';

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema<TrackHistoryMutation>({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    },
  },
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
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
