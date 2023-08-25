import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { TWatchings, TReadings, TListenings } from "../../../types";
import { getLocationPathname } from "../../../utils/hooks";
import "./CardOfItem.scss";

interface ICardOfItem {
  item: TWatchings | TReadings | TListenings
}

const CardOfItem = ({ item }: ICardOfItem) => {
  return (
    <Card className="Card">
      <CardActionArea href={`${getLocationPathname()}/${item.id}`} sx={{ height: '100%' }}>
        <CardContent>
          <img src={item.image} alt={`Affiche ${item.title}`} />
          <Typography variant="h6">{item.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardOfItem;