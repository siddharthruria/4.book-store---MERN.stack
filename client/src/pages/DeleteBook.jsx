import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import {useSnackbar} from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const deleteBookFunc = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("book deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("some error occurred :/", { variant: "error" });
        console.log({ error: error });
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] px-8 mx-auto p-10">
        <h3 className="text-2xl mb-4">
          Are you sure you want to delete this book?
        </h3>
        <button
          className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg border-2 border-red-600"
          onClick={deleteBookFunc}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;