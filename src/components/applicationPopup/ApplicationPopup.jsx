import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import "./applicationPopup.css";


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ApplicationPopup = (props) => {

    
    const [open, setOpen] = React.useState(props.openUp);
    const [userData, setUserData] = React.useState({
        "first_name": '',
        "last_name": '',
        "email": '',
        "phone": '',
        "gender": '',
        "age": '',
        "city": '',
        "state": '',
        "institute": '',
        "course": '',
        "super_power": '',
        "why": ''
    })
    
    

    const handleClickOpen = () => {
      setOpen(true);
      let arrayId = props.curId;
      let curUserData = props.appData[arrayId];
      setUserData({
          "first_name": curUserData.first_name,
          "last_name": curUserData.last_name,
          "email": curUserData.email,
          "phone": curUserData.phone,
          "gender": curUserData.gender,
          "age": curUserData.age,
          "city": curUserData.city,
          "state": curUserData.state,
          "institute": curUserData.institution,
          "course": curUserData.course,
          "super_power": curUserData.super_power,
          "why": curUserData.why
      })
      let appID = props.appData[arrayId]._id;
    };
  
    const handleClose = () => {
      setOpen(false);
    };

 

  return( 
  <div>
       <Button 
         sx={{
            padding: '0 8px'
          }}
        onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth='md'
      >
        <DialogTitle>{userData.first_name} {userData.last_name}</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
            <Box sx={{ flexGrow: 1, justifyContent: 'start', marginTop: "40px" }}>
                <Grid container spacing={2}>
                    <Grid container xs={6}>
                        
                        <Grid item xs={3}>
                            First Name
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.first_name}
                        </Grid>
                        
                        <Grid item xs={3}>
                            Last Name
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.last_name}
                        </Grid>
                        
                        <Grid item xs={3}>
                            Email
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.email}
                        </Grid>

                        <Grid item xs={3}>
                            Phone
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.phone}
                        </Grid>

                        <Grid item xs={3}>
                            Age
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.age}
                        </Grid>

                        <Grid item xs={3}>
                            Gender
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.gender}
                        </Grid>

                        <Grid item xs={3}>
                            City
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.city}
                        </Grid>
                        
                        <Grid item xs={3}>
                            State
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.state}
                        </Grid>

                        <Grid item xs={3}>
                            Institution
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.institute}
                        </Grid>

                        <Grid item xs={3}>
                            Course
                        </Grid>

                        <Grid item xs={9}>
                            : {userData.course}
                        </Grid>

                    </Grid>


                    <Grid container xs={6}>
                        
                        <Grid item xs={12}>
                            <Item>{userData.super_power}</Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>{userData.why}</Item>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
  </div>
  )};

export default ApplicationPopup;
