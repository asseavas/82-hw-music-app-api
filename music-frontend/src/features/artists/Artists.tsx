import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectArtistDeleting,
  selectArtistPublication,
  selectArtists,
  selectArtistsFetching,
} from './artistsSlice';
import { deleteArtist, fetchArtists, publishArtist } from './artistsThunks';
import { CircularProgress, Grid2, Typography } from '@mui/material';
import ArtistCard from './components/ArtistCard';
import { ContentContainer } from '../../constants';
import { selectUser } from '../users/usersSlice';
import { toast } from 'react-toastify';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isFetching = useAppSelector(selectArtistsFetching);
  const isDeleting = useAppSelector(selectArtistDeleting);
  const isPublication = useAppSelector(selectArtistPublication);
  const user = useAppSelector(selectUser);

  const handleDeleteArtist = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to delete this artist?')) {
        await dispatch(deleteArtist(id)).unwrap();
        await dispatch(fetchArtists());
        toast.success('The artist has been deleted!');
      }
    } catch (error) {
      toast.error('The artist has not been deleted!');
    }
  };

  const handlePublishArtist = async (id: string) => {
    try {
      if (window.confirm('Are you sure you want to publish this artist?')) {
        await dispatch(publishArtist(id)).unwrap();
        await dispatch(fetchArtists());
        toast.success('The artist has been published!');
      }
    } catch (error) {
      toast.error('The artist has not been published!');
    }
  };

  let content: React.ReactNode = (
    <Grid2 container mt={5} mb={5}>
      <Grid2 component={Typography} variant="body1" color="text.secondary">
        There are no artists here!
      </Grid2>
    </Grid2>
  );

  if (isFetching) {
    content = <CircularProgress />;
  } else if (artists.length > 0) {
    const visibleArtists = artists.filter((artist) => {
      return (
        artist.isPublished ||
        (user && artist.user === user._id) ||
        (user && user.role === 'admin')
      );
    });

    if (visibleArtists.length > 0) {
      content = visibleArtists.map((artist) => (
        <ArtistCard
          key={artist._id}
          artist={artist}
          isDeleting={isDeleting}
          onDelete={() => handleDeleteArtist(artist._id)}
          isPublication={isPublication}
          onPublish={() => handlePublishArtist(artist._id)}
        />
      ));
    }
  }

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <ContentContainer
      container
      direction="column"
      spacing={3}
      sx={{ paddingInline: '25px', mt: 4, pt: 4 }}
    >
      <Grid2>
        <Typography variant="h4">Artists</Typography>
      </Grid2>
      <Grid2 container justifyContent="space-between">
        {content}
      </Grid2>
    </ContentContainer>
  );
};

export default Artists;
