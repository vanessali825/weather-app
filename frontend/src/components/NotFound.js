/** NOT FOUND - FUNCTIONAL COMPONENT */

import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
        <div>
            <h2>Oops! You seem to be lost.</h2>
            <p>Click the following to return home: <Link to='/home'>Home</Link></p>
        </div>
    )
}