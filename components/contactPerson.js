import styles from "@/styles/newCustomer.module.scss";
import TableLoading from '../app/(protectedPages)/users/loading';
import tableStyles from "@/styles/contactPersonTable.module.scss";
import FaCirclePlus from "@/assets/icons/faCirclePlus.svg";
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import FaCircleCheck from '@/assets/icons/faCircleCheck.svg';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import { useEffect, useState } from "react";
import { addContactPerson, deleteContactPersonDetails, listContactPersonDetails, updateContactPersonDetails } from "@/services/customer.service";

export default function ContactPerson({ customerId, setToastList, ErrorList }) {
    const [showTableUserInput, setShowTableUserInput] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(-1);
    const [errors, setErrors] = useState([]);

    const [newPerson, setNewPerson] = useState({
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        workPhone: "",
        mobile: ""
    });

    const [itemData, setItemData] = useState([
        {
            salutation: "",
            firstName: "",
            lastName: "",
            email: "",
            workPhone: "",
            mobile: ""
        }
    ]);

    useEffect(() => {
        setIsLoading(true);
        getContactPersonList();
    }, []);

    const handleInlineNewInput = ({ target }) => {
        var temp_data = newPerson;
        if (target.name != '') {
            temp_data[target.name] = target.value;
            let temp = Object.assign({}, temp_data)
            setNewPerson(temp)
        }
    }

    const handleInlineUpdateInput = (index, e) => {
        e.preventDefault();
        setIsEditing(index);
        const rowData = itemData[index];
        rowData[e.target.name] = e.target.value;
        itemData[index] = rowData;
        let temp = Object.assign([], itemData);
        setItemData(temp);
    }

    const handleInlineUpdate = async (index, id) => {
        setErrors([]);
        setIsLoading(true);
        const rowData = itemData[index];
        var data = {
            salutation: rowData.salutation,
            firstName: rowData.firstName,
            lastName: rowData.lastName,
            email: rowData.email,
            workPhone: rowData.workPhone,
            mobile: rowData.mobile
        }
        try {
            var result = await updateContactPersonDetails(id, customerId, data);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Customer Details',
                    description: 'Updated ' + data.firstName + '`s details',
                }]);
                getContactPersonList();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsEditing(-1);
            setIsLoading(false);
        }
        setIsEditing(-1);
        setIsLoading(false);
    }

    const getContactPersonList = async () => {
        try {
            const result = await listContactPersonDetails(customerId);
            if (result.status == 200 || result.status == 201) {
                var data = result.data;
                setItemData(data);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const addInputsRow = () => {
        setShowTableUserInput(!showTableUserInput);
        setErrors([]);
    }

    const removeInputRow = () => {
        setShowTableUserInput(!showTableUserInput);
        setNewPerson({
            salutation: "",
            firstName: "",
            lastName: "",
            email: "",
            workPhone: "",
            mobile: ""
        })
        setErrors([]);
    }

    const submitNewPerson = async () => {
        setErrors([]);
        setIsLoading(true);
        try {
            const result = await addContactPerson(customerId, newPerson);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Customer Details',
                    description: 'Added ' + newPerson.firstName + ' as a contact person',
                }]);
                getContactPersonList();
                removeInputRow();
                setIsLoading(false);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const handleRemove = (id) => {
        setErrors([]);
        setIsLoading(true);
        if (isEditing > -1) {
            setErrors([]);
            setIsEditing(-1);
            getContactPersonList();
            setIsLoading(false)
        } else {
            if (id != undefined) {
                removeContactPersonEntry(id);
            }
        }
    }

    const removeContactPersonEntry = async (id) => {
        try {
            const results = await deleteContactPersonDetails(id, customerId);
            if (results.status == 200 || results.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Customer Details',
                    description: 'Removed as Contact Person',
                }]);
                getContactPersonList();
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
        }
    }

    return (
        <>
            <div className={`${styles.companyInvoiceContactPersonListTableWrapper} row`}>
                <div className="col-12">
                    <ErrorList errors={errors} />
                </div>
                <div className="col-12 overflow-x-auto">
                    <table className={`${styles.companyInvoiceContactPersonTable} table`}>
                        <thead>
                            <tr>
                                <th scope="col" className="text-left">Salutation</th>
                                <th scope="col" className="text-left">First Name</th>
                                <th scope="col" className="text-left">Last Name</th>
                                <th scope="col" className="text-left">Email Address</th>
                                <th scope="col" className="text-left">Work Phone</th>
                                <th scope="col" className="text-left">Mobile</th>
                                <th scope="col" className={`${styles.companyInvoiceTableEditButtonsHeader}`}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {itemData.length > 0
                                ? itemData.map(function (item, idx) {
                                    return (
                                        <tr key={idx} className={`${tableStyles.companyInvoiceContactPersonRow}`}>
                                            <td>
                                                <select name='salutation' className={`${styles.companySalutationSelect} form-select`} value={item.salutation} onChange={(e) => handleInlineUpdateInput(idx, e)}>
                                                    <option defaultValue>Salutation</option>
                                                    <option value="ms">Ms.</option>
                                                    <option value="mr">Mr.</option>
                                                    <option value="mrs">Mrs.</option>
                                                    <option value="dr">Dr.</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input name='firstName' type="text" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={item.firstName} placeholder='First Name' onChange={(e) => handleInlineUpdateInput(idx, e)} />
                                            </td>
                                            <td>
                                                <input name='lastName' type="text" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={item.lastName} placeholder='Last Name' onChange={(e) => handleInlineUpdateInput(idx, e)} />
                                            </td>
                                            <td>
                                                <input name='email' type="email" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={item.email} placeholder='Email' onChange={(e) => handleInlineUpdateInput(idx, e)} />
                                            </td>
                                            <td>
                                                <input name='workPhone' type="number" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={item.workPhone} placeholder='Work Phone' onChange={(e) => handleInlineUpdateInput(idx, e)} />
                                            </td>
                                            <td>
                                                <input name='mobile' type="number" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={item.mobile} placeholder='Mobile' onChange={(e) => handleInlineUpdateInput(idx, e)} />
                                            </td>
                                            <td className={`${tableStyles.companyInvoiceContantPersonEditRow}`}>
                                                <div className="d-flex">
                                                    {isEditing == idx ? <span onClick={() => handleInlineUpdate(idx, item.id)}><FaCircleCheck /></span> : <></>}
                                                    <span onClick={() => { handleRemove(item.id); }} className={`${tableStyles.redColor}`}><FaCircleXmark /></span>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                                :
                                <tr className={`${tableStyles.companyInvoiceContactPersonRow}`}>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td>
                                        <span>-</span>
                                    </td>
                                    <td className={`${tableStyles.companyInvoiceContantPersonEditRow}`}>

                                    </td>
                                </tr>}
                            {showTableUserInput
                                ? <tr className={`${tableStyles.companyInvoiceContactPersonRow}`}>
                                    <td>
                                        <select name='salutation' className={`${styles.companySalutationSelect} form-select`} value={newPerson.salutation} onChange={handleInlineNewInput}>
                                            <option defaultValue>Salutation</option>
                                            <option value="ms">Ms.</option>
                                            <option value="mr">Mr.</option>
                                            <option value="mrs">Mrs.</option>
                                            <option value="dr">Dr.</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input name='firstName' type="text" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.firstName} placeholder='First Name' onChange={handleInlineNewInput} />
                                    </td>
                                    <td>
                                        <input name='lastName' type="text" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.lastName} placeholder='Last Name' onChange={handleInlineNewInput} />
                                    </td>
                                    <td>
                                        <input name='email' type="email" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.email} placeholder='Email' onChange={handleInlineNewInput} />
                                    </td>
                                    <td>
                                        <input name='workPhone' type="number" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.workPhone} placeholder='Work Phone' onChange={handleInlineNewInput} />
                                    </td>
                                    <td>
                                        <input name='mobile' type="number" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.mobile} placeholder='Mobile' onChange={handleInlineNewInput} />
                                    </td>
                                    <td className={`${tableStyles.companyInvoiceContantPersonEditRow}`}>
                                        <div className="d-flex">
                                            <span onClick={submitNewPerson}><FaCircleCheck /></span>
                                            <span className={`${tableStyles.redColor}`} onClick={removeInputRow}><FaCircleXmark /></span>
                                        </div>
                                    </td>
                                </tr>
                                : ''}
                        </tbody>
                    </table>
                </div>
                <div className="col-12 d-flex">
                    {!showTableUserInput
                        ? <div className={`${styles.companyInvoiceAddContectperson} d-flex align-contect-center mb-4`} onClick={() => { addInputsRow(); }}>
                            <FaCirclePlus />
                            <span>Add Contact Person</span>
                        </div>
                        : ''}
                </div>
            </div>
        </>
    )
}