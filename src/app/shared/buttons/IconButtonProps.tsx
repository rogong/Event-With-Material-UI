import React from 'react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import Button  from '@material-ui/core/Button';


const IconButtonProps = (props:any) => {
  const {  onClick, loading, ...other } = props;
  return (
    <Button   onClick={onClick} disabled={loading} {...other}>
       <IconButton>
              <VisibilityIcon fontSize="small" />
              </IconButton>
    </Button>
  );
}

export default IconButtonProps;
