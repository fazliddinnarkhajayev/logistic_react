import './Table.css';
import axios from 'axios';
import { useState, useEffect } from 'react'


function Table() {

 const [loads, setLoads] = useState([])

 useEffect( () => {
    ;(async () => {
        let response = await axios.get('https://logictic.herokuapp.com/getloads')
        setLoads(response.data)
      })()
 }, [])

   

    return (
        
      <main>
          
        <div className="container">
           
        <table className="table">
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
        </div>
      </main>
    )
}

export default Table