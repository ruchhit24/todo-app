import React, { useState } from 'react';

const AddList = ({ addList }) => {
    const [title, setTitle] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        addList(title);
        setTitle("");  
    }

    return (
        <form onSubmit={onSubmitHandler} className="flex items-center justify-between">
            <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='w-5/6 p-2 m-2 rounded-md text-black' placeholder='Enter Description' />
            <button type="submit" className='p-2 px-4 bg-gradient-to-r from-cyan-400 to-cyan-700 text-white rounded-lg cursor-pointer'>Add</button>
        </form>
    )
}

export default AddList;
