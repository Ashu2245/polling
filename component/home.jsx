import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import styles from './index.scss'

export class Home extends React.Component {
    render() {
        return (
            <div>
                <h2>Polling Home page</h2>
                <p>
                    Open the network tab as you navigate. Notice that only the amount of your app that is required is actually downloaded as you navigate around. Even the route configuration objects are loaded on the fly. This way, a new route added deep in your app will not affect the initial bundle of your application.
                </p>
            </div>
        )
    }
}
