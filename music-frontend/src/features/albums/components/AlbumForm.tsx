import React, { useEffect, useState } from 'react';
import { AlbumMutation } from '../../../types';
import { CircularProgress, Grid2, MenuItem, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists, selectArtistsFetching } from '../../artists/artistsSlice';
import { fetchArtists } from '../../artists/artistsThunks';
import FileInput from '../../../UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';

interface Props {
  onSubmit: (album: AlbumMutation) => void;
  isLoading: boolean;
}

const AlbumForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const artists = useAppSelector(selectArtists);
  const artistsFetching = useAppSelector(selectArtistsFetching);

  const [state, setState] = useState<AlbumMutation>({
    artist: '',
    title: '',
    releaseYear: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.title.trim()) {
      setError('Title cannot be empty or just whitespace.');
      return;
    }

    setError(null);
    onSubmit({ ...state });
    navigate(`/artists/${state.artist}`);
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
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
            value={state.artist}
            onChange={inputChangeHandler}
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
          type="number"
          label="Release year"
          id="releaseYear"
          name="releaseYear"
          value={state.releaseYear}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <FileInput label="Image" name="image" onChange={fileInputChangeHandler} />
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

export default AlbumForm;
