import React from 'react';
import { CircularProgress, Button } from '@material-ui/core';


function ButtonIndicatorEdit(props:any) {
  const {  onClick, loading, ...other } = props;
  return (
    <Button   onClick={onClick} disabled={loading} {...other}>
      {loading && <CircularProgress size={14} color="secondary"/>}
      {!loading && 'Submit' }
    </Button>
  );
}

export default ButtonIndicatorEdit;