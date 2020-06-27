import { useRouter } from 'next/router';

function ProductPagination({ totalPages }) {
  const router = useRouter();
  return (
    <>
      <div className="pagination__wrapper">
        <p onClick={() => router.push('/store/?page=2')}>2</p>
      </div>
    </>
  );
}

export default ProductPagination;
