import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TrackMutation } from '../../types';
import { toast } from 'react-toastify';
import { Container, Grid2, Typography } from '@mui/material';
import { selectTrackCreating } from './tracksSlice';
import { createTrack } from './tracksThunks';
import TrackForm from './components/TrackForm';

const NewTrack = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectTrackCreating);

  const onFormSubmit = async (trackMutation: TrackMutation) => {
    try {
      await dispatch(createTrack(trackMutation));
      toast.success('New track created');
    } catch (error) {
      toast.error('No new track created');
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid2 container direction="column" mt={4}>
          <Grid2>
            <Typography variant="h4" mb={4} fontWeight="bold">
              New track
            </Typography>
          </Grid2>
          <Grid2 justifyContent="space-between">
            <TrackForm onSubmit={onFormSubmit} isLoading={isCreating} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default NewTrack;
