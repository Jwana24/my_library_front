import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import Book from "../../assets/book.png";
import Claper from "../../assets/clapper.png";
import Music from "../../assets/music-album.png";

import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="Homepage">
      <h1>Bibliothèque personnelle</h1>
      <Grid container flexDirection="row" justifyContent="center">
        <Grid item xs={3}>
          <Card className="Card">
            <CardActionArea href="/lecture">
              <CardContent>
                <img src={Book} alt="Book icon" />
                <h2>Lectures</h2>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className="Card">
            <CardActionArea href="/visionnage">
              <CardContent>
                <img src={Claper} alt="Claper icon" />
                <h2>Visionnages</h2>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className="Card">
            <CardActionArea href="/ecoute">
              <CardContent>
                <img src={Music} alt="Music album icon" />
                <h2>Sons</h2>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Homepage;