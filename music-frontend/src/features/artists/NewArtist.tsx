import { toast } from 'react-toastify';
import { ArtistMutation } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Container, Grid2, Typography } from '@mui/material';
import ArtistForm from './components/ArtistForm';
import { selectArtistCreating } from './artistsSlice';
import { createArtist } from './artistsThunks';

const NewArtist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectArtistCreating);

  const onFormSubmit = async (artistMutation: ArtistMutation) => {
    try {
      await dispatch(createArtist(artistMutation));
      navigate('/');
      toast.success('New artist created');
    } catch (error) {
      toast.error('No new artist created');
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid2 container direction="column" mt={4}>
          <Grid2>
            <Typography variant="h4" mb={4} fontWeight="bold">
              New artist
            </Typography>
          </Grid2>
          <Grid2 justifyContent="space-between">
            <ArtistForm onSubmit={onFormSubmit} isLoading={isCreating} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default NewArtist;