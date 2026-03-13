import { usePaginationState } from "../model/store/pagination.store";

export default function Pagination() {
  const { total, page, setPage, limit } = usePaginationState();
  const pages = Array.from({ length: total / limit }, (_, i) => i + 1);

  const buttonStyles =
    "rounded-lg py-2 px-4 shadow-lg hover:bg-cyan-500 transition-colors text-white";

  const handlePrev = () => setPage(page - 1);
  const handleNext = () => setPage(page + 1);

  return (
    <nav className="bg-primary-color/5 mt-15 p-3 flex justify-center rounded-lg gap-3 items-center transition-colors duration-500">
      {page > 1 && (
        <button className={`${buttonStyles} bg-slate-500`} onClick={handlePrev}>
          &laquo;
        </button>
      )}

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`${buttonStyles} ${
            p === page
              ? "bg-cyan-800 text-white cursor-not-allowed"
              : "bg-slate-800 "
          }`}
        >
          {p}
        </button>
      ))}

      {page + 1 < total / limit && (
        <button className={`${buttonStyles} bg-slate-500`} onClick={handleNext}>
          &raquo;
        </button>
      )}
    </nav>
  );
}
