import {Alert, Button, Grid, Snackbar, Typography} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import {Form} from "react-router-dom";
import InputField from "./InputField";

const textFieldStyle = {
  width: '80vw',
  padding: '2%',
}

const formStyle = {
  border: '2px solid black',
  width: "84vw",
  padding: '2%'
}
export default function NewPostPage() {
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  
  const [name, setName] = useState({
    label: 'Name',
    value: '',
    helperText: 'Post name, required, 64 max',
    required: true,
    rules: [
      {name: "Max length", rule: (e) => e.length >= 1 && e.length <= 64},
    ],
    errors: []
  });
  const [desc, setDesc] = useState({
    label: 'Description',
    value: '',
    helperText: 'Description, 255 max',
    required: false,
    multiline: true,
    rules: [{name: "Max length", rule: (e) => e.length <= 255}],
    errors: []
  });
  const [author, setAuthor] = useState({
    label: 'Author',
    value: '',
    helperText: 'Author, required, email, 64 max',
    required: true,
    rules: [
      {
        name: "Max length",
        rule: (e) => e.length >= 1 || e.length <= 64
      },
      {
        name: "Email",
        rule: (e) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)
      }
    ],
    errors: [],
    cols: 6
  });
  const [rating, setRating] = useState({
    label: 'Rating',
    value: 0,
    helperText: 'Rating, required, 1 to 5 range',
    required: true,
    rules: [
      {name: "Range", rule: (e) => e >= 1 && e <= 5},
    ],
    errors: [],
    cols: 6
  });
  
  const [errors, setErrors] = useState([]);
  const fields = [
    {field: name, setField: setName},
    {field: desc, setField: setDesc},
    {field: author, setField: setAuthor},
    {field: rating, setField: setRating}
  ];
  
  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    if (fields.some(x => x.field.errors.length)) return;
    
    try {
      await axios.post('http://localhost:8080', {
        name: name.value,
        description: desc.value,
        author: author.value,
        rating: rating.value,
      });
      setSuccessSnackbar(true);
    } catch (e) {
      const message = e.response.data.message;
      if (typeof message === 'string') {
        setErrors([message]);
      } else {
        setErrors(message);
      }
    }
  }
  
  const renderedErrors = [
    ...fields.reduce((a, x) => {
      x.field.errors.forEach(err => {
        a.push(<div>ERROR FOR FIELD {x.field.label}: {err}</div>)
      })
      return a;
    }, []),
    ...errors.map(x => <div key={x}>{x}</div>)
  ];
  
  const renderedInputFields = fields.map(x =>
    <Grid key={x.field.label} display={'flex'} item xs={x.field.cols || 12} justifyContent={'center'} style={textFieldStyle}>
      <InputField field={x.field} setField={x.setField}/>
    </Grid>
  )
  
  return (
    <>
      <Grid display={'flex'} alignItems={'center'} justifyContent={'space-between'} flexDirection={'column'}>
        <Typography fontSize={'24px'}>
          Write your post to the form below
        </Typography>
        <Form display={'flex'} onSubmit={onSubmit} style={formStyle}>
          <Grid container>
          {renderedInputFields}
          </Grid>
          <Grid display={'flex'} justifyContent={'center'} style={textFieldStyle}>
            <Button
              variant={'outlined'}
              type={'submit'}
              style={{
                width: '15vw',
                marginTop: '10px',
              }}
            >
              Submit
            </Button>
          </Grid>
        </Form>
        <Typography fontSize={'24px'}>
          {renderedErrors}
        </Typography>
        <Snackbar open={successSnackbar} autoHideDuration={6000} onClose={() => setSuccessSnackbar(false)}>
          <Alert onClose={() => setSuccessSnackbar(false)} severity="success" sx={{width: '100%'}}>
            Post successfully added
          </Alert>
        </Snackbar>
      </Grid>
    </>
  )
}