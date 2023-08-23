import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";

interface IBreadcrumb {
  currentPath: string
}

const Breadcrumb = ({ currentPath }: IBreadcrumb) => {
  const getOnlyTheNameOfCurrentPath = currentPath.slice(1);
  return (
    <Grid container>
      <Grid item xs={12} sx={{ mb: "35px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="text.secondary" href="/">accueil</Link>
          <Typography color="text.primary">{getOnlyTheNameOfCurrentPath}</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  )
}

export default Breadcrumb;