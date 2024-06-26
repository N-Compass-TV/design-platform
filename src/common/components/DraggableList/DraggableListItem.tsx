import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListItem, ListItemIcon } from "@mui/material";
import { MdDragIndicator } from "react-icons/md";
import { grey } from "@mui/material/colors";

export type Props = {
  id: string;
  index: number;
  content: string | JSX.Element;
  isSelected: boolean;
  isLastItem?: boolean;
  onClickItem?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
};

const DraggableListItem: FC<Props> = ({
  id,
  index,
  content,
  isSelected,
  isLastItem,
  onClickItem,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: any, snapshot: any) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            background: snapshot.isDragging ? "rgb(235,235,235)" : "inherit",
            justifyContent: "space-between",
            borderTop: "1px solid #bfbfbf45",
            borderBottom: isLastItem ? "1px solid #bfbfbf45" : "",
            alignItems: "start",
            p: 0,
          }}
          onClick={(event) => onClickItem && onClickItem(event, id)}
          endIcon
        >
          {content}
          <ListItemIcon
            {...provided.dragHandleProps}
            sx={{ position: "absolute", minWidth: 0, top: "11px", right: "10px" }}
          >
            <MdDragIndicator color={grey[900]}/>
          </ListItemIcon>
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;
