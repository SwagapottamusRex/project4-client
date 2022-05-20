import React from 'react';

import { Link } from 'react-router-dom';
import { createPixel, getAllColors, getAllPixels, updatePixel } from '../api/pixel';
import {getLoggedInUserId} from '../lib/auth'
import { PanZoom } from 'react-easy-panzoom';


function PixelPlace() {
  const [cells]= React.useState(Array.from({ length: 200 }, (_, y) => Array.from({ length: 200 }, (_, x) => x)))
  
  const [pixelColor, setPixelColor]= React.useState({
    color: '',
    number_of_times_changed: 0,
    x_axis: '',
    y_axis: '',
    current_owner: '',
  })
  const [colors, setColors] = React.useState('')
  const [existingPixels, setExistingPixels] = React.useState('')
  const [selectedPixelId, setSelectedPixelId] = React.useState('')

  
  React.useEffect(() => { 
    const getData = async () => {
      const colors = await getAllColors();
      setColors(colors);
      const allPixels = await getAllPixels();
      setExistingPixels(allPixels);
      const getColorPixels = async () => {
        await allPixels.map((pItem) => {
          const x_num = pItem.x_axis;
          const y_num = pItem.y_axis;
          const x_pix = document.querySelector(`[x="${x_num}"][y="${y_num}"]`);
          x_pix.style.backgroundColor = pItem.color.color_name
        })
      }
      getColorPixels()
    };
    getData();
  }, []);
  

  function handleClick(event) {
    const pixelSelected = event.target;
    const x = parseInt(event.target.attributes.x.value);
    const y = parseInt(event.target.attributes.y.value);
    
    setPixelColor({...pixelColor, x_axis: x , y_axis: y, current_owner: getLoggedInUserId()})
    for (let i=0; i<40000; i++){
      if(event.target.parentElement.children[i].classList.contains('highlighted')) {
        event.target.parentElement.children[i].classList.remove('highlighted');
      }
    }
    if(event.target.classList.contains('highlighted')){
      pixelSelected.classList.remove('highlighted');
    } else {
      pixelSelected.classList.add('highlighted')
    }

    existingPixels.map((pixelItem) => {
      if (pixelItem.x_axis === x && pixelItem.y_axis === y){
        setSelectedPixelId(pixelItem.id)
      }
    })
  }

  function handleColorClick(event) {
    colors.map((colorItem)=>{
      if(colorItem.color_name === event.target.classList.value){
        setPixelColor({...pixelColor, color: colorItem.id})
      }
    })
    const pixelSelected = event.target;
    for (let i=0; i<9; i++){
      if(event.target.parentElement.children[i].classList.contains('highlightedColor')) {
        event.target.parentElement.children[i].classList.remove('highlightedColor');
      }
    }
    pixelSelected.classList.add('highlightedColor');
  }

  function handleSubmit(event) {
    const arr = [].slice.call(
      event.target.parentElement.children[1].children[0].children[0].children[0].children
    );
    arr.map((gridItem)=>{
      if(gridItem.classList.contains('highlighted')){
        const colorChange = colors[pixelColor.color - 1]
        gridItem.style.backgroundColor= `${colorChange.color_name}`
      }
    })
    const getData = async () => {
      try {
        const allThePixels = await getAllPixels()
        let i = 0
        allThePixels.map((pixelItem) => {
          if (pixelColor.x_axis === pixelItem.x_axis && pixelColor.y_axis === pixelItem.y_axis) {
            const updatePixelElement = async () => {
              await updatePixel(pixelColor, selectedPixelId)
            }
            updatePixelElement()
            i = 1
          }
        });
        if (i === 0) {
          const createPixelElement = async () => {
              await createPixel(pixelColor)
            }
            createPixelElement()
        }
      } catch (err) {
        console.log(err);
      }
    };
    
    getData();
    event.preventDefault();
  }

  return (
    <>
      <div className='pixelBackground'>
        <div>
          <h3 class='pallet'>Choose a Colour</h3>
          <ul class='colorList'>
            <li
              onClick={handleColorClick}
              class='white'
              id='makeBackgroundWhite'
            >
              White
            </li>
            <li onClick={handleColorClick} class='black'>
              Black
            </li>
            <li onClick={handleColorClick} class='red'>
              Red
            </li>
            <li onClick={handleColorClick} class='orange'>
              Orange
            </li>
            <li onClick={handleColorClick} class='yellow'>
              Yellow
            </li>
            <li onClick={handleColorClick} class='green'>
              Green
            </li>
            <li onClick={handleColorClick} class='blue'>
              Blue
            </li>
            <li onClick={handleColorClick} class='purple'>
              Purple
            </li>
            <li onClick={handleColorClick} class='brown'>
              Brown
            </li>
          </ul>
        </div>
        <section>
          <div class='wraparound placePix'>
            {getLoggedInUserId() && (
              <button
                onClick={handleSubmit}
                className='button is-danger mt-4 subButton'
              >
                Click me to place tile!
              </button>
            )}
            {!getLoggedInUserId() && <h2>Login to Place a tile!</h2>}
            <div>
              {!existingPixels ? (
                <div>Loading pixels...(this may take a couple seconds)</div>
              ) : (
                <PanZoom
                  enableBoundingBox
                  boundaryRatioVertical={0.99}
                  boundaryRatioHorizontal={0.99}
                  // disableKeyInteraction='true'
                  maxZoom='3'
                  minZoom='0.2'
                  // autoCenter='true'
                  // autoCenterZoomLevel='1'
                  style={{
                    boxSizing: 'border-box',
                    position: 'relative',

                    overflow: 'hidden',
                    width: '80vw',
                    border: 'solid 2px #333',
                  }}
                >
                  <div class='gridContainer' id='allThePixels'>
                    {cells.map((cellItem) =>
                      cellItem.map((cellItem2) => (
                        <div
                          className='grid-item'
                          x={cells.indexOf(cellItem)}
                          y={cellItem2}
                          onClick={handleClick}
                        ></div>
                      ))
                    )}
                  </div>
                </PanZoom>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
export default PixelPlace