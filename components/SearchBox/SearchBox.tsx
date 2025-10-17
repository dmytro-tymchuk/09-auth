import css from "./SearchBox.module.css"

interface SearchBoxProps {
  searchValue: string
  onChange: (v: string) => void
}

const SearchBox = ({ searchValue, onChange }: SearchBoxProps) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={searchValue}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default SearchBox
