import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AlbumMutation } from '../../types';
import { toast } from 'react-toastify';
import { Container, Grid2, Typography } from '@mui/material';
import AlbumForm from './components/AlbumForm';
import { selectAlbumCreating } from './albumsSlice';
import { createAlbum } from './albumsThunks';

const NewAlbum = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectAlbumCreating);

  const onFormSubmit = async (albumMutation: AlbumMutation) => {
    try {
      await dispatch(createAlbum(albumMutation));
      navigate('/');
      toast.success('New album created');
    } catch (error) {
      toast.error('No new album created');
    }
  };

  return (
    <>
      <Container maxWidth="md">
        <Grid2 container direction="column" mt={4}>
          <Grid2>
            <Typography variant="h4" mb={4} fontWeight="bold">
              New album
            </Typography>
          </Grid2>
          <Grid2 justifyContent="space-between">
            <AlbumForm onSubmit={onFormSubmit} isLoading={isCreating} />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default NewAlbum;