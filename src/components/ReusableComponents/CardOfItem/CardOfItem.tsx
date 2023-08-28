import { useState } from "react";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { TWatchings, TReadings, TListenings } from "../../../types";

import "./CardOfItem.scss";
import ModalOfItem from "../ModalOfItem/ModalOfItem.tsx";

interface ICardOfItem {
  item: TWatchings | TReadings | TListenings
}

const CardOfItem = ({ item }: ICardOfItem) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <Card className="Card">
        <CardActionArea onClick={() => handleOpen()} sx={{ height: '100%' }}>
          <CardContent>
            <div className="ImageContainer">
              <img src={item.image} alt={`Affiche ${item.title}`} />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      <ModalOfItem item={item} open={open} handleClose={handleClose} />
    </>
  )
}

export default CardOfItem;