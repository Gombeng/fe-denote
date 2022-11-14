import React from 'react';
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
} from 'react-router-dom';
import {
	Login,
	Register,
	MainApp,
	Home,
	NotFound,
	CreateNote,
	EditNote,
} from '../pages/Pages';

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="signin" element={<Login />} />
				<Route exact path="signup" element={<Register />} />
				<Route exact path="/" element={<MainApp />}>
					<Route index element={<Home />} />
					<Route exact path="home" element={<Home />} />
					<Route exact path="create" element={<CreateNote />} />
					<Route exact path="edit/:noteId" element={<EditNote />} />
					<Route exact path="*" element={<NotFound />} />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
