import './style.css'
import Luminary from './Luminary.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="position: relative">
      <video
            controls
            autoplay
            loop
            muted
            id="app-video"
        >
            <source src="./kyrgyz-warriors.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>  
        <div id="app-video-container"></div>
  </div>
`

new Luminary()