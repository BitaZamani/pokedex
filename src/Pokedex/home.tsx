import Card from "../UI/card";
import Pagination from "../UI/pagination";
import { IconSearch } from "@tabler/icons-react";
import Loader from "../UI/loader/loader";
import logo from "../assets/Pokedex.png";
import { useFetchData } from "../utils/customhooks/useFetchData";
import Error from "../UI/error";
const Home = () => {
  const {
    data,
    next,
    prev,
    fetchData,
    pages,
    page,
    loading,
    searchQuery,
    setSearchQuery,
    error,
  } = useFetchData();

  return (
    <div className="min-h-screen">
      <section className="bg-yellow-200 rounded-b-4xl h-[150px] sm:h-[200px]">
        <div className="flex justify-center items-center">
          <img src={logo} className="w-72" />
        </div>
        <div className="relative w-5/6 max-w-[400px] mx-auto">
          <input
            type="search"
            className="bg-white w-full p-0.5 ps-2 outline-none rounded-sm"
            value={searchQuery}
            placeholder="Search a pokemon."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute end-1.5 top-0.5">
            <IconSearch />
          </button>
        </div>
      </section>
      {loading ? (
        <Loader />
      ) : (
        <>
          {error !== "" ? (
            <Error msg={error} />
          ) : (
            <>
              <div className="flex-1">
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-5 w-10/12 mx-auto my-5">
                  {data.map((poke) => (
                    <Card
                      id={poke.id}
                      image={poke.image}
                      name={poke.name}
                      types={poke.types}
                    />
                  ))}
                </section>
              </div>
              <section className="my-5">
                <Pagination
                  fetchData={fetchData}
                  next={next}
                  prev={prev}
                  pages={pages}
                  page={page}
                />
              </section>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
