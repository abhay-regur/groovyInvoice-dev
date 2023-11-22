import React from "react"
import style from "@/styles/itemsAutoCompleteTextArea.module.scss";

const ItemsAutoCompleteTextArea = (props) => {

  return (
    <div>
      <textarea placeholder="Type or click to select an item." data-bs-toggle="dropdown" className='form-control' name='itemDescription' onChange={props.handleChange} value={props.value} />
      <ul className={`${style.companyInvoiceCustomSelectMenu} dropdown-menu`}>
        {props.items.length > 0 ? (
          props.items.map(function (item, index) {
            return (
              <li key={index} onClick={() => props.handleSelect(item)}>
                <div className={`${style.menuItem} dropdown-item`}>
                  <div className={`${style.description}`} >{item.description}</div>
                  <div className={`${style.rate}`}>Rate: {item.rate}</div>
                </div>
              </li>
            );
          })
        ) : (
          <li >
            <div className={`${style.menuItem} dropdown-item`}>
              <span> No result found. Try a different keyword</span>
            </div>
          </li>
        )
        }

      </ul>
    </div>
  )
}

export default ItemsAutoCompleteTextArea;
