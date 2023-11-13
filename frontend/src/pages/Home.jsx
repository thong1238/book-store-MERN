import Spinner from "../components/Spinner";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
import { MdOutlineAddBox } from "react-icons/md";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [showType, setShowType] = useState(() => {
    const savedShowType = localStorage.getItem("showType");
    return savedShowType ? savedShowType : "table";
  });
  const [itemsPerPage, setItemPerPage] = useState(7);
  const [itemStart, setItemStart] = useState(() => {
    const savedItemStart = localStorage.getItem("itemStart");
    return savedItemStart ? savedItemStart : 0;
  });

  const pageCount = Math.ceil(totalPage / itemsPerPage);

  useEffect(() => {
    localStorage.setItem("showType", showType);
  }, [showType]);

  useEffect(() => {
    localStorage.setItem("itemStart", itemStart);
  }, [itemStart]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/books")
  //     .then((res) => {
  //       setBooks(res.data.data);
  //       setTotalPage(res.data.count);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       setLoading(false);
  //     });
  // }, []);
  const link1 = "http://localhost:8080/books";
  const link2 = `http://localhost:8080/books?itemStart=${itemStart}&itemsPerPage=${itemsPerPage}`;

  useEffect(() => {
    setLoading(true);
    axios
      .get(link2)
      .then((res) => {
        setBooks(res.data.data);
        setTotalPage(res.data.count);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  }, [itemStart]);

  const handlePageClick = (e) => {
    const newItemStart = e.selected * itemsPerPage;
    setItemStart(newItemStart);
  };
  return (
    <div>
      <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
          <button
            onClick={() => setShowType("table")}
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          >
            Table
          </button>
          <button
            onClick={() => setShowType("card")}
            className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          >
            Card
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-3">List Book</h1>
          <Link to={"/books/create"}>
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : showType === "table" ? (
          <BookTable books={books} itemStart={itemStart} />
        ) : (
          <BookCard books={books} />
        )}
      </div>
      <ReactPaginate
        className="flex flex-row justify-center items-center gap-4 fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-[#f6f6f6] p-4 rounded-full shadow-lg"
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="Previous"
        pageClassName="px-2 py-1 rounded-full"
        pageLinkClassName="text-white-500  "
        previousClassName="px-2 py-1 rounded-full"
        previousLinkClassName="text-white-500"
        nextClassName="px-2 py-1 rounded-full"
        nextLinkClassName="text-white-500"
        breakLabel="..."
        breakClassName="px-2 py-1 rounded-full"
        breakLinkClassName="text-white-500"
        containerClassName="pagination"
        activeClassName="bg-red-500 text-white"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Home;
