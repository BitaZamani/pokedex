import { useFetchDetails } from "../utils/customhooks/useFetchDetails";
import Bar from "../UI/bar";
import { findColor } from "../utils/helpers/findColor";
import { Abilities, Stats, Types } from "../types/types";
import Loader from "../UI/loader/loader";
import Error from "../UI/error";

const Detail = () => {
  const { detail, loading, error } = useFetchDetails();

  if (loading) return <Loader />;
  if (error) return <Error msg={error} />;
  if (detail) {
    return (
      <div
        className="min-h-screen flex justify-center items-center relative"
        style={{
          backgroundImage: findColor({ types: detail.types }),
          backgroundColor: findColor({ types: detail.types }),
        }}
      >
        <div className="rounded-b-full flex justify-center items-center p-4 absolute  w-full -top-24 z-10 right-0 translate-y-1/2">
          <img
            src={detail.sprites.other["official-artwork"].front_default}
            className="size-40 "
          />
        </div>
        <div className="w-5/6 max-w-[500px] overflow-y-auto mx-auto  bg-gray-50 pt-20  px-7 text-center">
          <div className="text-2xl font-bold capitalize space-x-1.5">
            <span>{detail.name}</span>
            <span className="font-medium">#{detail.id}</span>
            <div className="py-2 leading-1">
              {detail.types.map((type: Types) => (
                <span
                  key={type.slot}
                  style={{ background: findColor({ name: type.type.name }) }}
                  className="px-5 py-1 mr-2 rounded-lg text-gray-100 text-xs"
                >
                  {type.type.name}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between w-full gap-5 font-semibold my-4">
            <div className="flex flex-col w-full ">
              <span>Weight</span>
              <span className="bg-gray-200 rounded-sm px-2 py-0.5 font-extralight">
                {detail.weight}kg
              </span>
            </div>
            <div className="flex flex-col w-full">
              <span>Height</span>
              <span className="bg-gray-200 rounded-sm px-2 py-0.5 font-extralight">
                {detail.height}m
              </span>
            </div>
          </div>
          <div className="my-4">
            <h3 className="font-semibold">Abilities</h3>
            <div className="flex justify-between w-full gap-5">
              {detail.abilities.map((ability: Abilities) => (
                <span
                  key={ability.slot}
                  className="px-2 py-1 w-full rounded-sm bg-gray-200"
                >
                  {ability.ability.name.replace("-", " ")}
                </span>
              ))}
            </div>
          </div>
          <div className="my-4">
            <h3 className="font-semibold">Stats</h3>
            {detail.stats.map((stat: Stats, index: number) => (
              <div
                key={index}
                className="flex justify-between py-2 leading-4 text-sm text-start"
              >
                <div className="capitalize flex items-center gap-1 w-1/2 sm:w-1/4">
                  {stat.stat.name.replace("-", " ")}
                </div>
                <div className="flex gap-2 w-1/2 mr-3">
                  <Bar num={stat.base_stat} />
                  {stat.base_stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default Detail;
