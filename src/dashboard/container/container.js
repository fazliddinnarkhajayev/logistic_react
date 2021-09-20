import axios from 'axios'
import './container.css'
import { useState, useEffect } from 'react'


function Container() {

    const [currencies, changeCurrencies] = useState([])
    const [vehicles, changeVehicles] = useState([])
    const [state, changeState] = useState({ modal: 'off' })
    const [container, changeContainer] = useState([])
    const [editState, changeEditState] = useState([])
    function editClass() {
        if(editState.length > 0) {
            return 'edit-wrapper'
        }else if(editState.length === 0) {
            return 'edit-wrapper-none'
        }
    }

    function changedClass() {
        if(state.modal === 'off') return 'add-modal-none'
        if(state.modal === 'on') return 'add-modal'
    }

    function changeBlock() {
        if(state.modal === 'off') {
            changeState(state.modal = { modal: 'on' })
        }else{
            changeState(state.modal = { modal: 'off' })
        } 
    }

    useEffect( () => {
      ;(async () => {
          let response = await axios.get('http://localhost:5000/getcontainer')
           changeContainer(response.data)
        })()
   }, [])

   useEffect( () => {
    ;(async () => {
        let response = await axios.get('http://localhost:5000/getvehicletypes')
        changeVehicles(response.data)
      })()
 }, [])

 useEffect( () => {
    ;(async () => {
        let response = await axios.get('http://localhost:5000/getcurrencies')
        changeCurrencies(response.data)
      })()
 }, [])


  
    return ( 
        <div className="create-item-wrapper">
            <div className="item-header">
               <div className="create-container-container">
               <h1 className="create-title">Container</h1>
                   <div className="create-item-search-wrapper" id="roller">
                   <form onInput={async() => {
                       let contact = document.getElementById('searchItem')
                           contact = contact.value ? document.getElementById('searchItem').value.toUpperCase(): null

                           let type = document.getElementById('searchContainerType')
                           type = type.value ? document.getElementById('searchContainerType').value : null

                       let supplier = document.getElementById('searchSupplier')
                           supplier = supplier.value ? supplier.value : null

                       let response = await axios.get(`http://localhost:5000/searchcont/${contact}/${type}/${supplier}`)
                       changeContainer(response.data)
                     }}>
                     <div className="search-wrapper">
                          <img src="/images/icons8-search-24.png" alt="search..." width="24" height="24"/>  
                          <input className="search" type="search" id="searchItem" placeholder="Container number..." />
                          <input className="search" type="search" id="searchContainerType" placeholder="Container type..." />
                          <input className="search" type="search" id="searchSupplier" placeholder="supplier..." />
                       </div>
                    </form>
                      <button className="create-add-button" onClick={ changeBlock }>+</button>
                      <div className={ changedClass() }>
                          <div className="add-wrapper">
                              <div className="add-inner">
                                  <h2 className="add-title">Create container</h2>
                                  <p className="add-name">Fazliddin</p>
                              </div>
                              <form className="add-form" id="addForm" onSubmit={ (evt) => {
                                    evt.preventDefault()
                                    let form = document.getElementById('addForm')

                                    let containerNumber = document.getElementById('addInput')
                                    let containerType = document.getElementById('addType')
                                    let containerSupplier = document.getElementById('addSupplier')
                                    let containerPrice = document.getElementById('addPrice')
                                    let currency = document.getElementById('addCurrency')
                                    let comment = document.getElementById('addComment')
                                  
                                    let obj = {
                                      containerNumber: containerNumber.value,
                                      containerType: containerType.value,
                                      containerSupplier: containerSupplier.value,
                                      containerPrice: currency.value + containerPrice.value,
                                      containerComment: comment.value
                                    }
                                    form.reset()
                                    axios.post(`http://localhost:5000/createcontainer`, obj)
                                    .then( response => {
                                    //   console.log(response)
                                    });
                                    window.location.reload()
                              } }>

                            <div className="add-container-box">
                                <div className="add-container-box-inner">
                                    <p className="add-container-date-top">Date</p>
                                    <p className="add-container-date">{new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()}</p>

                                         {/* <div>
                                               <p className="add-container-type-text">Container number</p>
                                               <select id="addInput">
                                               {
                                                 container.map((e, i) => {
                                                    return <option key={i} value={e.container_number}>{e.container_number}</option>
                                                 })
                                               }
                                                </select>
                                          </div> */}
                                          <label className="number-label" htmlFor="addInput">Container number</label>
                                          <input className="add-container-input" id="addInput" type="text" placeholder="Container number..."  required/>

                                          <div>
                                            <p className="add-container-type-text">Container type</p>
                                            <select id="addType">
                                            {
                                              vehicles.map(e => {
                                                 return <option key={e.vehicle_type_id} value={e.vehicle_type_name}>{e.vehicle_type_name}</option>
                                              })
                                            }
                                             </select>
                                       </div>
                                  </div>


                                  <div className="add-container-box-inner">
                                    <label className="price-label" htmlFor="addSupplier">Container supplier</label>
                                      <input className="add-container-input" id="addSupplier" type="text" placeholder="supplier..."  required/>
                                        
                                     <div className="add-container-price-wrapper">

                                       <div>
                                       <label  htmlFor="addPrice">Container price </label>
                                        <input className="add-container-input" id="addPrice" type="text" placeholder="price..."  required/>
                                       </div>

                                       <div>
                                            <p className="add-container-price-text">currency</p>
                                       <select id="addCurrency">
                                       {
                                              currencies.map(e => {
                                                 return <option key={e.currency_id} value={e.currency_name}>{e.currency_name}</option>
                                              })
                                            }
                                        </select>
                                       </div>
                                     </div>
                                  </div>
                             
                            </div>
                                  <textarea className="add-comment-container" id="addComment" placeholder="Comment..." required></textarea>


                                  <div className="add-button-wrapper">
                                      <button className="add-save-button">Save</button>
                                      <button className="add-cancel-button" onClick={  changeBlock } type="button" >Cancel</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                   </div>
              
                <table className="item-table">
                    <thead>
                        <tr>
                          <th>#</th>
                          <th>creation date</th>
                          <th>Container number</th>
                          <th>Container type</th>
                          <th>Container price</th>
                          <th>Supplier</th>
                          <th>Comment</th>
                          <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          container.map( (e, i) => {
                   return <tr key={e.container_id}>
                           <td>{e.container_id}</td>
                           <td>{e.date_of_creation_container}</td>
                           <td>{e.container_number}</td>
                           <td>{e.container_type}</td>
                           <td>{e.container_price}</td>
                           <td>{e.supplier}</td>
                           <td>{e.container_comment}</td>
                           <td className="c-button-td">
                           
                            <button onClick={ async(evt) => {
                                let deleteId = evt.target.id
                                let response = await axios.get(`http://localhost:5000/editcont/${deleteId}`)
                                changeEditState(response.data)

                             
                                
                          let editId = document.getElementById('editId')
                          let editDate = document.getElementById('editContainerDate')
                          let editNumber = document.getElementById('editNumber')
                          let editType = document.getElementById('editType')
                          let editPrice = document.getElementById('editPrice')
                          let editSupplier = document.getElementById('editSupplier')
                          let editComment = document.getElementById('editComment')
                          let editDeleteButton = document.getElementsByClassName('edit-delete-button')

                          for(let item of  response.data){
                              editId.placeholder = item.container_id
                              editDate.value =  item.date_of_creation_container
                              editNumber.value = item.container_number
                              editType.value = item.container_type
                              editPrice.value = item.container_price
                              editSupplier.value = item.supplier
                              editComment.value = item.container_comment
                              editDeleteButton.id = item.container_id
                        }
                        }} id={e.container_id}>edit</button>
                           
                           </td>
                          </tr>
                          } )
                        }
                    
                    </tbody>
                </table>
               </div>
            </div>

            <div className={ editClass() }>
              <div className="edit-table-wrapper">
                  <button className="edit-cancel-button" onClick={()=> {
                      changeEditState([])
                  }}>x</button>
                  <form id="form" onSubmit={(evt) => {
                      evt.preventDefault()
            
                      let form = document.getElementById('form')
                      let editId = document.getElementById('editId')
                      let editDate = document.getElementById('editContainerDate')
                      let editNumber = document.getElementById('editNumber')
                      let editType = document.getElementById('editType')
                      let editPrice = document.getElementById('editPrice')
                      let editSupplier = document.getElementById('editSupplier')
                      let editComment = document.getElementById('editComment')
                  
                      let editObject = {
                          id: editId.placeholder,
                          date: editDate.value,
                          number: editNumber.value,
                          type: editType.value,
                          price: editPrice.value,
                          suppier: editSupplier.value,
                          comment: editComment.value
                      }

                      form.reset()
                      axios.post(`http://localhost:5000/editcontainer`, editObject)
                      .then( response => {
                        console.log(response)
                      })
                      window.location.reload()
                  
                  }}>
                  <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>creation date</th>
                          <th>Container number</th>
                          <th>Container type</th>
                          <th>Container price</th>
                          <th>Supplier</th>
                          <th>Comment</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="edit_row">
                            <td>
                                <input type="text" placeholder="#" id="editId" disabled/>
                            </td>
                            <td>
                                <input type="text" placeholder="Container date..." id="editContainerDate" required/>
                            </td>
                            <td>
                                <input type="text" placeholder="Container number..." id="editNumber" required/>
                            </td>
                            <td>
                                <input type="text" placeholder="Container type..." id="editType" required/>
                            </td>
                            <td>
                                <input type="text" placeholder="Container price..." id="editPrice" required/>
                            </td>
                            <td>
                                <input type="text" placeholder="Supplier..." id="editSupplier" required/>
                            </td>
                            <td>
                                <input type="text" placeholder="Comment" id="editComment" required/>
                            </td>
                            <td>
                                <button className="edit-delete-button" type="button" onClick={() => {
                                       let editId = document.getElementById('editId')
                                       axios.post(`http://localhost:5000/deletecontainer`, {id: editId.placeholder})
                                       .then( response => {
                                         console.log(response)
                                       })
                                       window.location.reload()
                                   
                                }}>Delete</button>
                            </td>
                        </tr>
                      </tbody>
                  </table>
                  <button className="edit-add-button">Save</button>
                  </form>
              </div>
            </div>

        </div>
    )
}

export default Container