import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";

const Readings = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="text.secondary" href="/">Accueil</Link>
          <Typography color="text.primary">Lectures</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={2}>
        Nav bouquins
      </Grid>
      <Grid item xs={10}>
        La liste des bouqs'
      </Grid>
    </Grid>
  )
}

export default Readings;