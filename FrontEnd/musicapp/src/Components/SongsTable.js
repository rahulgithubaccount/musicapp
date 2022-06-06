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
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Container, Grid } from '@mui/material';


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

  const theme = useTheme();

        
        const [songs,setsongs]= useState([])


  useEffect(() => {
 const getData =  setInterval(() => {
  axios.get('http://localhost:8000/getallsong',{
    headers:{
      'auth-token': JSON.parse(localStorage.getItem("auth-token"))
    }
  }).then(res=>{
setsongs(res.data.songs)
console.log(res.data)
  })  .catch(err => {
    console.log(err);
  })

   
 }, 1000);
  
   return ()=> clearInterval(getData)
  }, [])
  
      
   

        const deletehandle= async(_id)=>{
          await axios.delete(`http://localhost:8000/delete/${_id}`)
          .then((res)=>{
            console.log(res)
          }).catch((err)=>{
            console.log(err)
          })

        }



// const[user,setUser]= useState([])
  
// const getAllUser =async (id)=>{
//           const getalluser= await axios.get(`http://localhost:8000/getalluser/${id}`)
      

//           setUser(getalluser)
//           console.log(getalluser.data + "hello")
//         }

  return (
<>


{



  songs.length === 0 ? <h3 style={{  marginTop:"100px",marginLeft:"200px" }}> Playlist is Empty ! Please Create Your Own PlayList  </h3>:


<Container maxWidth="xxl" sx={{ bgcolor: "#f9f9f9", mt: "90px",pb:"30px" }}>
        <Container fixed>

          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {songs && songs.map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item}>

                <Card sx={{ Width: "100%",height:"180px" }}>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
          <p style={{fontSize:"14px"}}>{item.image.slice(15,40)}</p>
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
         
        </Box>
      </Box>
      <DeleteIcon   onClick={()=>deletehandle(item._id)}/>
      <CardMedia
        component="img"
      style={{width:"200px",height:"194px", position:"relative",top: "-186px",left:'185px'}}
        image="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80"
        alt="Live from space album cover"
      />

 </Card>
 </Grid>
                ))}
          </Grid>


        </Container>

      </Container>
    }
    </>
  );
}
