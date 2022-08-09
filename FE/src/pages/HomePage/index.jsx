import React from 'react';
import { useStore } from '../../states.js';



const HomePage = () => {
    const { userToken } = useStore()
    return (
        <div>
            <p>머냐?</p>
            {userToken}
        </div>
    );
};

export default HomePage;