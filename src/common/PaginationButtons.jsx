import { Link } from "react-router-dom";

const PaginationButtons = ({
  currentPage,
  totalPages = 11,
  nextEnabled = true,
}) => {
  const isNextEnabled = currentPage < totalPages && nextEnabled;

  const isPrevEnabled = currentPage > 0;

  return (
    <div
      className="pagination-form"
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "50px",
        padding: "4px",
        background: "#f8f9fa",
        borderRadius: "10px",
      }}
    >
      <Link
        className={`btn text-decoration-none border-0 px-4 py-2 ${
          (currentPage < totalPages || currentPage === totalPages - 1) &&
          currentPage !== totalPages
            ? "me-3"
            : ""
        } ${!isPrevEnabled ? "btn-secondary disabled" : "btn-success"}`}
        to={
          isPrevEnabled
            ? currentPage <= 1
              ? "/"
              : `/page${currentPage - 1}`
            : "#"
        }
      >
        Zurück
      </Link>

      {currentPage === totalPages - 1 && currentPage !== totalPages && (
        <Link
          className={`btn text-decoration-none border-0 px-4 py-2 ${
            !isNextEnabled ? "btn-secondary disabled" : "btn-success"
          }`}
          to={isNextEnabled ? `/page${currentPage + 1}` : "#"}
          onClick={(e) => !isNextEnabled && e.preventDefault()}
        >
          Submit
        </Link>
      )}
      {currentPage !== totalPages - 1 && currentPage !== totalPages && (
        <Link
          className={`btn text-decoration-none border-0 px-4 py-2 ${
            !isNextEnabled ? "btn-secondary disabled" : "btn-success"
          }`}
          to={isNextEnabled ? `/page${currentPage + 1}` : "#"}
          onClick={(e) => !isNextEnabled && e.preventDefault()}
        >
          Nächste
        </Link>
      )}
    </div>
  );
};

export default PaginationButtons;
