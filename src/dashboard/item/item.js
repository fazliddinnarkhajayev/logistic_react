import './item.css'
import { useState, useEffect } from 'react'
import axios from 'axios'


function Item() {



    const [state, changeState] = useState({ modal: 'off' })
    const [items, changeItems] = useState([])
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
            let response = await axios.get('http://localhost:5000/getitems')
             changeItems(response.data)
          })()
     }, [])
  
   
    return ( 
        <div className="create-item-wrapper">
            <div className="item-header">
               <div className="create-item-container">
               <h1 className="create-title">Item</h1>
                   <div className="create-item-search-wrapper" id="roller">
                    
                    <form onInput={ async () => {
                        let name = document.getElementById('searchItem')
                            name = name.value ? document.getElementById('searchItem').value: null

                        let supplier = document.getElementById('searchSupplier')
                            supplier = supplier.value ? supplier.value : null

                        let response = await axios.get(`http://localhost:5000/searchitem/${name}/${supplier}`)
                        changeItems(response.data)
                     }
                    }>

                    <div className="search-wrapper">
                        <img src="/images/icons8-search-24.png" alt="search..." width="24" height="24"/>  
                        <input className="search" type="search" id="searchItem" placeholder="item name..." />
                        <input className="search" type="search" id="searchSupplier" placeholder="supplier..." />
                     </div>
                    </form>
                      <button className="create-add-button" onClick={ changeBlock }>+</button>
                      <div className={ changedClass() }>
                          <div className="add-wrapper">
                              <div className="add-inner">
                                  <h2 className="add-title">Create item</h2>
                                  <p className="add-name">Fazliddin</p>
                              </div>
                              <form className="add-form" id="addForm" onSubmit={ (evt) => {
                                    evt.preventDefault()
                                        let form = document.getElementById('addForm')
                                        let item = document.getElementById('addInput')
                                        let manufacturer = document.getElementById('addManu')
                                        let comment = document.getElementById('addComment')

                                  
                                        let obj = {
                                              itemName: item.value,
                                              manufacturer: manufacturer.value,
                                              itemComment: comment.value
                                    }
                                    form.reset()
                                    axios.post(`http://localhost:5000/createitem`, obj)
                                    .then( response => {
                                      console.log(response)
                                    });
                                    
                              } }>
                                  <input className="add-input" id="addInput" type="text" placeholder="Item name..."  required/>
                                  <input className="add-input" id="addManu" type="text" placeholder="Item manufacturer..."  required/>
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
                          <th>Item name</th>
                          <th>powered by</th>
                          <th>Comment</th>
                          <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                          items.map( (e, i) => {
                   return <tr key={e.item_id}>
                           <td>{e.item_id}</td>
                           <td>{e.item_name}</td>
                           <td>{e.item_manufacturer}</td>
                           <td>{e.item_comment}</td>
                           <td className="c-button-td">
                           <button  onClick={ async(evt) => {
                                let deleteId = evt.target.id
                                let response = await axios.get(`http://localhost:5000/edititem/${deleteId}`)
                                changeEditState(response.data)
                          let editId = document.getElementById('editId')
                          let editName = document.getElementById('editName')
                          let manufacturer = document.getElementById('editSupplier')
                          let editComment = document.getElementById('editComment')
                          let editDeleteButton = document.getElementsByClassName('edit-delete-button')
console.log(response.data)
                          for(let item of  response.data){
                              editId.placeholder = item.item_id
                              editName.value =  item.item_name
                              manufacturer.value = item.item_manufacturer
                              editComment.value = item.item_comment
                              editDeleteButton.id = item.container_id
                        }
                      }} id={e.item_id}>edit</button>
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
                      let manufacturer = document.getElementById('editSupplier')
                      let editComment = document.getElementById('editComment')
                  
                      let editObject = {
                          id: editId.placeholder,
                          name: editName.value,
                          manufacturer: manufacturer.value,
                          comment: editComment.value
                      }

                      form.reset()
                      axios.post(`http://localhost:5000/updateitem`, editObject)
                      .then( response => {
                        console.log(response)
                      })
                      window.location.reload()
                  
                  }}>
                  <table>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Item name</th>
                          <th>Powered by</th>
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
                                <input type="text" placeholder="Supplier..." id="editSupplier" required/>
                            </td>
                            <td>
                                <input type="text" placeholder="Comment" id="editComment" required/>
                            </td>
                            <td>
                                <button className="edit-delete-button" type="button" onClick={() => {
                                       let editId = document.getElementById('editId')
                                       axios.post(`http://localhost:5000/deleteitem`, {id: editId.placeholder})
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

export default Item