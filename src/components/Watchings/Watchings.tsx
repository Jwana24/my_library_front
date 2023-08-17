import { Breadcrumbs, Grid, Link, Typography } from "@mui/material";
import Movie from "../../assets/film.png";
import Serie from "../../assets/serie.png";
import Animes from "../../assets/animes.png";
import Shows from "../../assets/tv.png";
import "./Watchings.scss";

const Readings = () => {
  return (
    <Grid container>
      <Grid item xs={12} className="BreadcrumbContainer">
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="text.secondary" href="/">Accueil</Link>
          <Typography color="text.primary">Visionnages</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid item xs={2} className="GeneralGrid">
        <Grid container className="MenuGrid">
          <Grid item xs={12}>
            <img src={Movie} alt="Movie icon" />
            <Link>Films</Link>
          </Grid>
          <Grid item xs={12} className="MenuTitle">
            <img src={Serie} alt="Serie icon" />
            Séries
          </Grid>
          <Grid item xs={12} className="MenuSubtitle">
            <small>abc</small><Link>françaises</Link>
          </Grid>
          <Grid item xs={12} className="MenuSubtitle">
            <small>あ</small><Link>japonaises</Link>
          </Grid>
          <Grid item xs={12} className="MenuSubtitle">
            <small>ㅏ</small><Link>coréennes</Link>
          </Grid>
          <Grid item xs={12}>
            <img src={Animes} alt="Japanese animes icon" />
            <Link>Animes</Link>
          </Grid>
          <Grid item xs={12}>
            <img src={Shows} alt="TV shows icon" />
            <Link>Émissions TV</Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={10} className="GeneralGrid">
        Liste des trucs à voir
      </Grid>
    </Grid>
  )
}

export default Readings;