import Button from '@material-ui/core/Button';

export default function FormButton({ text }) {
  return (
    <Button variant='contained' color='secondary' type='submit'>
      {text}
    </Button>
  );
}
