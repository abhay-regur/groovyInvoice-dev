import { useEffect, useState } from "react";
import style from "../styles/customSelect.module.scss";
import FaCirclePlus from '../assets/icons/faCirclePlus.svg';
import FaAngleDown from '../assets/icons/faAngleDown.svg';

const CustomSelectComponent = ({ data, setSeletedId, seletedId, name, isDisabled, defaultText, clickFunction }) => {


    const genrateSelectInputValue = (seletedId) => {
        let value = defaultText;
        data.forEach((e) => {
            if (e.Id == seletedId) {
                value = e.name;
            }
        });
        return value;
    }

    const handleSelect = () => {
        const customSelectInput = document.getElementById(`${name}_customSelect`);
        customSelectInput.click()
    }


    if (data != undefined) {
        return (
            <div className={`${style.companyInvoiceCustomSelectWrapper} dropdown d-flex mt-2`}>
                <input id={`${name}_customSelect`} className="dropdown-toggle w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false" value={genrateSelectInputValue(seletedId)} placeholder="Select a Value" />
                <ul className="dropdown-menu w-100">
                    {data.map(function (data, id) {
                        return (<li key={id} >
                            <option className={`${style.menuItem} dropdown-item`} value={data.Id} name={name} onClick={(e) => { handleSelect(); setSeletedId(e); }}>{data.name}</option>
                        </li>);
                    })}
                    <li key='-1'><hr className="mt-1 mb-1" /></li>
                    <li className={` ${style.menuItem} dropdown-item`} onClick={clickFunction}><i><FaCirclePlus /></i> <span>Add More</span></li>
                </ul>
            </div>
        )
    } else {
        return (
            <select className="form-select" name={name} onChange={setSeletedId} disabled={isDisabled}>
                <option defaultValue>{defaultText}</option>
            </select>
        )
    }
}

export default CustomSelectComponent;