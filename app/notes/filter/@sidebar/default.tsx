import { NoteTag } from '@/types/note';
import css from '../../../../components/SidebarNotes/SidebarNotes.module.css'
import Link from 'next/link';

const SidebarNotes = () => {
    const tags: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];
    return (
          <ul className={css.menuList}>
            {/* список тегів */}
            <li  className={css.menuItem}>
        <Link 
              href={`/notes/filter/all`} 
              className={css.menuLink}
            >
             All Notes
            </Link>
      </li>
      {tags.map((tag, index) => <li key={index} className={css.menuItem}>
        <Link 
              href={`/notes/filter/${tag}`} 
              className={css.menuLink}
            >
              {tag}
            </Link>
      </li>)}
    </ul>
    )
}

export default SidebarNotes