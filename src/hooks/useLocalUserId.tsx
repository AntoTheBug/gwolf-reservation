import { useState, useEffect } from 'react';

function useLocalUserId() {
    const localStorage = window.localStorage;

    const [whoami, setWhoami] = useState(localStorage.getItem('who-am-i'));

    useEffect(() => {
        if (!whoami) {
            const newId = (+new Date()).toString(36) + Math.random().toString(36);
            setWhoami(newId);
            localStorage.setItem('who-am-i', newId)
        }
    })

    return whoami;
}

export default useLocalUserId
