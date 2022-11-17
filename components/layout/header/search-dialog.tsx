import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from '@mui/material';

interface Props {
  dialogOpen: boolean;
  searchInput: string;
  setSearchInput: Function;
  setDialogOpen: Function;
  handleSubmit: Function;
}

const SearchDialog = ({
  dialogOpen,
  setSearchInput,
  searchInput,
  setDialogOpen,
  handleSubmit,
}: Props) => {
  return (
    <Dialog
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: '#111111',
        },
      }}
    >
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Enter movie title'
            value={searchInput}
            type='text'
            fullWidth
            variant='standard'
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
            sx={{
              '& label': {
                color: 'gray',
              },
              '& label.Mui-focused': {
                color: 'primary.main',
              },
              '& .MuiInput-root:before': {
                borderBottomColor: 'lightgray',
              },
              '& .MuiInputBase-root:hover:not(.Mui-diabled):before': {
                borderBottomColor: 'gray',
              },
              input: {
                color: 'white',
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button type='submit'>Search</Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SearchDialog;
