import { h, Fragment  } from 'preact';
import './app.scss';

const Tab = () => {
    return (        
        <div class="tab">
            <div className="container row row--space-between row--center">

                <div className="tab__content">
                    <div className="tab__favicon-container">
                        <img src="" alt="Favicon" class="tab__favicon"/>
                    </div>
                    <h2 class="tab__title">This is the title of the tab</h2>
                </div>

                <div className="tab__right">
                    <h3 class="tab__url"><a href="#" class="tab__link">dummylink.com</a></h3>
                </div>

            </div>
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
        </div>
    );
};

const Footer = () => {
    return (
        <footer class="footer">
            <div className="container row row--right">
                <i class="material-icons md-18 md-light settings-icon">settings</i>
            </div>
        </footer>
    );
}

const SearchField = () => {
    return (
        <div class="search-tabs">
            
            <div className="container row row--center row--space-between">
                <div className="search-tabs__search-bar">
                    <i class="material-icons md-18 md-light search-icon">search</i>
                    <input class="search-tabs__input" type="text" tabIndex="0" autofocus placeholder="Search for tabs"/>
                </div>
    
                <div class="search-tabs__counter">
                    <span class="search-tabs__total">5</span>
                </div>
            </div>
            
        </div>
    )
}

const App = () => {
    return (
        <Fragment>
            <SearchField />
            <TabList />
            <Footer />
        </Fragment>
    );
};

export default App;
