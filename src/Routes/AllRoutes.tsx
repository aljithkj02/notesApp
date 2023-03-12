import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../Hooks/useLocalStorage';
import { NewNote, NoteList } from '../Pages';

export type Note = {
    id: string
} & NoteData;

export type NoteData = {
    title: string,
    markdown: string,
    tags: Tag[]
}

export type Tag = {
    id: string;
    label: string;
}

export type RawNote = {
    id: string
} & RawNoteData;

export type RawNoteData = {
    title: string,
    markdown: string,
    tagIds: string[]
}

const AllRoutes = () => {
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
            return {
                ...note, tags: tags.filter(tag => {
                    note.tagIds.includes(tag.id)
                })
            }
        })
    }, [notes, tags]);

    const onCreateNote = ({ tags, ...data }: NoteData) => {
        setNotes(prevNotes => {
            return [...prevNotes, {
                ...data, id: uuidv4(), tagIds: tags.map(tag => {
                    return tag.id;
                })
            }];
        })
    }

    const addTag = (tag: Tag) => {
        setTags(prev => [...prev, tag])
    }

    return (
        <Container className='my-4'>
            <Routes>
                <Route path="/" element={<NoteList />} />
                <Route path="/new" element={<NewNote onSubmit={onCreateNote}
                    onAddTag={addTag} availableTags={tags}
                />}
                />
                <Route path="/:id">
                    <Route index element={<h1>Show</h1>} />
                    <Route path="edit" element={<h1>Edit</h1>} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Container>
    )
}

export default AllRoutes
