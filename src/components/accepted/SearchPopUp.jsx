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
import { Link } from 'react-router-dom';
import "./searchpopup.css";
import { 
    Typography, 
    Divider, 
    CircularProgress,
    Snackbar,
    Alert as MuiAlert } from '@mui/material';
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


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

    const [open, setOpen] = React.useState(false);
    const [accepted, setAccepted] = React.useState(false);
    const [loader, setLoader] = React.useState({
        "rejectLoader": false,
        "acceptLoader": false
    });
    const[disableBtn, setdisableBtn] = React.useState(false);
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
    
    const [openSnackBar, setOpenSnackBar] = React.useState(false);

    const handleSnackBarClick = () => {
        setOpenSnackBar(true);
    };

    const handleSnackBarClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenSnackBar(false);
    };

    // End of the snackbar

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
          "why": curUserData.why,
          "userId": curUserData._id,
          "aadharNumber": curUserData.aadharNumber,
          "aadharImage": curUserData.aadhar
      })
      let appID = props.appData[arrayId]._id;
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    
    // const setStatusChange = async (e) => {
       
        
    //     const butClick = e.target.id;
        
    //     const token = window.localStorage.getItem("token").toString(); 
    //     const authAxios = axios.create({
    //         baseURL: 'http://localhost:4000',
    //         headers: {
    //             'x-access-token': token
    //         }
    //     })   
    //     try{

    //         if(butClick == "accept"){   
    //             setAccepted(false)              
    //             setLoader({
    //                 "rejectLoader": false,
    //                 "acceptLoader": true
    //             })  

    //                 setdisableBtn(true)

    //             const result = await authAxios.post(`/api/admin/application/status`, {
    //                 "acceptId": userData.userId,
    //                 "statusChange": "A"
    //             }).then((value) => {
    //                 setLoader({
    //                     "rejectLoader": false,
    //                     "acceptLoader": false
    //                 })  handleClickOpen

    //                 setdisableBtn(false)
    //                 sortApplicants();
    //                 setOpen(false)
    //                 setAccepted(true)
    //                 setOpenSnackBar(true)
                   
    //             })     
    //             // const {acceptedCount, appCount, contactCount} = result.data;
    //         }

    //         if(butClick == "reject"){    
    //             setAccepted(false)
    //             setLoader({
    //                 "rejectLoader": true,
    //                 "acceptLoader": false
    //             })   

    //             setdisableBtn(true)

    //             const result = await authAxios.post(`/api/admin/application/status`, {
    //                 "acceptId": userData.userId,
    //                 "statusChange": "R" 
    //             }).then((value) => {
    //                 setLoader({
    //                     "rejectLoader": false,
    //                     "acceptLoader": false
    //                 }) 
    //                 setdisableBtn(false);  
    //                 setOpen(false);
    //                 setOpenSnackBar(true);
    //                 sortApplicants();
    //             });     
    //             // const {acceptedCount, appCount, contactCount} = result.data;
    //         }
          
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }     

        
    // }

    function sortApplicants(){
        props.reSort(props.curId)
        console.log(props.curId)
    }
 
    function downloadImage(imgUrl) {
        
    }

  return( 
  <div>
      {/* <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity={accepted ? "success" : "error"} sx={{ width: '100%' }}>
          {accepted ? "Accepted" : "Rejected"}
        </Alert>
      </Snackbar>
       */}
       <Button 
            onClick={handleClickOpen}
        >
        View
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth='xl'
      >
        <DialogTitle>User Applications</DialogTitle>
        <DialogContent >
          <DialogContentText id="alert-dialog-slide-description">
            <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>              
                        <Grid container>
                            
                            <Grid item xs={12}>
                                <Typography 
                                    variant="h6" 
                                    component="h6"
                                    sx={
                                        {
                                            fontWeight: 700,
                                            marginBottom: '10px'
                                        }
                                    }
                                >
                                    Details:
                                    <Divider light />
                                </Typography>
                            </Grid>
                            <Grid item xs={3} className="items-popup">
                                <h2 className='field-title'>First Name</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.first_name}
                            </Grid>
                            
                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>Last Name</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.last_name}
                            </Grid>
                            
                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>Email</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.email}
                            </Grid>

                            <Grid item xs={3}  className="items-popup"> 
                                <h2 className='field-title'>Phone</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.phone}
                            </Grid>

                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>Age</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.age}
                            </Grid>

                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>Gender</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.gender}
                            </Grid>

                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>City</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.city}
                            </Grid>
                            
                            <Grid item xs={3} className="items-popup"> 
                                <h2 className='field-title'>State</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.state}
                            </Grid>

                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>Institution</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.institute}
                            </Grid>

                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>Course</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.course}
                            </Grid>

                            <Grid item xs={3}  className="items-popup">
                                <h2 className='field-title'>Aadhar Number</h2> 
                            </Grid>

                            <Grid item xs={9}  className="items-popup">
                                 {userData.aadharNumber}
                            </Grid>

                        </Grid>                  
                    </Grid>
                        <Grid item xs={6}>                          
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography 
                                        variant="h6" 
                                        component="h6"
                                        sx={
                                            {
                                                fontWeight: 700,
                                                marginBottom: '10px'
                                            }
                                        }
                                    >
                                        Aadhar Card 
                                            <Button onClick={() => {
                                                downloadImage(userData.aadharImage)
                                            }}>
                                                Download
                                            </Button>
                                         
                                        <Divider light />
                                    </Typography>
                                </Grid>    

                                <Grid item xs={12}>
                                    <Box >
                                        <img 
                                            src={userData.aadharImage} 
                                            alt="aadhar card" 
                                            className='aadharCardImg'   
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
            </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {/* <Button 
                onClick={setStatusChange} 
                sx={{width: "140px", height: "37px"}} 
                variant="contained" 
                color="secondary" 
                id="reject"
                disabled={disableBtn}
            >
              {loader.rejectLoader ? <CircularProgress color="primary" size="28px"/>: "Reject"}
            </Button>*/}
            <Button  
                disabled={disableBtn} 
                onClick={() => {
                    setOpen(false)
                }}
                sx={{width: "140px", height: "37px"}} 
                variant="contained" 
                id="accept"
            >
                Close
            </Button> 
        </DialogActions>
      </Dialog>
  </div>
  )};

export default ApplicationPopup;
