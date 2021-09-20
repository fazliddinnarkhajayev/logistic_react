import './supplier.css'
import { useState, useEffect } from 'react'
import axios from 'axios'



function Supplier() {



    const [state, changeState] = useState({ modal: 'off' })
    const [suppliers, changeSuppliers] = useState([])
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
            let response = await axios.get('https://logictic.herokuapp.com/getsuppliers')
            changeSuppliers(response.data)
          })()
     }, [])

  

    return ( 
        <div className="create-item-wrapper">
            <div className="item-header">
               <div className="create-item-container">
                   <h1 className="create-title">Supplier</h1>
                   <div className="create-item-search-wrapper" id="roller">
                   <form  onInput={ async () => {
                        let itemName = document.getElementById('searchItem')
                            itemName = itemName.value ? document.getElementById('searchItem').value.toUpperCase(): null

                    
                        let response = await axios.get(`https://logictic.herokuapp.com/searchsupplier/${itemName}`)
                        changeSuppliers(response.data)
                     }
                    }>
                   <div className="search-wrapper">
                        <img src="/images/icons8-search-24.png" alt="search..." width="24" height="24"/>  
                        <input className="search" type="search" id="searchItem" placeholder="Supplier name..." />
                     </div>
                   </form>
                      <button className="create-add-button" onClick={ changeBlock }>+</button>
                      <div className={ changedClass() }>
                          <div className="add-wrapper">
                              <div className="add-inner">
                                  <h2 className="add-title">Create Supplier</h2>
                                  <p className="add-name">Fazliddin</p>
                              </div>
                              <form className="add-form" id="addForm" onSubmit={ (evt) => {
                                    evt.preventDefault()
                                    let form = document.getElementById('addForm')
                                    let supplierName = document.getElementById('addInput')
                                    let comment = document.getElementById('addComment')

                              
                                    let obj = {
                                          supplierName: supplierName.value,
                                          supplierComment: comment.value
                                }
                                form.reset()
                                axios.post(`https://logictic.herokuapp.com/createsupplier`, obj)
                                .then( response => {
                                  console.log(response)
                                });
                                    
                              } }>
                                  <input className="add-input" id="addInput" type="text" placeholder="Supplier name..."  required/>
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
                          <th>Supplier name</th>
                          <th>comment</th>
                          <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                          suppliers.map( (e, i) => {
                   return <tr key={e.supplier_id}>
                           <td>{e.supplier_id}</td>
                           <td>{e.supplier_name}</td>
                           <td>{e.supplier_comment}</td>
                           <td className="c-button-td">
                           <button  onClick={ async(evt) => {
                                let deleteId = evt.target.id
                                let response = await axios.get(`https://logictic.herokuapp.com/editsupplier/${deleteId}`)
                                changeEditState(response.data)
                          let editId = document.getElementById('editId')
                          let editName = document.getElementById('editName')
                          let editComment = document.getElementById('editComment')
                          let editDeleteButton = document.getElementsByClassName('edit-delete-button')
console.log(response.data)
                          for(let item of  response.data){
                              editId.placeholder = item.supplier_id
                              editName.value =  item.supplier_name
                              editComment.value = item.supplier_comment
                              editDeleteButton.id = item.supplier_id
                        }
                      }} id={e.supplier_id}>edit</button>
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
                      axios.post(`https://logictic.herokuapp.com/updatesupplier`, editObject)
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
                                       axios.post(`https://logictic.herokuapp.com/deletesupplier`, {id: editId.placeholder})
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

export default Supplier