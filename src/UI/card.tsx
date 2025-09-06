import { NavLink } from "react-router-dom";
import { findColor } from "../utils/helpers/findColor";
import { CardProps } from "../types/types";

const Card = ({ name, image, id, types }: CardProps) => {
  return (
    <NavLink
      to={`pokemon/${name}`}
      key={id}
      style={{
        background: findColor({ types }),
        padding: "3px",
      }}
      className="col-span-1 w-full max-w-[230px] mx-auto h-[200px] rounded-2xl transition-all duration-500 group relative"
    >
      <div className="bg-white h-full rounded-2xl">
        <div className="flex justify-center items-center mx-auto group-hover:scale-125 rounded-full size-32 transition-all duration-700 pt-5">
          <img src={image} className="size-24" />
        </div>
        <div className="text-center">
          <div className="space-x-2 px-5">
            <span className="capitalize">{name}</span>
            <span>#{id}</span>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
