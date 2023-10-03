import styles from '@/styles/configuration.module.scss';
import ErrorList from './errorList.js';
import { useContext, useEffect, useState } from 'react';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import { getIndustryList, addIndustry, updateIndustry, deleteIndustry } from '@/services/industry.service.js';
import { ToastMsgContext } from '@/context/ToastMsg.context';
import TableLoading from '../app/(protectedPages)/users/loading';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaCircleCheck from '@/assets/icons/faCircleCheck.svg';
import FaCilcleEllipses from "@/assets/icons/faCircleEllipses.svg";
import FaCirclePlus from "@/assets/icons/faCirclePlus.svg";
import FaPlus from '@/assets/icons/faCirclePlus.svg';

export default function IndustryComponent() {

    const [errors, setErrors] = useState([]);
    const [isLoading, setIsloading] = useState(true);
    const { setToastList } = useContext(ToastMsgContext);
    const [showTableUserInput, setShowTableUserInput] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const [newIndustry, setNewIndustry] = useState({
        name: ""
    });

    const [updateIndustryData, setupdateIndustryData] = useState({
        id: "",
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

    const showUpdateSection = (id) => {
        setErrors([]);
        setShowTableUserInput(false);
        var temp = itemData.find(item => item.id == id);
        setupdateIndustryData({
            id: temp.id,
            name: temp.name
        });
        setShowUpdateForm(true);
    }

    const hideUpdateSection = () => {
        setShowUpdateForm(false);
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
            setErrors(genrateErrorMessage(error, ''));
            setIsloading(false);
        }
        setIsloading(false);
    }

    const handleInput = ({ target }) => {
        if (target.name == 'newName') {
            var temp_data = newIndustry;
            temp_data['name'] = target.value;
            let temp = Object.assign({}, temp_data)
            setNewIndustry(temp);
        } else if (target.name == 'updateName') {
            var temp_data = updateIndustryData;
            temp_data['name'] = target.value;
            let temp = Object.assign({}, temp_data)
            setupdateIndustryData(temp);
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
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const submitNewIndustry = async () => {
        setErrors([]);
        setIsloading(true);
        try {
            const result = await addIndustry(newIndustry);
            if (result.status == 200 || result.status == 201) {
                removeInputRow();
                getIndustryData();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
        }
    }

    const updateIndustry = async () => {
        setErrors([]);
        setIsloading(true);

        var data = {
            name: updateIndustryData.name
        }
        try {
            const result = await updateIndustry(data);
            if (result.status == 200 || result.status == 201) {

            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, ''));
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
                    <div className="col-5">
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
                                                        <span>{item.name}</span>
                                                    </td>
                                                    <td className={`${styles.industryComponentEditRow}`}>
                                                        <div className="d-flex">
                                                            <span onClick={() => { showUpdateSection(item.id) }}><FaCilcleEllipses /></span>
                                                            <span onClick={() => { removeIndustryEntry(item.id) }} className={`${styles.redColor}`}><FaCircleXmark /></span>
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
                        {showUpdateForm ?
                            <div className="row">
                                <div className="col-10">
                                    <h5>Add New Industry</h5>
                                </div>
                                <div className="col-12 ">
                                    <div className={`${styles.companyInvoicePaymentTermLabelWrapper} mb-4 row`}>
                                        <div className="d-flex align-items-center col-12 col-lg-4 col-xl-2">
                                            <label className={`${styles.companyInvoicePaymentTermLabel}`}>Name</label>
                                        </div>
                                        <div className="col-12 col-lg-6 col-xl-6">
                                            <input name='updateName' type="text" className="form-control" id="companyInvoicePaymentTermLabel" value={updateIndustryData.name} onChange={handleInput} placeholder='Name' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-md-2">
                                    <button name="btn-submit" className={`${styles.companyInvoiceSaveSendButton} btn blue`} onClick={() => { }}>
                                        <span>
                                            <i><FaPlus /></i>
                                            Add
                                        </span>
                                    </button>
                                </div>
                                <div className="col-4 col-md-2">
                                    <button className={`${styles.companyInvoiceCancelButton} btn blueOutline`} onClick={hideUpdateSection}>
                                        <span>
                                            <i><FaCircleXmark /></i>
                                            Cancel
                                        </span>
                                    </button>
                                </div>
                            </div>
                            : !showTableUserInput
                                ?
                                <button className={`${styles.companyInvoiceAddIndustry} d-flex align-contect-center btn blue mb-4`} onClick={() => { addInputsRow() }}>
                                    <span><i><FaCirclePlus /></i>Add Contact Person</span>
                                </button>
                                : ''
                        }
                    </div>
                </div>
            </div>
        </div>
    </>);
}