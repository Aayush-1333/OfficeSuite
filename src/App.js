import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import AccountState from './context/accounts/AccountState';
import NoteState from './context/notes/NotesState';
import NewsState from './context/news/NewsState';

import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import NotesPage from './components/NotesPage';
import CreateNotePage from './components/CreateNotePage';
import EditNotePage from './components/EditNotePage';
import ThemeState from './context/themes/ThemeState';

function App() {


    return (
        <div>
            <AccountState>
                <NoteState>
                    <ThemeState>
                        <NewsState>
                            <div className="App">
                                <Router>
                                    <Navbar />
                                    <Routes>
                                        <Route path='/' element={<HomePage />} />
                                        <Route path='/login' element={<LoginPage />} />
                                        <Route path='/sign-up' element={<SignUpPage />} />
                                        <Route path='/notes' element={<NotesPage />} />
                                        <Route path='/create-note' element={<CreateNotePage />} />
                                        <Route path='/edit-note' element={<EditNotePage />} />
                                    </Routes>
                                </Router>
                            </div>
                        </NewsState>
                    </ThemeState>
                </NoteState>
            </AccountState>
        </div>
    );
}

export default App;
