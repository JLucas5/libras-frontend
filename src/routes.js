import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'


import Home from './pages/Home'
import DictionaryList from './pages/Dictionary_List'
import LibraryList from './pages/Library_List'
import ModuleList from './pages/Module_List'
import NewActivity from './pages/New_Activity'
import NewAlternative from './pages/New_Alternative'
import NewDictionaryItem from './pages/New_Dictionary_Item'
import NewLibraryItem from './pages/New_Library_Item'
import NewModule from './pages/New_Module'
import NewObjective from './pages/New_Objective'
import NewSubjective from './pages/New_Subjective'
import EditDictionaryItem from './pages/Edit_Dictionary_Item'
import EditLibraryItem from './pages/Edit_Library_Item'
import EditModule from './pages/Edit_Module'
import ViewModule from './pages/View_Module'

export default function Routes(){
    return (
      <BrowserRouter>

        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/activities/new/:id' exact component={NewActivity} />
          <Route path='/subjective/new/:id' exact component={NewSubjective} />
          <Route path='/objective/new/:id' exact component={NewObjective} />
          <Route path='/objective/alternative/:id'component={NewAlternative} />
          

          <Route path='/dictionary'exact component={DictionaryList} />
          <Route path='/dictionary/edit/:id'exact component={EditDictionaryItem} />
          <Route path='/dictionary/new'component={NewDictionaryItem} />


          <Route path='/module'exact component={ModuleList} />
          <Route path='/module/new'component={NewModule} />
          <Route path='/module/edit/:id'exact component={EditModule} />
          <Route path='/module/view/:id'exact component={ViewModule} />

          
          <Route path='/library/new/:type'component={NewLibraryItem} />
          <Route path='/library/edit/:id'component={EditLibraryItem} />
          <Route path='/library/:type'exact component={LibraryList} />
        </Switch>

      </BrowserRouter>
    )
}