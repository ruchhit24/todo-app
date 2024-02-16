import React, { useEffect, useState } from 'react'
import List from './List';
import AddList from './AddList';

const Body = () => {
    const [list,setList] = useState([]);

    useEffect(()=>{
        userData();
    },[]);

    const userData = async()=>{
        const data = await fetch("https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5");
        const jsonData = await data.json();
        console.log(jsonData)
        setList(jsonData)
    }

    const addList = async (title) => { 
            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: 'POST',
                body: JSON.stringify({ title: title, completed: false }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8', 
                },
            });
             
            const jsonData = await response.json();
            setList((prevList) => [...prevList, jsonData]);
          
    }

    const deleteList = async (id)=>{
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,{
            method : "DELETE",
        });
        const data = await res.json();
            const finalList = list.filter((lis)=>{
                return lis.id !== id;
            })
        setList(finalList)
    }
    const editList = async (id, updatedTitle) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ title: updatedTitle }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to edit todo');
            }
            console.log(`Successfully edited todo item with ID ${id}`);
            // Optionally, update the UI to reflect the changes
            const updatedList = list.map(item => {
                if (item.id === id) {
                    return { ...item, title: updatedTitle };
                }
                return item;
            });
            setList(updatedList);
        } catch (error) {
            console.error('Error editing todo:', error);
        }
    }
  return (
    <div className='max-w-screen-lg h-fit bg-gradient-to-r from-slate-600 to-slate-800 mx-auto text-white px-4 py-10'> 
        <div className='flex flex-col items-center p-2 '>
            <h2 className='text-2xl font-semibold'>Add To-Dos:</h2>
            <AddList addList={addList}/>
        </div>
         <div>
         {
            list.map((listy)=>(
                <List id={listy.id} key={listy.id} title={listy.title} completed={listy.completed} deleteList={deleteList} editList={editList}/>
            ))
        }
         </div>
    </div>
  )
}

export default Body