export default function Paginations({ handlePageChange, filters, data }) {
  const totalPages = data?.data?.length || 1; //
  const maxButtons = 5;
  const currentPage = filters?.page;

  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="mt-6 flex justify-center items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page Buttons */}
      {pageNumbers?.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
