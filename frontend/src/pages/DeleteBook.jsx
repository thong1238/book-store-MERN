import Spinner from "../components/Spinner";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8080/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Delete a book successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.message);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}

      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">{`Are you sure to delete book: ${title}?`}</h3>

        <button
          onClick={handleDeleteBook}
          className="bg-red-600 p-4 text-white m-8 w-full rounded-lg text-xl"
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
