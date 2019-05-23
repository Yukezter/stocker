import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default ({ render: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={props => {
				const cProps = Component().props
				if (cProps.isAuthenticated) {
					return <Component {...props} {...cProps} />
				}
				return (
					<Redirect
						to={{
							pathname: '/signin',
							state: {
									from: props.location
							}
						}}
					/>
				)
			}}
		/>
	)
}