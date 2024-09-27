import React, { useEffect, useState } from 'react';
import { TrackMutation } from '../../../types';
import { CircularProgress, Grid2, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectArtists,
  selectArtistsFetching,
} from '../../artists/artistsSlice';
import { selectAlbums, selectAlbumsFetching } from '../../albums/albumsSlice';
import { fetchArtists } from '../../artists/artistsThunks';
import { fetchAlbums } from '../../albums/albumsThunks';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSubmit: (track: TrackMutation) => void;
  isLoading: boolean;
}

const TrackForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const artists = useAppSelector(selectArtists);
  const artistsFetching = useAppSelector(selectArtistsFetching);
  const albums = useAppSelector(selectAlbums);
  const albumsFetching = useAppSelector(selectAlbumsFetching);
  const [artistId, setArtistId] = useState('');
  const [state, setState] = useState<TrackMutation>({
    album: '',
    title: '',
    duration: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbums(artistId));
    }
  }, [dispatch, artistId]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title.trim() || !state.duration.trim()) {
      setError('Title and duration cannot be empty or just whitespace.');
      return;
    }

    setError(null);
    onSubmit({ ...state });
    navigate(`/albums/${state.album}`);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleArtistChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtistId(event.target.value);
  };

  return (
    <Grid2
      container
      spacing={2}
      component="form"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      onSubmit={submitFormHandler}
    >
      <Grid2 width="100%">
        {artistsFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Artist"
            id="artist"
            name="artist"
            value={artistId}
            onChange={handleArtistChange}
          >
            <MenuItem value="" disabled>
              Select artist
            </MenuItem>
            {artists.map((artist) => (
              <MenuItem key={artist._id} value={artist._id}>
                {artist.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid2>
      <Grid2 width="100%">
        {albumsFetching ? (
          <CircularProgress />
        ) : (
          <TextField
            required
            select
            label="Album"
            id="album"
            name="album"
            value={state.album}
            onChange={inputChangeHandler}
          >
            <MenuItem value="" disabled>
              Select album
            </MenuItem>
            {albums.map((album) => (
              <MenuItem key={album._id} value={album._id}>
                {album.title}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Grid2>
      <Grid2 width="100%">
        <TextField
          required
          label="Title"
          id="title"
          name="title"
          value={state.title}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <TextField
          required
          label="Song duration"
          id="duration"
          name="duration"
          value={state.duration}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
          onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            if (!/^[0-9:]*$/.test(value)) {
              event.target.value = value.slice(0, -1);
            }
          }}
        />
      </Grid2>
      <Grid2 width="100%">
        <LoadingButton
          sx={{
            width: '100%',
            height: '45px',
            backgroundColor: error ? 'red' : 'primary.main',
            '&:hover': {
              backgroundColor: error ? 'darkred' : 'primary.dark',
            },
          }}
          type="submit"
          loading={isLoading}
          startIcon={<SaveIcon />}
          variant="contained"
        >
          Add
        </LoadingButton>
      </Grid2>
    </Grid2>
  );
};

export default TrackForm;
