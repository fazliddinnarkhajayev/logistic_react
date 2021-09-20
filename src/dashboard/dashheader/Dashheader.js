import './Dashheader.css'
import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch } from 'react-router-dom'
import List from '../list/list'
import Item from '../item/item'
import Supplier from '../supplier/supplier'
import Client from '../client/client'
import Vehicle from '../vehicle/vehicle'
import Status from '../status/status'
import Currency from '../currency/currency'
import Container from '../container/container'




function Dashheader() {
    const { path, url } = useRouteMatch()


    const [state, changeState] = useState({ class: 'off' })

    function collapseClass() {
        if(state.class === 'on') return 'dash-list'
        if(state.class === 'off') return 'dash-list-none'
    }

    function collapseWrapper() {
        if(state.class === 'off') return 'dash-collapse'
        if(state.class === 'on') return 'dash-collapse-plus'
    }

    function collapse() {
        if(state.class === 'on') {
            changeState(state.class = { class: 'off' })
        }else {
            changeState(state.class = { class: 'on' })
        }
    }

    return (
        <header className="dashheader">
                  <Router>
           <div className="dashmenu">
              <div className="dash-top">
                <h1 className="dash-title">Dashboard</h1>
                <a href="/" className="dash-home-link">
                    <img src="/images/home-icon-silhouette.svg" alt="home" width="20" height="20" />
                </a>
              </div>

              <div className={collapseWrapper()} >
                       <button className="dash-collapse-button" onClick={ collapse }>create</button>

            
                  <ul className={ collapseClass() }>
                       <li className="dash-item">
                           <Link to={`${url}/list` } className="dash-item-link">list</Link>
                       </li>
                       <li className="dash-item">
                           <Link to={`${url}/container` } className="dash-item-link">container</Link>
                       </li>
                       <li className="dash-item">
                           <Link to={`${url}/item` } className="dash-item-link">item</Link>
                       </li>
                       <li className="dash-item">
                           <Link to={`${url}/supplier` } className="dash-item-link">supplier</Link>
                       </li>
                       <li className="dash-item">
                           <Link to={`${url}/client` } className="dash-item-link">client</Link>
                       </li>
                       <li className="dash-item">
                           <Link to={`${url}/vehicle` } className="dash-item-link">type of vehicle</Link>
                       </li>
                       <li className="dash-item">
                           <Link to={`${url}/status` } className="dash-item-link">status</Link>
                       </li>
                       <li className="dash-item">
                           <Link to={`${url}/currency` } className="dash-item-link">currency</Link>
                       </li>
                  </ul>
                  
                

                 
              </div>
           </div>
              

           <Switch>
            <Route exact path={`${path}/list`} component={List} />
            <Route exact path={`${path}/container`} component={Container} />
            <Route exact path={`${path}/item`} component={Item} />
            <Route exact path={`${path}/supplier`} component={Supplier} />
            <Route exact path={`${path}/client`} component={Client} />
            <Route exact path={`${path}/vehicle`} component={Vehicle} />
            <Route exact path={`${path}/status`} component={Status} />
            <Route exact path={`${path}/currency`} component={Currency} />
            </Switch>
         </Router>
        </header>
    )
}

export default Dashheader