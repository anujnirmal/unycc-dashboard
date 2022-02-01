import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import TableComp from '../table/TableComp';
import { v4 as uuidv4 } from 'uuid';
import {
    Box,
    Paper,
    Grid,
    Button
} from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Accepted = (props) => {
    const [page, setPage] = useState("accepted");
    // const [randomId, setRandomId] = useState(props.reload);



  return (
    <div>
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant="outlined">Download List</Button>
                </Grid>
                <Grid item xs={12}>
                    <TableComp page={page}  appReload={props.reload}/>
                </Grid>
            </Grid>
        </Box>
    </div>
)};

export default Accepted;
