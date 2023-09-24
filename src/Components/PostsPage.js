import {
  Button, Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from "react";
import PostsPageStatic from "./PostsPageStatic";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0)
  
  const getPosts = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    const res = await fetch('http://localhost:8080/')
    const json = await res.json();
    setPosts(json);
  }
  
  useEffect(() => {
    getPosts();
  }, []);
  
  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id)
  }
  
  const handleClose = (id) => {
    setPosts(posts.filter(x => x.id !== id));
    setOpen(false);
  }
  const handleCloseNo = () => {
    setOpen(false);
  }
  
  if (!posts.length) {
    return (
      <>
        <PostsPageStatic/>
        <Typography>
          Here's no posts so far
        </Typography>
      </>
    );
  }
  
  const renderedCards = posts.map(x =>
    <Card key={x.id} style={{
      margin: '2px'
    }}>
      <CardContent >
        <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom component="div">
            {x.name}
          </Typography>
          <CardActions>
            <IconButton onClick={() => handleClickOpen(x.id)} aria-label="delete" size="small">
              <DeleteIcon variant="h5"/>
            </IconButton>
          </CardActions>
        </Grid>
        <Typography variant="h5">
          {x.description}
        </Typography>
        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
          {x.author}
        </Typography>
        <Typography>
          Rating: {x.rating}
        </Typography>
      </CardContent>
    </Card>
  )
  
  return (
    <>
      <PostsPageStatic/>
      {renderedCards.reverse()}
      <Dialog
        open={open}
      >
        <DialogTitle>
          Delete?
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose(id)}>yes</Button>
          <Button onClick={handleCloseNo}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}