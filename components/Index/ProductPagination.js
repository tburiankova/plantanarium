import { useRouter } from 'next/router';

function ProductPagination({ totalPages, currentPage }) {
  const router = useRouter();
  const firstPage = !currentPage;
  const lastPage = currentPage === totalPages;

  function goToPrev() {
    currentPage === 2
      ? router.push(`/store`)
      : router.push(`/store/?page=${currentPage - 1}`);
  }
  function goToNext() {
    firstPage
      ? router.push(`/store/?page=2`)
      : router.push(`/store/?page=${currentPage + 1}`);
  }

  return (
    <>
      <div className="pagination__wrapper">
        <button className="btn-cancel" onClick={goToPrev} disabled={firstPage}>
          Previous
        </button>
        <button className="btn-cancel" onClick={goToNext} disabled={lastPage}>
          Next
        </button>
      </div>
    </>
  );
}

export default ProductPagination;
