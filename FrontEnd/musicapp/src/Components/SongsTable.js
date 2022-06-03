import React,{useState,useEffect} from 'react';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




  
export default function SongsTable() {

    useEffect(()=>{
   
        getdata();
       
        },[])

        
        const [songs,setsongs]= useState([])
        
        const getdata = async ()=>{
            const response = await axios.get('http://localhost:8000/getallsong',{
              headers:{
                'auth-token': JSON.parse(localStorage.getItem("auth-token"))
              }
            })
        setsongs(response.data.songs)
        
        console.log(response.data.songs)
        }


        const deletehandle= async(_id)=>{
          await axios.delete(`http://localhost:8000/delete/${_id}`)
          .then((res)=>{
            console.log(res)
          }).catch((err)=>{
            console.log(err)
          })
window.location.reload(true)
        }


// const[user,setUser]= useState([])


//         const getAllUser =async (id)=>{
//           const getalluser= await axios.get(`http://localhost:8000/getalluser/${id}`)
      

//           setUser(getalluser)
//           console.log(getalluser.data= "hello")
//         }

  return (
<>


    <TableContainer component={Paper}>



      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>S.no</StyledTableCell>
            <StyledTableCell align="center">Song Name</StyledTableCell>
            <StyledTableCell align="center">Singer Name</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((item,i) => (
            <StyledTableRow key={item.i}>
                <StyledTableCell component="th"   scope="row">
                {i+1}
              </StyledTableCell>

              <StyledTableCell component="th"  align="center" scope="row">
                {item.songName}
              </StyledTableCell>
              <StyledTableCell component="th" align="center" scope="row">
                {item.singerName}
              </StyledTableCell>

              <StyledTableCell component="th" align="center" scope="row">
                <button style={{border:"none", backgroundColor:"none"}} onClick={()=>deletehandle(item._id)}> <DeleteIcon  style={{ fill:"rgb(229 57 57)",  backgroundColor:"none" }}/> </button>
              </StyledTableCell>
        
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

     
    </TableContainer>
    </>
  );
}
