import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../../App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap';

import DictionaryList from '../Dictionary_List';
import LibraryList from '../Library_List';
import ModuleList from '../Module_List';
import NewActivity from '../New_Activity';
import EditActivity from '../Edit_Activity';
import NewDictionaryItem from '../New_Dictionary_Item';
import NewLibraryItem from '../New_Library_Item';
import NewModule from '../New_Module';
import EditDictionaryItem from '../Edit_Dictionary_Item';
import EditLibraryItem from '../Edit_Library_Item';
import EditModule from '../Edit_Module';
import ViewModule from '../View_Module';


export default function Panel(){
    return(
        <div>
            <Navbar sticky="top" collapseOnSelect expand="lg">
            <Navbar.Brand href="/panel">Painel EduLIBRAS</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav.Link href="/panel/module">Módulos</Nav.Link>
                <Nav.Link href="/panel/dictionary">Dicionário</Nav.Link>
                <NavDropdown title="Biblioteca">
                <NavDropdown.Item href="/panel/library/video">Videos</NavDropdown.Item>
                <NavDropdown.Item href="/panel/library/music">Músicas</NavDropdown.Item>
                <NavDropdown.Item href="/panel/library/book">Livros</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="/">Sair</Nav.Link>
            </Navbar.Collapse>
            </Navbar>

            <div className="container">
            <h1>Bem-vindo ao Painel Administrativo!</h1> 
                <div className="content">
                    <Switch>
                        <Route path='/panel/activities/new/:id' exact component={NewActivity} />
                        <Route path='/panel/activity/edit/:id'component={EditActivity} />
                    

                        <Route path='/panel/dictionary'exact component={DictionaryList} />
                        <Route path='/panel/dictionary/edit/:id'exact component={EditDictionaryItem} />
                        <Route path='/panel/dictionary/new'exact component={NewDictionaryItem} />


                        <Route path='/panel/module'exact component={ModuleList} />
                        <Route path='/panel/module/new'component={NewModule} />
                        <Route path='/panel/module/edit/:id'exact component={EditModule} />
                        <Route path='/panel/module/view/:id'exact component={ViewModule} />

                        
                        <Route path='/panel/library/new/:type'component={NewLibraryItem} />
                        <Route path='/panel/library/edit/:id'component={EditLibraryItem} />
                        <Route path='/panel/library/:type'exact component={LibraryList} />
                    </Switch>
                </div>
            </div>
        </div>
    );
}