export const generatePageButtons = (totalPages, currentPage) => {
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (value, index) => index + 1);
  } else {
    if (currentPage <= 5) {
      return Array.from({ length: 10 }, (value, index) => index + 1);
    } else if (currentPage >= totalPages - 4) {
      return Array.from(
        { length: 10 },
        (value, index) => totalPages - 9 + index
      );
    } else {
      return Array.from(
        { length: 10 },
        (value, index) => currentPage - 5 + index
      );
    }
  }
};