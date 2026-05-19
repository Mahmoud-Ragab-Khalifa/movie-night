export function generatePagination(currentPage: number, totalPages: number) {
  const pages: (number | string)[] = [];

  // أول صفحة
  pages.push(1);

  // لو المستخدم بعيد عن البداية
  if (currentPage > 3) {
    pages.push("...");
  }

  // الصفحات حوالين current
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }

  // لو المستخدم بعيد عن النهاية
  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  // آخر صفحة
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
}
