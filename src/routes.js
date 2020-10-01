import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import PrivateRoute from "./PrivateRoute"
import { AuthProvider } from "./Auth"

import DictionaryList from "./pages/Dictionary_List"
import LibraryList from "./pages/Library_List"
import ModuleList from "./pages/Module_List"
import NewActivity from "./pages/New_Activity"
import EditActivity from "./pages/Edit_Activity"
import NewDictionaryItem from "./pages/New_Dictionary_Item"
import NewLibraryItem from "./pages/New_Library_Item"
import NewModule from "./pages/New_Module"
import EditDictionaryItem from "./pages/Edit_Dictionary_Item"
import EditLibraryItem from "./pages/Edit_Library_Item"
import EditModule from "./pages/Edit_Module"
import ViewModule from "./pages/View_Module"
import AboutUs from "./pages/AboutUs"
import EditAboutUs from "./pages/Edit_AboutUs"
import NewAboutUs from "./pages/New_AboutUs"
import Login from "./pages/Login"

export default function Routes() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={Login} />
					<Route path="/login" exact component={Login} />

					<PrivateRoute
						path="/activities/new/:id"
						exact
						component={NewActivity}
					/>
					<PrivateRoute
						path="/activity/edit/:id"
						component={EditActivity}
					/>

					<PrivateRoute
						path="/dictionary"
						exact
						component={DictionaryList}
					/>
					<PrivateRoute
						path="/dictionary/edit/:id"
						exact
						component={EditDictionaryItem}
					/>
					<PrivateRoute
						path="/dictionary/new"
						component={NewDictionaryItem}
					/>

					<PrivateRoute path="/module" exact component={ModuleList} />
					<PrivateRoute path="/module/new" component={NewModule} />
					<PrivateRoute
						path="/module/edit/:id"
						exact
						component={EditModule}
					/>
					<PrivateRoute
						path="/module/view/:id"
						exact
						component={ViewModule}
					/>

					<PrivateRoute
						path="/library/new/:type"
						component={NewLibraryItem}
					/>
					<PrivateRoute
						path="/library/edit/:id"
						component={EditLibraryItem}
					/>
					<PrivateRoute
						path="/library/:type"
						exact
						component={LibraryList}
					/>

					<PrivateRoute path="/aboutus" exact component={AboutUs} />
					<PrivateRoute
						path="/aboutus/edit/:id"
						exact
						component={EditAboutUs}
					/>
					<PrivateRoute
						path="/aboutus/new"
						exact
						component={NewAboutUs}
					/>
				</Switch>
			</BrowserRouter>
		</AuthProvider>
	)
}
