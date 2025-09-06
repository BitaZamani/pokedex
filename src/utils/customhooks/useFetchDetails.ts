import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardProps, Details, Results } from "../../types/types";

export const useFetchDetails = () => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";
  const params = useParams();

  const [detail, setDetail] = useState<Details | null>(null);
  const [data, setData] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);
  const [pages, setPages] = useState(0);
  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      const results: Results[] = res.data.results;

      const neededRes: CardProps[] = await Promise.all(
        results.map(async (result) => {
          const details = await axios.get(result.url);
          return {
            id: details.data.id,
            name: details.data.name,
            image: details.data.sprites.other["official-artwork"].front_default,
            types: details.data.types,
          };
        })
      );
      const queries = new URL(url).searchParams;
      const offset = queries.get("offset");
      const thisPage = offset ? Number(offset) / 20 + 1 : 1;
      setPage(thisPage);
      const count = res.data.count;
      setPages(Math.ceil(count / 20));
      setNext(res.data.next);
      setPrev(res.data.previous);
      setData(neededRes);
      setSearchQuery("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchDetails = async (name: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/${name}`);
      setDetail(res.data);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const search = async (query: string, pageNum: number) => {
    try {
      setLoading(true);
      const offset = (pageNum - 1) * 20;
      const res = await axios.get(`${apiUrl}?offset=${offset}&limit=20`);
      let results: Results[] = res.data.results;

      results = results.filter((result) =>
        result.name.toLowerCase().includes(query.toLowerCase())
      );

      const neededRes: CardProps[] = await Promise.all(
        results.map(async (result) => {
          const details = await axios.get(result.url);
          return {
            id: details.data.id,
            name: details.data.name,
            image: details.data.sprites.other["official-artwork"].front_default,
            types: details.data.types,
          };
        })
      );

      setData(neededRes);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.name) {
      fetchDetails(params.name);
    }
  }, [params.name]);

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      const timer = setTimeout(() => search(searchQuery, page), 300);
      return () => clearTimeout(timer);
    } else {
      fetchData(`${apiUrl}?offset=${(page - 1) * 20}`);
    }
  }, [searchQuery, page]);

  return {
    detail,
    data,
    loading,
    searchQuery,
    setSearchQuery,
    next,
    prev,
    pages,
    page,
    fetchData,
    fetchDetails,
  };
};
