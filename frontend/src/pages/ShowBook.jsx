import Spinner from "../components/Spinner";
import axios from "axios";
import BackButton from "../components/BackButton";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 ">Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
          <div className="my -4">
            <span className="text-xl mr-4 text-gray-500">Id</span>
            <span>{book._id}</span>
          </div>
          <div className="my -4">
            <span className="text-xl mr-4 text-gray-500">Title</span>
            <span>{book.title}</span>
          </div>
          <div className="my -4">
            <span className="text-xl mr-4 text-gray-500">Author</span>
            <span>{book.author}</span>
          </div>
          <div className="my -4">
            <span className="text-xl mr-4 text-gray-500">Publish Year</span>
            <span>{book.publishYear}</span>
          </div>
          <div className="my -4">
            <span className="text-xl mr-4 text-gray-500">Create Time</span>
            <span>
              {new Date(book.createdAt)
                .toLocaleString("vi-VN", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .toString()}
            </span>
          </div>
          <div className="my -4">
            <span className="text-xl mr-4 text-gray-500">Last Update Time</span>
            <span>
              {new Date(book.updatedAt)
                .toLocaleString("vi-VN", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
                .toString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
