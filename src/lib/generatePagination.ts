export const generatePagination = (currentPage: number, totalPages: number) => {
  const maxButtons = 5;

  if (totalPages <= maxButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));

  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = totalPages - maxButtons + 1;
  }

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );
};
