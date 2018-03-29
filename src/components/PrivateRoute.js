import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

class PrivateRoute extends React.Component{
    render() {
        const {component: Component, ...rest} = this.props
        return (
            <Route
                {...rest}
                render={props => 
                    rest.isAuthenticated? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(PrivateRoute))