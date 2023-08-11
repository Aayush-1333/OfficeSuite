import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import AccountState from './context/accounts/AccountState';
import NoteState from './context/notes/NotesState';
import NewsState from './context/news/NewsState';
import ThemeState from './context/themes/ThemeState';

import HomePage from './components/Home/HomePage';
import Navbar from './components/Home/Navbar';
import LoginPage from './components/Accounts/LoginPage';
import SignUpPage from './components/Accounts/SignUpPage';
import NotesPage from './components/Notes/NotesPage';
import CreateNotePage from './components/Notes/CreateNotePage';
import EditNotePage from './components/Notes/EditNotePage';
import Verify from './components/Accounts/Verify';

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
                                        <Route path='/verify' element={<Verify />} />
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
