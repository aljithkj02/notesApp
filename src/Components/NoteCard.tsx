import React from 'react'
import { Tag } from '../Routes/AllRoutes'

export interface INoteCard {
    id: string,
    title: string,
    tags: Tag[]
}

const NoteCard = ({ id, title, tags }: INoteCard) => {
    return (
        <h1>Haii</h1>
    )
}

export default NoteCard
