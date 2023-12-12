import { useState } from "react";
import { Card, CardActionArea, CardContent } from "@mui/material";
import { TWatchings, TReadings, TListenings, Genre } from "../../../types";
import ModalOfItem from "../ModalOfItem/ModalOfItem.tsx";

import "./CardOfItem.scss";

interface ICardOfItem {
  item: TWatchings | TReadings | TListenings
  deleteItem: (id: number) => Promise<void>
  updateItem: (id: number, formValues: object) => Promise<void>
  genres: Genre[]
  status: Array<{ name: string }>
}

const CardOfItem = ({ item, deleteItem, updateItem, genres, status }: ICardOfItem) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* The card of the item */}
      <Card className="Card">
        <CardActionArea onClick={() => handleOpen()} sx={{ height: '100%' }}>
          <CardContent>
            <div className="ImageContainer">
              <img src={item.image} alt={`Affiche ${item.title}`} />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
      {/* Modal which opens after clicking on the card of the item */}
      <ModalOfItem
        item={item}
        open={open}
        handleClose={handleClose}
        deleteItem={deleteItem}
        updateItem={updateItem}
        genres={genres}
        status={status}
      />
    </>
  )
}

export default CardOfItem;