import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./total-applicant.css"


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const TotalApplicant = () => {
  return (
    <div>
       <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: "#00b0ff" }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center'}} color="white" >
                            <p className="number-dashboard">35</p><span className="text-next-number">Applications</span>
                            </Typography>
                          </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: "#ff3d00" }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center'}} color="white" >
                              <p className="number-dashboard">50</p><span className="text-next-number">Emails</span>
                            </Typography>
                          </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={4}>
                        <Card sx={{ minWidth: 275, backgroundColor: "#4caf50" }}>
                          <CardContent>
                            <Typography sx={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center'}} color="white" >
                              <p className="number-dashboard">13</p><span className="text-next-number">Accepted</span>
                            </Typography>
                          </CardContent>
                        </Card>
                    </Grid>

                </Grid>
            </Box>
        
    </div>
  )
}

export default TotalApplicant
