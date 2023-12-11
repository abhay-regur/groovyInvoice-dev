import styles from '@/styles/configuration.module.scss';
import ErrorList from './errorList.js';
import { useContext, useEffect, useState } from 'react';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import { getIndustryList, addIndustry, updateIndustry, deleteIndustry } from '@/services/industry.service.js';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import TableLoading from '../app/(protectedPages)/users/loading';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaCircleCheck from '@/assets/icons/faCircleCheck.svg';
import FaCirclePlus from "@/assets/icons/faCirclePlus.svg";

export default function IndustryComponent() {

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { setToastList } = useContext(ToastMsgContext);
    const [isEditing, setIsEditing] = useState(-1);
    const [showTableUserInput, setShowTableUserInput] = useState(false);

    const [newIndustry, setNewIndustry] = useState({
        name: ""
    });

    const [itemData, setItemData] = useState([{
        id: 0,
        name: "",
    }]);

    useEffect(() => {
        setErrors([]);
        getIndustryData()
    }, [])


    const handleChange = (index, e) => {
        e.preventDefault();
        setIsEditing(index);
        const rowData = itemData[index];
        rowData.name = e.target.value;
        itemData[index] = rowData;
        let temp = Object.assign([], itemData);
        setItemData(temp);
    }

    const handleInlineUpdate = async (index, id) => {
        setErrors([]);
        setIsLoading(true);
        const rowData = itemData[index];
        var data = {
            name: rowData.name
        }
        try {
            var result = await updateIndustry(id, data);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Industries',
                    description: 'Entry Updated',
                }]);
                getIndustryData();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsEditing(-1);
            setIsLoading(false);
        }
        setIsEditing(-1);
        setIsLoading(false);
    }

    const addInputsRow = () => {
        setShowTableUserInput(!showTableUserInput);
        setErrors([]);
    }

    const getIndustryData = async () => {
        try {
            const result = await getIndustryList();
            if (result.status == 200 || result.status == 201) {
                setItemData(result.data);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const handleInput = ({ target }) => {
        if (target.name == 'newName') {
            var temp_data = newIndustry;
            temp_data['name'] = target.value;
            let temp = Object.assign({}, temp_data)
            setNewIndustry(temp);
        }
    }

    const handleRemove = (id) => {
        setErrors([]);
        setIsLoading(true);
        if (isEditing > -1) {
            setErrors([]);
            setIsEditing(-1);
            getIndustryData();
            setIsLoading(false)
        } else {
            if (id != undefined) {
                removeIndustryEntry(id);
            }
        }
    }

    const removeIndustryEntry = async (id) => {
        try {
            const results = await deleteIndustry(id);
            if (results.status == 200 || results.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Industry List Changed',
                    description: 'Item Removed',
                }]);
                getIndustryData();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const submitNewIndustry = async () => {
        setErrors([]);
        setIsLoading(true);
        try {
            const result = await addIndustry(newIndustry);
            if (result.status == 200 || result.status == 201) {
                removeInputRow();
                getIndustryData();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    const removeInputRow = () => {
        setShowTableUserInput(!showTableUserInput);
        setNewIndustry({
            name: ""
        });
        setErrors([]);
    }

    return (<>
        <div className="card mb-4">
            <div className={`${styles.industryComponentWrapper} card-body`}>
                <h4>Industries</h4>
                <hr />
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-7">
                        <ErrorList errors={errors} />
                        <table className='table mb-4'>
                            <thead>
                                <tr>
                                    <th scope="col" className="text-left">Sr.</th>
                                    <th scope="col" className="text-left">Name</th>
                                </tr>
                            </thead>
                            {isLoading
                                ? <TableLoading isLoading={true} columnLength={2} rowsLength={4} isProfile={false} />
                                : <tbody>
                                    {itemData.length > 0
                                        ? itemData.map(function (item, idx) {
                                            return (
                                                <tr key={idx} className={`${styles.industryComponentRow}`}>
                                                    <td>
                                                        <span>{idx + 1}</span>
                                                    </td>
                                                    <td>
                                                        <input type='text' className='form-control' name='label' value={item.name} onChange={(e) => handleChange(idx, e)} />
                                                    </td>
                                                    <td className={`${styles.industryComponentEditRow}`}>
                                                        <div className="d-flex">
                                                            {isEditing == idx ? <span onClick={() => handleInlineUpdate(idx, item.id)}><FaCircleCheck /></span> : <></>}
                                                            <span onClick={() => { handleRemove(item.id) }} className={`${styles.redColor}`}><FaCircleXmark /></span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr className={`${styles.industryComponentRow}`}>
                                            <td>
                                                <span>-</span>
                                            </td>
                                            <td>
                                                <span>-</span>
                                            </td>
                                            <td className={`${styles.industryComponentRow}`}>

                                            </td>
                                        </tr>
                                    }
                                    {showTableUserInput
                                        ? <tr className={`${styles.industryComponentRow}`}>
                                            <td>
                                                <span>-</span>
                                            </td>
                                            <td>
                                                <input name='newName' type="text" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newIndustry.name} placeholder='Name' onChange={handleInput} />
                                            </td>
                                            <td className={`${styles.industryComponentEditRow}`}>
                                                <div className="d-flex">
                                                    <span onClick={submitNewIndustry}><FaCircleCheck /></span>
                                                    <span className={`${styles.redColor}`} onClick={removeInputRow}><FaCircleXmark /></span>
                                                </div>
                                            </td>
                                        </tr>
                                        : ''
                                    }
                                </tbody>
                            }
                        </table>
                    </div>

                    <div className="col-8 offset-md-2">
                        <button className={`${styles.companyInvoiceAddIndustry} d-flex align-contect-center btn blue mb-4`} onClick={addInputsRow}>
                            <span><i><FaCirclePlus /></i>Add New Industry</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}