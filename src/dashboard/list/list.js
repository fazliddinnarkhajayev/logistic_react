import './list.css'
import { useState, useEffect } from 'react' 
import axios from 'axios'

function List() {

    let ordersList = localStorage.getItem('orders')    

    function saveOrder() {
    if(ordersList.length !== null){
        if(ordersList.length > 2) {
            return <tr>
                 <th>Item</th>
                  <th>Item count</th>
                  <th>Packages count</th>
                  <th>Item M3</th>
                  <th>Item netto kg</th>
                  <th>Item brutto kg</th>
                  <th>Supplier</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
            } 
    }
     
     }

     function saveOrderButton() {
        if(ordersList.length > 2)  return <button className="save-orders-button">save</button>
     }



const [suppliers, changeSuppliers] = useState({
    isFetched: false,
    data: [],
    error: null
})
const [items, changeItems] = useState([])
const [clients, changeClients] = useState([])
const [containers, changeContainers] = useState([])
const [statuses, changeStatuses] = useState([])

let storageOrder = localStorage.getItem('orders')
if(storageOrder == null) {
    localStorage.setItem('orders', '[]')
}
let oldOrders =  JSON.parse(localStorage.getItem('orders'))
// console.log(oldOrders)


    useEffect( () => {
        ;(async () => {
            let response = await axios.get('https://logictic.herokuapp.com/getsuppliers')
            changeSuppliers({
                isFetched: true,
                data: response.data,
                error: null
            })     
        })()
     }, [])
// console.log(suppliers.data)
     useEffect( () => {
        ;(async () => {
            let resp = await axios.get('https://logictic.herokuapp.com/getitems')
            changeItems(resp.data)
        })()        
     }, [])

     useEffect( () => {
        ;(async () => {
            let res = await axios.get('https://logictic.herokuapp.com/getclients')
            changeClients(res.data)
        })()      
     }, [])

     useEffect( () => {
        ;(async () => {
            let response = await axios.get('https://logictic.herokuapp.com/getcontainer')
            changeContainers(response.data)
        })()     
     }, [])

     useEffect( () => {
        ;(async () => {
            let responses = await axios.get('https://logictic.herokuapp.com/getstatuses')
            changeStatuses(responses.data)
          })()
     }, [])


  

     let itemOrderValue = document.getElementsByClassName('itemNameOrder')
     let itemCountOrderValue = document.getElementsByClassName('itemCountOrder')
     let packageCountOrderValue = document.getElementsByClassName('packageCountOrder')
     let itemVolumeOrderValue = document.getElementsByClassName('itemVolumeOrder')
     let itemNettoOrderValue = document.getElementsByClassName('itemNettoOrder')
     let itemBruttoOrderValue = document.getElementsByClassName('itemBruttoOrder')
     let itemSupplierOrderValue = document.getElementsByClassName('itemSupplierOrder')
     let itemClientOrderValue = document.getElementsByClassName('itemClientOrder')
      
     let itemArray = []
     let itemCountArray = []
     let packageArray = []
     let volumeArray = []
     let nettoArray = []
     let bruttoArray = []
     let supplierArray = []
     let clientArray = []
    

       for(let item of itemOrderValue) {
          itemArray.push(item.innerHTML)
       }
       for(let item of itemCountOrderValue) {
          itemCountArray.push(item.innerHTML)
       }
       for(let item of packageCountOrderValue) {
          packageArray.push(item.innerHTML)
       }
       for(let item of itemVolumeOrderValue) {
          volumeArray.push(+item.innerHTML)
       }
       for(let item of itemNettoOrderValue) {
          nettoArray.push(+item.innerHTML)
       }
       for(let item of itemBruttoOrderValue) {
          bruttoArray.push(+item.innerHTML)
       }
       for(let item of itemSupplierOrderValue) {
          supplierArray.push(item.innerHTML)
       }
       for(let item of itemClientOrderValue) {
          clientArray.push(item.innerHTML)
       } 

     let orderVolume = document.getElementById('volume')
     var totalVolume = volumeArray.reduce(function(a, b) {
        return a + b;
      },0);
     if(orderVolume !== null) orderVolume.innerHTML = totalVolume

     let netto = document.getElementById('netto')
     var totalNetto = nettoArray.reduce(function(a, b) {
        return a + b;
      },0);
     if(netto !== null) netto.innerHTML = totalNetto

     let brutto = document.getElementById('brutto')
     var totalBrutto = bruttoArray.reduce(function(a, b) {
        return a + b;
      },0);
     if(brutto !== null) brutto.innerHTML = totalBrutto

   
     let statusValue = document.getElementById('statusValue')

    return (
        <div className="dashmain">
    
          <div className="list-wraper">

             <table className="alone-table">
                 <thead>
                     <tr>
                         <th>Container number</th>
                         <th>Container supplier</th>
                         <th>Voyage number</th>
                         <th>Total M3</th>
                         <th>Total netto kg</th>
                         <th>Total brutto kg</th>
                         <th>Statuses</th>
                     </tr>
                 </thead>
                 <tbody>
                     <tr>
                         <td>
                             <select id="orderContNumb" className="cNumber">
                                 {
                                     containers.map( e => {
                                         return <option key={e.container_id} value={e.container_id}>{e.container_number}</option>
                                     })
                                 }
                             </select>
                         </td>
                          <td>
                                 <select className="cNumber" id="orderContSupplier">
                                     {
                                         containers.map( e => {
                                             return <option key={e.container_id} value={e.container_id}>{e.supplier}</option>
                                         })
                                     }
                                 </select>
                          </td>

                         <td><input type="text" id="orderContVoyage" required/></td>
                         <td id="volume"></td>
                         <td id="netto"></td>
                         <td id="brutto"></td>
                        <td>
                        <select className="create-list-select" id="statusValue">
                           {
                             statuses.map( (e, i) => {
                               return <option key={e.status_id} id={e.status_id} value={e.status_id}>{e.status_name}</option>
                               })
                           }
                        </select>
                       </td>
                     </tr>
                 </tbody>
             </table>

             <form 
                onSubmit={ (evt) => {
                    evt.preventDefault()
            
                    let itemValue = document.getElementById('itemValue')
                    let itemCount = document.getElementById('itemCount')
                    let packageCount = document.getElementById('packageCount')
                    let itemVolume = document.getElementById('itemVolume')
                    let itemNetto = document.getElementById('itemNetto')
                    let itemBrutto = document.getElementById('itemBrutto')
                    let supplierVAlue = document.getElementById('supplierVAlue')
                    let clientValue = document.getElementById('clientValue')
                 
                    
                   
                        let obj = {
                            itemName: itemValue.value,
                            itemCount: itemCount.value,
                            packageCount: packageCount.value,
                            itemVolume: itemVolume.value,
                            itemNetto: itemNetto.value,
                            itemBrutto: itemBrutto.value,
                            supplierVAlue: supplierVAlue.value,
                            clientValue: clientValue.value,
                            statusValue: statusValue.value
                        }
                        
                        let oldOrders =  JSON.parse(localStorage.getItem('orders'))
                            oldOrders.push(obj)
                            localStorage.setItem('orders', JSON.stringify(oldOrders))
                            window.location.reload()
                           }
                        }
                   >
                 
              <table className="list-table">
                  <thead>
                     <tr>
                     <th>Item</th>
                      <th>Item count</th>
                      <th>Packages count</th>
                      <th>Item M3</th>
                      <th>Item netto kg</th>
                      <th>Item brutto kg</th>
                      <th>Supplier</th>
                      <th>Client</th>
                     </tr>
                  </thead>
                  <tbody>
                  <tr>
                        <td>
                            <select className="create-list-select" id="itemValue">
                        {
                          items.map( (e, i) => {
                            return <option key={e.item_id} value={e.item_name}>{e.item_name}</option>
                            })
                        }
                        </select>
                        </td>

                        <td>
                            <input className="create-list-input" id="itemCount" type="number" required placeholder="Item count..."/>
                        </td>
                        <td>
                            <input className="create-list-input" id="packageCount" type="number" required placeholder="Page count..."/>
                        </td>
                        <td>
                            <input className="create-list-input" id="itemVolume" type="number" required placeholder="M3..."/>
                        </td>
                        <td>
                            <input className="create-list-input" id="itemNetto" type="number" required placeholder="netto..."/>
                        </td>
                        <td>
                            <input className="create-list-input" id="itemBrutto" type="number" required placeholder="brutto..."/>
                        </td>
                        <td>
                            <select className="create-list-select" id="supplierVAlue">
                        {
                         suppliers.data.map( (e, i) => {
                            return <option key={e.supplier_id} value={e.supplier_name}>{e.supplier_name}</option>
                            })
                        }
                        </select>
                        </td>
                        <td>
                            <select className="create-list-select" id="clientValue">
                        {
                          clients.map( (e, i) => {
                            return <option key={e.client_id} value={e.client_name}>{e.client_name}</option>
                            })
                        }
                        </select>
                        </td>

                      </tr>
                  </tbody>
              </table>
              <button id="createListAddButton" type="submit">+</button>
                     </form>


           <form id="saveForm"
              onSubmit={ (evt) => {
                evt.preventDefault()
                       
                let orderContNumb = document.getElementById('orderContNumb')
                let orderContSupplier = document.getElementById('orderContSupplier')
                let orderContVoyage = document.getElementById('orderContVoyage')

                    let obj = {
                        itemName: itemArray,
                        itemCount: itemCountArray,
                        packageCount: packageArray,
                        itemVolume: volumeArray,
                        itemNetto: nettoArray,
                        itemBrutto: bruttoArray,
                        supplierValue: supplierArray,
                        clientValue: clientArray,
                        totalVolume: orderVolume.innerHTML,
                        totalNetto: netto.innerHTML,
                        totalBrutto: brutto.innerHTML,
                        containerNumber: orderContNumb.value,
                        containerSupplier: orderContSupplier.value,
                        containerDeparture: orderContVoyage.value,
                        status: statusValue.value,
                    }

                axios.post(`https://logictic.herokuapp.com/createload`, obj)
                .then( response => {
                  console.log(response)
                });

                localStorage.setItem('orders', '[]')
                window.location.reload()
                  }
             }
           >
                    

           <table className="list-table list-table-save">
                <thead>
           
                {saveOrder()}
                </thead>
                <tbody id="createListSaveHead" 
                onClick={ evt => {
                    if(evt.target.matches('button'))
                    {let listDeleteId = evt.target.id
                    
                        
                    let orders = JSON.parse(localStorage.getItem('orders'))
                        orders.splice(listDeleteId, 1)
                        localStorage.setItem('orders', JSON.stringify(orders))
                        window.location.reload()
                    }
                }}
                >
                    
                {
                    
                          oldOrders.map( (e, i) => {
                    return <tr id={i} key={i}>
                           <td className="itemNameOrder">{e.itemName}</td>
                           <td className="itemCountOrder">{e.itemCount}</td>
                           <td className="packageCountOrder">{e.packageCount}</td>
                           <td className="itemVolumeOrder">{e.itemVolume}</td>
                           <td className="itemNettoOrder">{e.itemNetto}</td>
                           <td className="itemBruttoOrder">{e.itemBrutto}</td>
                           <td className="itemSupplierOrder">{e.supplierVAlue}</td>
                           <td className="itemClientOrder">{e.clientValue}</td>
                           <td className="itemStatusOrder">{e.statusValue}</td>
                           <td> <button id={i} type="button">delete</button></td>
                          </tr>
                          } )
                        }
                </tbody>
              </table>
              
              {saveOrderButton()}
           </form>
            
          </div>

        </div>
    )
}

export default List