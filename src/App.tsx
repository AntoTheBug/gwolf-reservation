import './App.css';
import Bannerone from './components/Bannerone';
import Bannerino from './components/Bannerino';
import MoodGrid from './containers/MoodGrid';
import { FormattedMessage, IntlProvider } from 'react-intl'
import React, { useState } from 'react';
import { messages } from 'messages';

const languagesToCountries: { [language: string]: string } = {
    it: 'it',
    en: 'us',
    ar: 'sa',
    ja: 'jp'
}

function next(lang: string) {
    const languages = Object.keys(languagesToCountries);
    return languages[(languages.indexOf(lang) + 1) % languages.length]
}

function App() {
    const [lang, setLang] = useState('it')
    const flag = languagesToCountries[lang];
    return (
        <IntlProvider messages={messages[lang]} key={lang} locale={lang} defaultLocale="en">
            <div className="App">
                <header className="App-header">
                    <Bannerone title="YoGa mood marbles"/>
                    <Bannerino>
                        <img onClick={() => setLang(next(lang))}
                             style={{cursor: 'pointer'}}
                             src={`https://flagcdn.com/64x48/${flag}.png`}
                             alt={`Change language (currently: ${lang})`}
                             title={`Change language (currently: ${lang})`}
                        />
                        <br/>
                        <FormattedMessage id='welcomeTime'
                                          defaultMessage="Hello, today is {quando, date, ::yyyyMMdd} and it's {quando, date, ::hhmmss}"
                                          values={{quando: Date.now()}}
                        />
                    </Bannerino>
                    <MoodGrid/>
                </header>
            </div>
        </IntlProvider>
    );
}

export default App;
