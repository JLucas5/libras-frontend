import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'


import Home from './pages/Home'
import ActivityList from './pages/Activity_List'
import DictionaryList from './pages/Dictionary_List'
import LibraryList from './pages/Library_List'
import ModuleList from './pages/Module_List'
import NewActivity from './pages/New_Activity'
import NewAlternative from './pages/New_Alternative'
import NewDictionaryItem from './pages/New_Dictionary_Item'
import NewLibraryItem from './pages/New_Library_Item'
import NewModule from './pages/New_Module'

export default function Routes(){
    return (
      <BrowserRouter>
      
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/activities'exact component={ActivityList} />
          <Route path='/activities/new' component={NewActivity} />
          <Route path='/activities/alternative'component={NewAlternative} />
          <Route path='/dictionary'exact component={DictionaryList} />
          <Route path='/dictionary/new'component={NewDictionaryItem} />
          <Route path='/module'exact component={ModuleList} />
          <Route path='/module/new'component={NewModule} />
          <Route path='/library'exact component={LibraryList} />
          <Route path='/library/new'component={NewLibraryItem} />
        </Switch>

      </BrowserRouter>
    )
}