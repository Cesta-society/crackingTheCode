import React from 'react';
import { connect } from 'react-redux';
import {deleteQuestion } from '../actions';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalQuestion= (props)=>{
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (

    <div style={{width: window.innerWidth>550?'80vw':'98vw',marginTop:'30vh',marginLeft:window.innerWidth>550?'10vw':'1vw'}} className={classes.paper}>
        <h2 id="simple-modal-title">Submit</h2>
        <hr />
        <p id="simple-modal-description">
            Are you sure you want to delete the question?
        </p>
        <div style={{textAlign:'right'}}>
            <Button variant="contained" color="primary" onClick={()=>{props.deleteQuestion(props.id);handleClose()}} >
                Yes
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose} >
                No
            </Button>
        </div>
    </div>
  );

  return (
    <div>
      <Link onClick={handleOpen}>
        Delete
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

export default connect(null, {deleteQuestion })(ModalQuestion);
