import NotesProvider from './contex/NoteContext'
import NotePage from './Pages/NotePage'
 function App() {

  return (
    <>
    <div id='app'>
      <NotesProvider>
         <NotePage/>
      </NotesProvider>
    </div>
    </>
  )
}

export default App
