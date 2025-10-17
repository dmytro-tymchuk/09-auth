import ReactPaginate from "react-paginate"
import css from "./Pagination.module.css"

type PaginationProps = {
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
}

const Pagination = ({ totalPages, currentPage, onChange }: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination
