import React from 'react'
import ReactDOM from 'react-dom/client'



// app is a component (main.jsx mount/display a component)
// (everythin deleted from vite!)
// everything is translated into js before it hits the browser
// virtual dom from react
// own memory before screen
// change sth virtual updated first then react checks differences and 
// updates the real dom (browser)
// faster the virtual dom and only change the changes
// most famous framework that uses jsx is react
// class is reservated for js use className
// watch/state variable (hook) ---> react updates dom
// --> you import a hooks - component remember variables rerender screen when changes
// You create your function that hast jsx
// import necessary hook (?state variable?) from React (useState was in the default setup of app.jsx)
import { useState, useEffect } from 'react';
// import our Movie component
import Movie from './Movie';


export default function App() {

  // A variable that will contain a list of movies
  // --> fectch data and loop it

  // Problem cors - a web browser only wants to make the requests to one page from
  // one domain!
  // proxy (stellvertreter) config: (vite.confi.js) 
  const [movies, setMovies] = useState([]); // start value = empty array

  // useEffect--> Run when the component "movies" FIRST!! mounts (Hard reload of the page) 
  useEffect(() => {
    // Self-executing asyncronous anonomyous function (()=>{}) 
    // because fetch needs async, but react doesn't like useEffect() getting a 
    // async function so i wrap asyc function in another function
    (async () => {
      // Fetch all the movies from the REST api
      // and store them in the state variable movies
      setMovies(await (await (fetch('/api/movies'))).json());
    })();
  }, []);

  ///////////////witout state variable
  //
  // export default function App() {
  //   return <div className="greeting">
  //     <h1>Hello world!</h1>
  //   </div>
  // }
  //
  // Create a state variable called greeting and setter (setGreeting)
  // I build my application as series of components
    const [greeting, setGreeting] = useState('Hello world!');
  // --> useState is a hook from react
  //
  // template literal was ${js expression (variable/function)}
  // react: just {js expressing (this case state variable "greeting") }
  
  return <div className="App">
    <h1>{greeting}</h1>
    {greeting === 'Hello world!' && <button
      onClick={() => setGreeting('Goodbye cruel world!')}
    >Say goodbye</button>}
    {/* Loop through all movies and display each movie */}
    {movies.map(({ id, title, description }) => <Movie
      key={id}
      title={title}
      description={description}
    />)}
  </div>;

}