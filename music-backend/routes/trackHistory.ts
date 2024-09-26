import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import Track from '../models/Track';
import auth, { RequestWithUser } from '../middleware/auth';
import Album from '../models/Album';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackId = req.body.track;

    if (!req.body.track) {
      return res.status(400).send({ error: 'Track is required!' });
    }

    if (!mongoose.Types.ObjectId.isValid(trackId)) {
      return res.status(400).send({ error: 'Invalid track ID format!' });
    }

    const existingTrack = await Track.findById(trackId);
    const existingTrackAlbum = await Album.findById(existingTrack?.album).populate('artist', 'name');

    if (!existingTrack) {
      return res.status(400).send({ error: 'Track not found!' });
    }

    const trackHistoryMutation = new TrackHistory({
      artist: existingTrackAlbum?.artist,
      user: req.user?._id,
      track: existingTrack._id,
      datetime: new Date(),
    });

    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const trackHistory = new TrackHistory(trackHistoryMutation);
    await trackHistory.save();

    return res.send(trackHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).send({ error: 'User not found' });
    }

    const trackHistory = await TrackHistory.find({ user: req.user._id }).populate('artist', 'name').populate('track', 'title').sort({ datetime: -1 });

    const formattedHistory = trackHistory.map((entry) => ({
      _id: entry._id,
      artist: entry.artist,
      title: entry.track,
      datetime: entry.datetime,
    }));

    return res.send(formattedHistory);
  } catch (error) {
    return next(error);
  }
});

export default trackHistoryRouter;
