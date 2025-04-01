export default function Blabberings() {
    return (
        <div className="blabberings">
          <h2><span>Welcome!</span> You can use this app to <span>create</span>, <span>delete</span>, and <span>edit</span> tasks.</h2>

          <p>Your task list is <strong>saved locally on your device,</strong> so it can only be viewed and accessed 
            by <strong>you or anyone using your machine.</strong></p>

          <p>This project uses <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" target="_blank">IndexedDB</a> to store your data,
             which means you can close or refresh the page, and your tasks will remain saved. 
            However, <strong>if you clear site data or uninstall the browser, your tasks will be lost.</strong></p>

          <p className="note-taking-ad">interested in a note-taking version of this website? <a href="https://notes-web-app-project.netlify.app/" target="_blank">check here!</a></p>

          <p className="credits">icons by <a href="https://www.svgrepo.com/" target="_blank">SVGrepo.</a> coded by <a href="https://github.com/tortaruga" target="_blank">tortaruga</a></p>
        </div> 
    )
}