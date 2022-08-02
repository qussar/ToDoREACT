import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { randomColor } from 'randomcolor';
import Draggable from 'react-draggable';
import './App.css';
import './reset.css';

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if (item.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: 'light',
          hue: 'random'
        }),
        defaultPos: {
          x: 300,
          y: -700
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    } else {
      alert('Напишите текст')
      setItem('')
    }
  }

  const deleteNode = (id) => {

    setItems(items.filter((item) => item.id !== id))

  }

  const updatePos = (data, index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y }
    setItems(newArray)
  }

  const keyPress = (e) => {
    const code = e.which || e.keyCode
    if (code === 13) {
      newItem()
    }
  }

  return (
    <div className="App">
      <div className="inner">
        <input
          value={item}
          type="text"
          placeholder='Любой текст'
          onChange={(e) => setItem(e.target.value)}
          onKeyPress={(e) => keyPress(e)}
        />
        <button className="btn" onClick={newItem}>Закрепить</button>
      </div>

      {
        items.map((item, index) => {
          return (
            <Draggable
              key={index}
              defaultPosition={item.defaultPos}
              onStop={(_, data) => {
                updatePos(data, index)
              }}
            >
              <div className='todo-item' style={{ backgroundColor: item.color }}>
                {`${item.item}`}
                <button className='delete' onClick={() => deleteNode(item.id)}>
                  Удалить
                </button>
              </div>
            </Draggable>
          )
        })
      }
    </div>


  );
}

export default App;
