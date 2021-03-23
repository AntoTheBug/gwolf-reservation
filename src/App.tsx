import './App.css';
import Bannerone from './components/Bannerone';
import Bannerino from './components/Bannerino';
import MoodGrid from './containers/MoodGrid';
import { useSelector } from 'react-redux';
import { selectHistory } from './app/fireSlice';
import MoodHistory from './components/MoodHistory';


function App() {
    const history = useSelector(selectHistory)

    return (
        <div className="App">
            <header className="App-header">
                <Bannerone title="YoGa mood marbles"/>
                <Bannerino title={new Date().toLocaleDateString() + ' @ ' + new Date().toLocaleTimeString()}/>
                <MoodGrid/>
                <MoodHistory {...history} ></MoodHistory>
            </header>
        </div>
    );
}

export default App;
