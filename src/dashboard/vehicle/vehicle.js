import { useState, useEffect } from 'react'
import axios from 'axios'


function Vehicle() {



    const [state, changeState] = useState({ modal: 'off' })
    const [vehicles, changeVehicles] = useState([])
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
            let response = await axios.get('http://localhost:5000/getvehicletypes')
            changeVehicles(response.data)
          })()
     }, [])


    return ( 
        <div className="create-item-wrapper">
            <div className="item-header">
               <div className="create-item-container">
               <h1 className="create-title">Vehicles</h1>
                   <div className="create-item-search-wrapper" id="roller">
                   <form onInput={ async () => {
                        let name = document.getElementById('searchItem')
                            name = name.value ? document.getElementById('searchItem').value.toUpperCase(): null

                        let response = await axios.get(`http://localhost:5000/searchvehicletypes/${name}`)
                        changeVehicles(response.data)
                     }
                    }>
                     <div className="search-wrapper">
                          <img src="/images/icons8-search-24.png" alt="search..." width="24" height="24"/>  
                          <input className="search" type="search" id="searchItem" placeholder="Vehicle type..." />
                      </div>
                   </form>
                      <button className="create-add-button" onClick={ changeBlock }>+</button>
                      <div className={ changedClass() }>
                          <div className="add-wrapper">
                              <div className="add-inner">
                                  <h2 className="add-title">Create Type of vehicle</h2>
                                  <p className="add-name">Fazliddin</p>
                              </div>
                              <form className="add-form" id="addForm" onSubmit={ (evt) => {
                                     evt.preventDefault()
                                     let form = document.getElementById('addForm')
                                     let vehicleTypeName = document.getElementById('addInput')
                                     let comment = document.getElementById('addComment')
 
                               
                                     let obj = {
                                        vehicleTypeName: vehicleTypeName.value,
                                        vehicleTypeComment: comment.value
                                 }
                                 form.reset()
                                 axios.post(`http://localhost:5000/createvehicletype`, obj)
                                 .then( response => {
                                   console.log(response)
                                 });
                              } }>
                                  <input className="add-input" id="addInput" type="text" placeholder="Vehicle type..."  required/>
                                  <textarea className="add-comment" id="addComment" placeholder="Comment..." required></textarea>
                                  <div className="add-button-wrapper">
                                      <button className="add-save-button">Save</button>
                                      <button className="add-cancel-button" onClick={ changeBlock } type="button" >Cancel</button>
                                  </div>
                              </form>
                          </div>
                      </div>
                   </div>
              
                <table className="item-table">
                    <thead>
                        <tr>
                          <th>#</th>
                          <th>Vehicle type</th>
                          <th>Comment</th>
                          <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                          vehicles.map( (e, i) => {
                   return <tr key={e.vehicle_id}>
                           <td>{e.vehicle_type_id}</td>
                           <td>{e.vehicle_type_name}</td>
                           <td>{e.vehicle_type_comment}</td>
                           <td className="c-button-td">
                           <button  onClick={ async(evt) => {
                                let deleteId = evt.target.id
                                let response = await axios.get(`http://localhost:5000/editvehicletypes/${deleteId}`)
                                changeEditState(response.data)
                          let editId = document.getElementById('editId')
                          let editName = document.getElementById('editName')
                          let editComment = document.getElementById('editComment')
                          let editDeleteButton = document.getElementsByClassName('edit-delete-button')
console.log(response.data)
                          for(let item of  response.data){
                              editId.placeholder = item.vehicle_type_id
                              editName.value =  item.vehicle_type_name
                              editComment.value = item.vehicle_type_comment
                              editDeleteButton.id = item.vehicle_type_id
                        }
                      }} id={e.vehicle_type_id}>edit</button>
                           </td>
                          </tr>
                          } )
                        }
                       
                    </tbody>
                </table>
               </div>
            </div>

{/* edit */}

<div className={ editClass() }>
              <div className="edit-table-wrapper">
                  <button className="edit-cancel-button" onClick={()=> {
                      changeEditState([])
                  }}>x</button>
                  <form id="form" onSubmit={(evt) => {
                      evt.preventDefault()
            
                      let form = document.getElementById('form')
                     
                      let editId = document.getElementById('editId')
                      let editName = document.getElementById('editName')
                      let editComment = document.getElementById('editComment')
                  
                      let editObject = {
                          id: editId.placeholder,
                          name: editName.value,
                          comment: editComment.value
                      }

                      form.reset()
                      axios.post(`http://localhost:5000/updatevehicletypes`, editObject)
                      .then( response => {
                        console.log(response)
                      })
                      window.location.reload()
                  
                  }}>
                  <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Supplier name</th>
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
                                <input type="text" placeholder="Name..." id="editName" required/>
                            </td>
                            <td>
                                <input type="text" placeholder="Comment" id="editComment" required/>
                            </td>
                            <td>
                                <button className="edit-delete-button" type="button" onClick={() => {
                                       let editId = document.getElementById('editId')
                                       axios.post(`http://localhost:5000/deletevehicletypes`, {id: editId.placeholder})
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

export default Vehicle