import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Details } from "../../types/types";

export const useFetchDetails = () => {
  const apiUrl = "https://pokeapi.co/api/v2/pokemon";
  const params = useParams();

  const [detail, setDetail] = useState<Details | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const fetchDetails = async (name: string) => {
    try {
      setLoading(true);
      const res = await axios.get(`${apiUrl}/${name}`);
      setDetail(res.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.name) {
      fetchDetails(params.name);
    }
  }, [params.name]);

  return {
    detail,
    loading,
    searchQuery,
    setSearchQuery,
    fetchDetails,
    error,
  };
};
