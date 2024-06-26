import { FC, useEffect, useRef, useState } from "react";
import { RegularPolygon, Transformer } from "react-konva";
import { KonvaElementType } from "../../../../app/types/KonvaTypes";

const TriangleElement: FC<KonvaElementType> = (element) => {
  const elementRef = useRef<any>();
  const trRef = useRef<any>();

  useEffect(() => {
    if (element.isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([elementRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [element.isSelected]);

  return (
    <>
      <RegularPolygon
        ref={elementRef}
        draggable
        fill={element.fill}
        width={element.width}
        height={element.height}
        radius={element.radius ?? 0}
        sides={element.sides || 3}
        x={element.x}
        y={element.y}
        stroke={element.stroke}
        strokeWidth={element.strokeWidth}
        onDragEnd={(e) => {
          element.onChange &&
            element.onChange({
              ...element,
              x: e.target.x(),
              y: e.target.y(),
            });
        }}
        onClick={element.onSelect}
        onTap={element.onSelect}
        onTransformEnd={(e) => {
          const node = elementRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          element.onChange &&
            element.onChange({
              ...element,
              width: Math.max(20, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
        }}
      />
      {element.isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 20 || Math.abs(newBox.height) < 20) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};

export default TriangleElement;
