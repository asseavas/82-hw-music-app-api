import express from 'express';
import User from '../models/User';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';

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

    const trackHistory = new TrackHistory({
      track: req.body.track,
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

export default trackHistoryRouter;
