import { useEffect, useState } from "react";
import style from "../../styles/customSelect.module.scss";
import FaCirclePlus from '../../assets/icons/faCirclePlus.svg';
import FaAngleDown from '../../assets/icons/faAngleDown.svg';
const CustomSelectComponent = ({ data, onOptionValueChange, optionValue, name, isDisabled, hasSearch, onOptionInnerButtonClick, defaultText, isInnerButtonRequired, inputClass, multiple }) => {

    const [dataList, setDataList] = useState(data);

    const genrateSelectInputValue = (optionValue) => {
        let value = defaultText;
        if (typeof data == "object") {
            data.forEach((e) => {
                if (e.Id == optionValue) {
                    value = e.name;
                }
            });
        }
        return value;
    }

    useEffect(() => {
        require("bootstrap");
    }, [])

    useEffect(() => {
        setDataList(data);
    }, [data])

    const handleSelect = (e) => {
        const customSelectInput = document.getElementById(`${name}_customSelect`);
        customSelectInput.click()
        if (typeof onOptionValueChange == 'function') {
            onOptionValueChange(e);
            if (hasSearch) {
                resetList();
            }
        }
    }

    const handleButtonClick = (e) => {
        if (typeof onOptionInnerButtonClick == 'function') {
            onOptionInnerButtonClick(e)
        }
    }

    const resetList = () => {
        const temp_Obj = data;
        setDataList(temp_Obj);
    }

    const handleSearchChange = (target) => {
        let key = target.value;
        const temp_Obj = data.filter((obj) => {
            return obj.name.toLowerCase().includes(key.toLowerCase());
        });
        setDataList(temp_Obj);
    }

    if (data != undefined && data.length > 0) {
        return (
            <div className={`${style.companyInvoiceCustomSelectWrapper} dropdown d-flex`}>
                <input id={`${name}_customSelect`} className={`dropdown-toggle w-100 ${inputClass}`} type="button" data-bs-toggle="dropdown" aria-expanded="false" value={genrateSelectInputValue(optionValue)} placeholder="Select a Value" disabled={isDisabled} />
                <i className={`${style.companyInvoiceCustomSelectInputIcon}`}><FaAngleDown /></i>
                <ul className={`${style.companyInvoiceCustomSelectMenu} dropdown-menu w-100`}>
                    {hasSearch ? <>
                        <li className={`${style.menuItem} dropdown-item sticky-top mt-1`} name={name}>
                            <input type="text" className={`${style.companyInvoiceCustomSelectSearchInput} form-control`} onChange={(e) => { handleSearchChange(e.target) }} onBlur={(e => { e.target.value = '' })} />
                            <hr className="mt-1 mb-0" />
                        </li>
                    </> : ""}
                    {dataList != undefined && dataList.length > 0 ? dataList.map(function (data, id) {

                        return (
                            <li key={id} >
                                <option className={`${style.menuItem} dropdown-item`} value={data.Id} name={name} onClick={(e) => { handleSelect(e); }}>{data.name}</option>
                            </li>
                        );
                    }) : <li key='0' ><option className={`${style.menuItem} dropdown-item`} value="" name={name} onClick={(e) => { console.log('No-Value') }}>No-Options</option></li>
                    }
                    {isInnerButtonRequired
                        ? <>
                            <li key='-1'><hr className="mt-1 mb-1" /></li>
                            <li className={` ${style.menuItem} dropdown-item`} name={name} onClick={handleButtonClick} ><i><FaCirclePlus /></i> <span name={name}>Add More</span></li>
                        </> : ""
                    }
                </ul>
            </div>
        )
    } else {
        return (
            <div className={`${style.companyInvoiceCustomSelectWrapper} dropdown d-flex`}>
                <input id={`${name}_customSelect`} className={`dropdown-toggle w-100 ${inputClass}`} type="button" data-bs-toggle="dropdown" aria-expanded="false" value={genrateSelectInputValue(optionValue)} placeholder="Select a Value" />
                <i className={`${style.companyInvoiceCustomSelectInputIcon}`}><FaAngleDown /></i>
                <ul className={`${style.companyInvoiceCustomSelectMenu} dropdown-menu w-100`}>
                    <li key='0' >
                        <option className={`${style.menuItem} dropdown-item mt-1 mb-1`} value="" name={name} onClick={(e) => { console.log('No-Value') }}>No-Options</option>
                    </li>
                    {isInnerButtonRequired
                        ? <>
                            <li key='-1'><hr className="mt-1 mb-1" /></li>
                            <li className={` ${style.menuItem} dropdown-item`} name={name} onClick={handleButtonClick}><i><FaCirclePlus /></i> <span name={name}>Add More</span></li>
                        </>
                        :
                        ""
                    }
                </ul>
            </div>
        )
    }
}

export default CustomSelectComponent;