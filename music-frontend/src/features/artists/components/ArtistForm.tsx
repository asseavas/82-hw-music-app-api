import React, { useState } from 'react';
import { ArtistMutation } from '../../../types';
import { Grid2, TextField } from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

interface Props {
  onSubmit: (artist: ArtistMutation) => void;
  isLoading: boolean;
}

const ArtistForm: React.FC<Props> = ({ onSubmit, isLoading }) => {
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<ArtistMutation>({
    name: '',
    image: null,
    information: null,
  });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!state.name.trim()) {
      setError('Name cannot be empty or just whitespace.');
      return;
    }

    setError(null);
    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
        <TextField
          required
          label="Name"
          id="name"
          name="name"
          value={state.name}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <TextField
          multiline
          label="Information"
          id="information"
          name="information"
          minRows={3}
          value={state.information}
          onChange={inputChangeHandler}
          error={!!error}
          helperText={error}
        />
      </Grid2>
      <Grid2 width="100%">
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
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

export default ArtistForm;
