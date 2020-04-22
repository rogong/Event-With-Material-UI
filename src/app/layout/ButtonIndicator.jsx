import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function ButtonComponent(props) {
  const {  onClick, loading, ...other } = props;
  return (
    <Button   onClick={onClick} disabled={loading} {...other}>
      {loading && <CircularProgress size={14} color="secondary"/>}
      {!loading && <DeleteIcon color="secondary" fontSize="small" />}
    </Button>
  );
}

export default ButtonComponent;