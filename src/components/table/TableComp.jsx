import * as React from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseIcon from '@mui/icons-material/Close';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import CheckIcon from '@mui/icons-material/Check';
import { visuallyHidden } from '@mui/utils';
import ApplicationPopup from '../applicationPopup/ApplicationPopup';
import { 
  Divider, 
  CircularProgress,
  Snackbar,
  Alert as MuiAlert } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import serverLink from '../../serverLink';


function createData( name, organization, course, age, city, gender, nationality) {
  return { 
    name,
    organization,
    course,
    age,
    city,
    gender,
    nationality
  };
}

let rows = [];

// const rows = [
//   createData('Salmon Bhoi', 305, "salmong@gmail.com", 67),
//   createData('Ram Mohan', 452, "rammohan@gmail.com", 51),
//   createData('Nitin Ghagare', 262, "nitinghagare@gmail.com", 24),
//   createData('Kabir Upreti', 159, "kabirUpreti@gmail.com", 24),
//   createData('Samyak Chakrabarty', 356, "samyak@xbillionlabs.com", 49),
//   createData('Gaurav Jain', 408, "gaurav@xbillionskillslab.com", 87),
//   createData('Soumya Singh', 237, "soumyasingh@gmail.com", 37),
//   createData('Nadeem', 375, "nadeem@xbillionskillslab.com", 94),
//   createData('Janhavi Banka', 518, "janhavi@xbillionskillslab.com", 65),
//   createData('Anchal Yadav', 392, "anchal@xbillionskillslba.com", 98),
//   createData('Vishal Shendi', 318, "vishalshendi@gmail.com", 81),
//   createData('Anuj Nirmal', 360, "anuj@worldceo.com", 9,),
//   createData('Kiyara', 437,"kiyaramybabu@gmail.com", 63),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'organization',
    numeric: true,
    disablePadding: false,
    label: 'Organization/Institute',
  },
  {
    id: 'course',
    numeric: true,
    disablePadding: false,
    label: 'Course/Designation',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'age',
  },
  {
    id: 'city',
    numeric: true,
    disablePadding: false,
    label: 'city',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'nationality',
    numeric: true,
    disablePadding: false,
    label: 'Nationality',
  },
  {
    id: 'accepted',
    numeric: true,
    disablePadding: false,
    label: 'Accept/Reject',
  }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          /> */}
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            //sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected, totalAppCount } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      
      <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Applications
        </Typography>
     

        <Typography
          sx={{ 
            flex: '0 1 10%',  
            textAlign: 'right',
            paddingRight: '6px'
        }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
           Total : {totalAppCount}
        </Typography>
      
       

      {numSelected > 0 && (
        <Tooltip title="Accept">
          <IconButton>
            <CheckIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable( props ) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [totalAppCount, settotalAppCount] = React.useState();
  const [applicationDataAll, setApplicationDataAll] = React.useState();
  const [compReload, setCompReload] = React.useState('');
  const [appReload, setAppReload] = React.useState(props.appReload);
  const [applicationReload, setApplicationReload] = React.useState(props.applicationReload);
  const [loader, setLoader] = React.useState({
    "rejectLoader": false,
    "acceptLoader": false
});

const [open, setOpen] = React.useState(props.openUp);
const [accepted, setAccepted] = React.useState(false);
const[disableBtn, setdisableBtn] = React.useState(false);
const [openSnackBar, setOpenSnackBar] = React.useState(false);
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

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([navigate]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleSnackBarClick = () => {
    setOpenSnackBar(true);
};


  let navigate = useNavigate();

  const url = window.location.pathname.split('/').pop();


  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;



  React.useEffect(() => {
    const token = window.localStorage.getItem("token").toString(); 
    getApplicationData(token);
},[navigate, compReload, setOpen])


const getApplicationData = async (token) => {

    const authAxios = axios.create({
        baseURL: serverLink,
        headers: {
            'x-access-token': token
        }
    })   
    try{
      const currPage = props.page;
      if(currPage == "accepted"){
          const result = await authAxios.post(`/api/admin/accepted`)
          .then((value) =>{
            console.log("Form Result" + value)
            rows = [];
              settotalAppCount(value.data.totalCount)
              setApplicationDataAll(value.data.applications);
              
              for (var i = 0; i < value.data.applications.length; i++){
                rows.push(
                  createData(
                    value.data.applications[i].first_name,
                    value.data.applications[i].institution,
                    value.data.applications[i].course,
                    value.data.applications[i].age,
                    value.data.applications[i].city,
                    value.data.applications[i].gender, 
                    value.data.applications[i].nationality,
                  ),
                )
              }

              setCompReload(uuidv4());
          })
      }

      if(currPage == "application"){
        const result = await authAxios.post(`/api/admin/application`)
        .then((value) =>{
            settotalAppCount(value.data.totalCount)
            setApplicationDataAll(value.data.applications);
            
            rows = [];
            for (var i = 0; i < value.data.applications.length; i++){
              rows.push(
                createData(
                    `${value.data.applications[i].first_name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())} ${value.data.applications[i].last_name.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())}`,
                    value.data.applications[i].institution.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
                    value.data.applications[i].course.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
                    value.data.applications[i].age,
                    value.data.applications[i].city.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
                    value.data.applications[i].gender.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()), 
                    value.data.applications[i].nationality.toLowerCase().replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase()),
                ),
              )
            }

            setCompReload(uuidv4());
        })
      }
        

    }
    catch (err) {
        console.log(err);
    }     
}

  function removeAcceptedArray(curId) {
    setCompReload(uuidv4());
  }


  
  const setStatusChange = async ( event, index ) => {

    const butClick = event.target.id;
    console.log(butClick)

    const curUserSelectedData = applicationDataAll[index + (page * 25)]._id;  
    
    console.log(curUserSelectedData)

    
    
    const token = window.localStorage.getItem("token").toString(); 
    
    const authAxios = axios.create({
        baseURL: serverLink,
        headers: {
            'x-access-token': token
        }
    })   
    try{

        if(butClick == "accept"){   
            setAccepted(false)              
            setLoader({
                "rejectLoader": false,
                "acceptLoader": true
            })  

                setdisableBtn(true)

            const result = await authAxios.post(`/api/admin/application/status`, {
                "acceptId": curUserSelectedData,
                "statusChange": "A"
            }).then((value) => {
                setLoader({
                    "rejectLoader": false,
                    "acceptLoader": false
                })  

                setdisableBtn(false)
                sortApplicants();
                setOpen(false)
                setAccepted(true)
                setOpenSnackBar(true)
               
            })     
            // const {acceptedCount, appCount, contactCount} = result.data;
        }

        if(butClick == "reject"){    
            setAccepted(false)
            setLoader({
                "rejectLoader": true,
                "acceptLoader": false
            })   

            setdisableBtn(true)

            const result = await authAxios.post(`/api/admin/application/status`, {
                "acceptId": curUserSelectedData,
                "statusChange": "R" 
            }).then((value) => {
                setLoader({
                    "rejectLoader": false,
                    "acceptLoader": false
                }) 
                setdisableBtn(false);  
                setOpen(false);
                setOpenSnackBar(true);
                sortApplicants();
            });     
            // const {acceptedCount, appCount, contactCount} = result.data;
        }
      
    }
    catch (err) {
        console.log(err);
    }     

    
}

function sortApplicants(){
    props.reSort(props.curId)
    console.log(props.curId)
}



  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} totalAppCount={totalAppCount} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              // onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                      sx={{
                        cursor: 'pointer'
                      }}
                    >
                       <TableCell 
                         type="checkbox"
                      >
                       
                      </TableCell> 
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.organization}</TableCell>
                      <TableCell align="right">{row.course}</TableCell>
                      <TableCell align="right">{row.age}</TableCell>
                      <TableCell align="right">{row.city}</TableCell>
                      <TableCell align="right">{row.gender}</TableCell>
                      <TableCell align="right">{row.nationality}</TableCell>
                      <TableCell align="right">
                        {/* <Button 
                         
                          onClick={() => {
                            setAppPopup(true)
                          }}
                        >
                          View
                        </Button> */}
                        <div className="accept-reject-button-holder">
                         
                          <Button  
                            disabled={disableBtn} 
                            onClick={(event) => (setStatusChange(event, index))}  
                            sx={{width: "70px", height: "37px"}} 
                            variant="text" 
                            id="accept"
                            className="accept-reject-button"
                          >
                            {loader.acceptLoader ? <CircularProgress color="primary" size="28px"/>: "Accept"}
                          </Button>

                          <Button 
                            onClick={(event) => (setStatusChange(event, index))} 
                            sx={{width: "70px", height: "37px"}} 
                            variant="text" 
                            color="secondary" 
                            id="reject"
                            disabled={disableBtn}
                            className="accept-reject-button"
                          >
                            {loader.rejectLoader ? <CircularProgress color="primary" size="28px"/>: "Reject"}
                          </Button>


                        </div>

                      {/* Popup Here */}
                        {/* <ApplicationPopup 
                          curId={index} 
                          info={row}
                          appData={applicationDataAll}
                          reSort={removeAcceptedArray}
                        /> */}

                        {/* <Button 
                          variant="contained"
                          sx={{
                            margin: '0px 8px'
                          }}
                        >
                          <CheckIcon/>
                        </Button>
                        <Button variant="contained" color="error">
                          <CloseIcon /> 
                        </Button> */}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
    </Box>
  );
}
