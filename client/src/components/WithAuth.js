import { Redirect, Route } from 'react-router-dom';

const WithAuth = ({ user, component: Component, ...rest }) => {
    console.log(user && user.user_name)
    if (!user || !user.user_name) {
        return <Redirect to="/login" />
    }
    return (
        <Route
            {...rest}
            render={(props) => <Component {...props} user={user} />}
        />
    )
}

export default WithAuth;