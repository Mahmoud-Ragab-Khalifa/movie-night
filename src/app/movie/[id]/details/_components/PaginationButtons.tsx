"use client";

import { generatePagination } from "@/lib/generatePagination";
import { useRouter } from "next/navigation";

type PaginationButtonsProps = {
  movieId: number;
  currentPage: number;
  totalPages: number;
};

const PaginationButtons = ({
  movieId,
  currentPage,
  totalPages,
}: PaginationButtonsProps) => {
  const router = useRouter();

  const pages = generatePagination(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    router.replace(`/movie/${movieId}/details?page=${page}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-8 md:mt-16">
      {/* Prev */}
      <button
        disabled={+currentPage === 1}
        onClick={() => handlePageChange(+currentPage - 1)}
        className="glass h-8 px-5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 shadow-surface shadow-2xl hover:bg-primary/20"
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((page, index) => {
        const isActive = +currentPage === +page;

        return (
          <button
            key={`${page}-${index}`}
            onClick={() => {
              if (typeof page === "number") {
                handlePageChange(page);
              }
            }}
            className={`fully-rounded-btn rounded-lg! transition-all duration-300 ${isActive ? "bg-primary text-white" : "bg-secondary text-neutral-300 hover:bg-primary/20"}`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={+currentPage === +totalPages}
        onClick={() => handlePageChange(+currentPage + 1)}
        className="glass h-8 px-5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all duration-300 shadow-surface shadow-2xl hover:bg-primary/20"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationButtons;
