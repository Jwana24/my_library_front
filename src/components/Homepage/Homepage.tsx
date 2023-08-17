import { Card, CardActionArea, CardContent } from "@mui/material";
import Book from "../../assets/book.png";
import Claper from "../../assets/clapper.png";
import Music from "../../assets/music-album.png";

import "./Homepage.scss";

const Homepage = () => {
  return (
    <div className="Homepage">
      <h1>Bibliothèque personnelle</h1>
      <div>
        <Card className="Card">
          <CardActionArea href="/readings">
            <CardContent>
              <img src={Book} alt="Book icon" />
              <h2>Lectures</h2>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="Card">
          <CardActionArea href="/watchings">
            <CardContent>
              <img src={Claper} alt="Claper icon" />
              <h2>Visionnages</h2>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="Card">
          <CardActionArea href="/listenings">
            <CardContent>
              <img src={Music} alt="Music album icon" />
              <h2>Sons</h2>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  )
}

export default Homepage;