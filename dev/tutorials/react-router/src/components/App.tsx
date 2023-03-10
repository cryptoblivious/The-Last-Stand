// ---------- Vite Blank version ----------

// import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
// import viteLogo from '../assets/vite.svg'
// import '../styles/App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

// export default App
// ---------------------------------------
import { useState } from "react";

import styles from "../common/styles";

import {
	Game,
	GameLobby,
	Home,
	Heroes,
	Login,
	Stages,
	Stats,
} from "../components";



const App = () => {
	const [activePage, setActivePage] = useState('Login');

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  
	return (
		<div className={` bg-primary ${styles.paddingX} ${styles.flexStart}`}>
			<div className={`${styles.boxWidth}`}>
        <Game />
				<GameLobby />
				<Home />
				<Heroes />
				<Login />
				<Stages />
				<Stats />
			</div>
		</div>
	);
};

export default App;
