import React, {Component, Suspense} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './scss/style.scss'
import Login from "./views/pages/login/Login";
import Register from "./views/pages/register/Register";
import Page500 from "./views/pages/page500/Page500";
import LocationLayout from "./layout/LocationLayout";
import HomeLayout from "./layout/HomeLayout";
import TrayLayout from "./layout/TrayLayout";

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/LocationLayout'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Suspense fallback={loading}>
                    <Routes>
                        <Route exact path="login" name="Login Page" element={<Login />} />
                        <Route exact path="register" name="Register Page" element={<Register />} />
                        <Route exact path="404" name="Page 404" element={<Page404 />} />
                        <Route exact path="500" name="Page 500" element={<Page500 />} />
                        <Route exact path="location" name="Location" element={<LocationLayout />} />
                        <Route exact path="tray" name="Tray" element={<TrayLayout />} />
                        <Route path="*" name="Home" element={<HomeLayout />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        )
    }
}

export default App
