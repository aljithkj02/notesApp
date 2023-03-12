import React from 'react';
import { NoteForm } from '../Components';
import { NoteData, Tag } from '../Routes/AllRoutes';

interface INewNote {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[]
}

const NewNote = ({ onSubmit, onAddTag, availableTags }: INewNote) => {
    return (
        <>
            <h1 className='mb-4'>New Note</h1>
            <NoteForm onSubmit={onSubmit} onAddTag={onAddTag}
                availableTags={availableTags}
            />
        </>
    )
}

export default NewNote
