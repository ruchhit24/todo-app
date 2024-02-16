import React, { useState } from 'react';

const List = ({ id, title, completed, deleteList, editList }) => {
    const [editedTitle, setEditedTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        editList(id, editedTitle);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    return (
        <div className="flex items-center justify-between p-2">
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={handleChange}
                        className="p-2 border border-gray-400 rounded text-black"
                    />
                    <button onClick={handleSave} className="ml-2 p-2 bg-blue-500 text-white rounded">Save</button>
                </>
            ) : (
                <>
                    <span className={completed ? 'line-through' : ''}>{editedTitle}</span>
                    <div>
                        <button onClick={handleEdit} className="mr-2 p-2 bg-yellow-500 text-white rounded">Edit</button>
                        <button onClick={() => deleteList(id)} className="p-2 bg-red-500 text-white rounded">Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default List;
