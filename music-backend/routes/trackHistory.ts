import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';
import auth from '../middleware/auth';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res
        .status(401)
        .send({ error: 'Header "Authorization" not found' });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({ error: 'Token not found' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Wrong Token!' });
    }

    const trackId = req.body.track;

    if (!mongoose.Types.ObjectId.isValid(trackId)) {
      return res.status(400).send({ error: 'Invalid track ID format!' });
    }

    const existingTrack = await Track.findById(trackId);

    if (!existingTrack) {
      return res.status(400).send({ error: 'Track not found!' });
    }

    const trackHistory = new TrackHistory({
      track: existingTrack._id,
      user: user._id,
      datetime: new Date(),
    });

    await trackHistory.save();
    return res.send(trackHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = req.user;

    const trackHistory = await TrackHistory.find({ user: user._id })
      .populate('track')
      .sort({ datetime: -1 });

    const formattedHistory = trackHistory.map((entry) => ({
      artist: entry.track.artist,
      title: entry.track.title,
      datetime: entry.datetime,
    }));

    return res.send(formattedHistory);
  } catch (error) {
    return next(error);
  }
});

export default trackHistoryRouter;
