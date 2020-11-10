import { h, Fragment  } from 'preact';
import './app.scss';

const Tab = () => {
    return (        
        <div>
            Tab
        </div>
    );
};

const TabList = () => {
    return (
        <div>
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
        </div>
    );
};

const Footer = () => {
    return (
        <footer>
            Footer
        </footer>
    );
}

const SearchField = () => {
    return (
        <div>
            Search
        </div>
    )
}

const Header = () => {
    return (
        <header>
            Header
        </header>
    );
};

const App = () => {
    return (
        <Fragment>
            <Header />
            <SearchField />
            <TabList />
            <Footer />
        </Fragment>
    );
};

export default App;
