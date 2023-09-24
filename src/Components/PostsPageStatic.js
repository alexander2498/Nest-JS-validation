import {Button, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

export default function PostsPageStatic() {
  return (
    <Grid
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      style={{
        marginBottom: '20px'
      }}
    >
      <Typography fontSize={'24px'}>This is a page of all posts in stock</Typography>
      <Link to={'new'}>
        <Button size={'large'} variant="outlined">
          + Add new
        </Button>
      </Link>
    </Grid>
  )
}