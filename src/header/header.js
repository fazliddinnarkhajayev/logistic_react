import './header.css';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Header() {
    
    const [collapseState, changeCollapseState] = useState({ collapseModal: false })
    const [appState, changeState] = useState({ headerFormActive: 0 })
    const [formState, setFormState] = useState('home-header')

    const [loads, setLoads] = useState([])
    const [items, changeItems] = useState([])
    const [suppliers, changeSuppliers] = useState([])
    const [clients, changeClients] = useState([])


    useEffect( () => {
        ;(async () => {
            let response = await axios.get('https://logictic.herokuapp.com/getitems')
             changeItems(response.data)
          })()
     }, [])

     
    useEffect( () => {
        ;(async () => {
            let response = await axios.get('https://logictic.herokuapp.com/getsuppliers')
            changeSuppliers(response.data)
          })()
     }, [])

     useEffect( () => {
        ;(async () => {
            let response = await axios.get('https://logictic.herokuapp.com/getclients')
            changeClients(response.data)
          })()
     }, [])


    function changedClass() {
        if(appState.headerFormActive === 1) return 'search-wrapper-form'
        if(appState.headerFormActive === 0) return 'search-wrapper-form-none'
    }

    function changeBlock() {
        if(appState.headerFormActive === 1) {
            changeState(appState.headerFormActive = { headerFormActive: 0 })
        }else{
            changeState(appState.headerFormActive = { headerFormActive: 1 })
        } 
    }
  
    function collapseClass() {
        if(collapseState.collapseModal === true) return 'collapse-modal'
        if(collapseState.collapseModal === false) return 'collapse-modal-none'
    }

    function collapse() {
        if(collapseState.collapseModal === true) {
            changeCollapseState(collapseState.collapseModal = { collapseModal: false })
        }else {
            changeCollapseState(collapseState.collapseModal = { collapseModal: true })
        }
    }


    function typing() {
      if(formState === 'home-header-search') {
        return   <table className="table-search">
        <thead className="thead" id="tHead">
            <tr className="table-head-row" id="tableHeadRow">
                <th>#</th>
                <th>date of loading</th>
                <th>date of container</th>
                <th>container number</th>
                <th>item</th>
                <th>count</th>
                <th>packages count</th>
                <th>volume</th>
                <th>total volume</th>
                <th>netto kg</th>
                <th>total netto</th>
                <th>brutto kg</th>
                <th>total brutto</th>
                <th>supplier</th>
                <th>client</th>
                <th>status</th>
            </tr>
        </thead>
        <tbody className="tbody" id="tBody">
                
            {
                loads.map( (load, i) => {
        return <tr key={load.load_id}>
                 <td >{load.load_id}</td>
                 <td >{load.date}</td>
                 <td >{load.date_of_cont}</td>
                 <td >{load.container_number}</td>

                 <td  className="array-td">
                  <div className="array-data">
                  {
                      load.item_name.map( (e, i )=> {
                       return <span key={i}>{e}</span>
                      })
                  }
                  </div>
                 </td>

                 <td className="array-td">
                   <div className="array-data">
                   {
                      load.item_count.map( (c, i) => {
                       return <span key={i}>{c}</span>
                      })
                  }
                   </div>
                 </td>

                 <td className="array-td">
                   <div className="array-data">
                   {
                      load.item_packages_count.map( (c, i) => {
                       return <span key={i}>{c}</span>
                      })
                  }
                   </div>
                 </td>

                 <td className="array-td">
                   <div className="array-data">
                   {
                      load.item_volume.map( (c, i) => {
                       return <span key={i}>{c}</span>
                      })
                  }
                   </div>
                 </td>

                 <td>{load.total_volume}</td>

                 <td className="array-td">
                   <div className="array-data">
                   {
                      load.item_netto_kg.map( (c, i) => {
                       return <span key={i}>{c}</span>
                      })
                  }
                   </div>
                 </td>

                 <td>{load.total_netto}</td>

                 <td className="array-td">
                   <div className="array-data">
                   {
                      load.item_brutto_kg.map( (c, i) => {
                       return <span key={i}>{c}</span>
                      })
                  }
                   </div>
                 </td>

                 <td>{load.total_brutto}</td>

                 <td className="array-td">
                   <div className="array-data">
                   {
                      load.item_supplier.map( (c, i) => {
                       return <span key={i}>{c}</span>
                      })
                  }
                   </div>
                 </td>

                 <td className="array-td">
                   <div className="array-data">
                   {
                     load.client.map( (c, i) => {
                       
                        return <span key={i}>{c}</span>
                      })
                  }
                   </div>
                 </td>

                 <td>{load.status}</td>
               </tr>
              })
            }
        </tbody>
     </table>
      }
    }


    return (
     <header className={formState}>
          <div className="container">
            <div className="header-top">
                <form id="homeHeaderSearchForm" className={changedClass()}
                onInput={async() => {
                
     

                    let searchNumber = document.getElementById('searchContainerNumber')
                    let searchItem = document.getElementById('searchContainerItem')
                    let searchSuppier = document.getElementById('searchContainerSuppier')
                    let searchClient = document.getElementById('searchContainerClient')
               
                    setFormState('home-header-search')
                    let sNumber = searchNumber.value ? searchNumber.value : null
                    let sItem = searchItem.value ? searchItem.value : null
                    let sSupplier = searchSuppier.value ? searchSuppier.value : null
                    let sClient = searchClient.value ? searchClient.value : null

                    let response = await axios.get(`http://localhost:5000/searchLoads/${sNumber}/${sItem}/${sSupplier}/${sClient}`)
                    setLoads(response.data)
                }}
                >
                    <div className="search-wrapper-inner">
                        <label>Container number
                          <input className="search-input" type="search" id="searchContainerNumber" />
                        </label>
                    </div>

                    <div className="search-wrapper-inner">
                        <span>Item</span>
                        <select className="search-input" id="searchContainerItem">
                        <option value="null"></option>
                        {
                            items.map((e, i) => {
                                return <option key={i} value={e.item_name}>{e.item_name}</option>
                            })
                        }    
                        </select>
                    </div>

                    <div className="search-wrapper-inner">
                        <span>Supplier</span>
                        <select className="search-input" id="searchContainerSuppier">
                            <option value="null"></option>
                        {
                            suppliers.map((e, i) => {
                                return <option key={i} value={e.supplier_name}>{e.supplier_name}</option>
                            })
                        }  
                        </select>
                    </div>

                    <div className="search-wrapper-inner">
                        <span>Client</span>
                        <select className="search-input" id="searchContainerClient">
                            <option value="null"></option>
                            {
                            clients.map((e, i) => {
                                return <option key={i} value={e.client_name}>{e.client_name}</option>
                            })
                           } 
                        </select>
                    </div>
                </form>

                <div className="button-wrapper">
                    <button className="search-button" onClick={ changeBlock } >
                       <img alt="img" src="/images/icons8-search-24.png" width="24" height="24"/>
                    </button>

                    <div className="collapse-modal-wrapper"> 
                        
                    <button className="settings-button" onClick={ collapse }>
                       <img alt="img" src="/images/clipart1179587.png" width="24" height="24"/>
                    </button>

                   
                       
                       <div className={ collapseClass() }>
                           <ul className="collapse-list">
                              <li className="collapse-item">
                                <Link to="/dashboard" className="collapse-link">Dashboard</Link>
                              </li>
               
                              <li className="collapse-item">
                                <Link to="/dashboard" className="collapse-link">Log out</Link>
                              </li>
               
                              <li className="collapse-item">
                                <Link to="/dashboard" className="collapse-link">Settings</Link>
                              </li>
                           </ul>
                       </div>
                      </div>

                </div>
            </div>


            {typing()}
         </div>
     </header>
    );
}


export default Header