function Loading() {
  return (
    <>
      <div className="loading__wrapper">
        <svg
          className="spinner"
          width="30px"
          height="30px"
          viewBox="0 0 66 66"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="path"
            fill="none"
            stroke-width="3"
            stroke-linecap="round"
            cx="33"
            cy="33"
            r="30"
          ></circle>
        </svg>
      </div>
    </>
  );
}

export default Loading;
