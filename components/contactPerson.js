import styles from "../styles/newCustomer.module.scss";
import TableLoading from '../app/(protectedPages)/users/loading';
import tableStyles from "../styles/contactPersonTable.module.scss";
import FaCirclePlus from "../assets/icons/faCirclePlus.svg";
import FaCilcleEllipses from "../assets/icons/faCircleEllipses.svg";
import FaCircleXmark from '../assets/icons/faCircleXmark.svg';
import FaSave from '../assets/icons/faSave.svg';
import FaCircleCheck from '../assets/icons/faCircleCheck.svg';
import { useEffect, useState } from "react";

export default function ContactPerson({ custId, setToastList, ErrorList, addContactPerson, listContactPersonDetails, updateContactPersonDetails, deleteContactPersonDetails }) {
    const [showTableUserInput, setShowTableUserInput] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [modalErrors, setmodalErrors] = useState([]);
    const { Modal } = require("bootstrap");
    const [newPerson, setNewPerson] = useState({
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        workPhone: "",
        mobile: ""
    });
    const [updatePerson, setUpdatedPerson] = useState({
        id: "",
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
        setIsloading(true);
        getContactPersonList();
    }, []);

    const handleInput = ({ target }) => {
        var temp_data = newPerson;
        if (target.name != '') {
            temp_data[target.name] = target.value;
            let temp = Object.assign({}, temp_data)
            setNewPerson(temp)
        }
    }

    const handleModalInput = ({ target }) => {
        var temp_data = updatePerson;
        if (target.name != '') {
            temp_data[target.name] = target.value;
            let temp = Object.assign({}, temp_data)
            setNewPerson(temp)
        }
    }

    const getContactPersonList = async () => {
        try {
            const result = await listContactPersonDetails(custId);
            if (result.status == 200 || result.status == 201) {
                var data = result.data;
                setItemData(data);
            }
        } catch (error) {
            if (error.response.data != undefined) {
                setErrors(error.response.data.message);
            } else {
                console.log(error);
            }
            setIsloading(false);
        }
        setIsloading(false);
    }

    const addInputsRow = () => {
        setShowTableUserInput(!showTableUserInput);
        setErrors([]);
    }

    const removeInputRow = () => {
        setIsloading(true);
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
        getContactPersonList();
    }

    const submitNewPerson = async () => {
        setErrors([]);
        setIsloading(true);
        try {
            const result = await addContactPerson(custId, newPerson);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Customer Details',
                    description: 'Added ' + newPerson.firstName + ' as a contact person',
                }]);
                getContactPersonList();
                removeInputRow();
                setIsloading(false);
            }
        } catch (error) {
            if (error.response.data != undefined) {
                setErrors(error.response.data.message);
            } else {
                console.log(error);
            }
            setIsloading(false);
        }
        setIsloading(false);
    }

    const showModal = (id) => {
        setmodalErrors([]);
        const myModal = new Modal("#updateCustomerModal");
        setUpdatedPerson(itemData[id]);
        myModal.show();
    }

    const hideModal = () => {
        setmodalErrors([]);
        setUpdatedPerson({
            id: "",
            salutation: "",
            firstName: "",
            lastName: "",
            email: "",
            workPhone: "",
            mobile: ""
        });
    }

    const updateContactPerson = async () => {
        setIsloading(true);
        setmodalErrors([]);
        var temp = {
            salutation: updatePerson.salutation,
            firstName: updatePerson.firstName,
            lastName: updatePerson.lastName,
            email: updatePerson.email,
            workPhone: updatePerson.workPhone,
            mobile: updatePerson.mobile
        }

        try {
            const result = await updateContactPersonDetails(updatePerson.id, custId, temp);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Customer Details',
                    description: 'Updated ' + newPerson.firstName + '`s details',
                }]);
                getContactPersonList();
            }
        } catch (error) {
            if (error.response.data != undefined) {
                setErrors(error.response.data.message);
            } else {
                console.log(error);
            }
            setIsloading(false);
        }
        hideModal();
    }

    const removeContactPersonEntry = async (id) => {
        try {
            const results = await deleteContactPersonDetails(id, custId);
            if (results.status == 200 || results.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Customer Details',
                    description: 'Removed as Contact Person',
                }]);
                getContactPersonList();
            }
        } catch (error) {
            if (typeof error == object && error.response.data != undefined) {
                setErrors(error.response.data.message);
            } else {
                console.log(error);
            }
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
                {isLoading
                    ? <TableLoading isLoading={true} columnLength={6} rowsLength={4} isProfile={false} />
                    : <tbody>
                        {itemData.length > 0
                            ? itemData.map(function (item, idx) {
                                return (
                                    <tr key={idx} className={`${tableStyles.companyInvoiceContactPersonRow}`}>
                                        <td>
                                            <span>{(item.salutation).toLocaleUpperCase()}.</span>
                                        </td>
                                        <td>
                                            <span>{item.firstName}</span>
                                        </td>
                                        <td>
                                            <span>{item.lastName}</span>
                                        </td>
                                        <td>
                                            <span>{item.email}</span>
                                        </td>
                                        <td>
                                            <span>{item.workPhone}</span>
                                        </td>
                                        <td>
                                            <span>{item.mobile}</span>
                                        </td>
                                        <td className={`${tableStyles.companyInvoiceContantPersonEditRow}`}>
                                            <div className="d-flex">
                                                <span onClick={() => { showModal(idx); } }><FaCilcleEllipses /></span>
                                                <span onClick={() => { removeContactPersonEntry(item.id); } } className={`${tableStyles.redColor}`}><FaCircleXmark /></span>
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
                                    <select name='salutation' className={`${styles.companySalutationSelect} form-select`} value={newPerson.salutation} onChange={handleInput}>
                                        <option defaultValue>Salutation</option>
                                        <option value="ms">Ms.</option>
                                        <option value="mr">Mr.</option>
                                        <option value="mrs">Mrs.</option>
                                        <option value="dr">Dr.</option>
                                    </select>
                                </td>
                                <td>
                                    <input name='firstName' type="text" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.firstName} placeholder='First Name' onChange={handleInput} />
                                </td>
                                <td>
                                    <input name='lastName' type="text" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.lastName} placeholder='Last Name' onChange={handleInput} />
                                </td>
                                <td>
                                    <input name='email' type="email" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.email} placeholder='Email' onChange={handleInput} />
                                </td>
                                <td>
                                    <input name='workPhone' type="number" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.workPhone} placeholder='Work Phone' onChange={handleInput} />
                                </td>
                                <td>
                                    <input name='mobile' type="number" className={`${styles.companyInvoiceTableInput} form-control`} id="companyInvoiceCompanyEmail" value={newPerson.mobile} placeholder='Mobile' onChange={handleInput} />
                                </td>
                                <td className={`${tableStyles.companyInvoiceContantPersonEditRow}`}>
                                    <div className="d-flex">
                                        <span onClick={submitNewPerson}><FaCircleCheck /></span>
                                        <span className={`${tableStyles.redColor}`} onClick={removeInputRow}><FaCircleXmark /></span>
                                    </div>
                                </td>
                            </tr>
                            : ''}
                    </tbody>}
            </table>
        </div>
            <div className="col-12 d-flex">
                {!showTableUserInput
                    ? <div className={`${styles.companyInvoiceAddContectperson} d-flex align-contect-center mb-4`} onClick={() => { addInputsRow(); } }>
                        <FaCirclePlus />
                        <span>Add Contact Person</span>
                    </div>
                    : ''}
            </div>

            {/* Modal */}
            <div
                className={`${styles.companyInvoiceModal} modal`}
                id="updateCustomerModal"
                tabIndex="-1"
                aria-labelledby="updateCustomerModalLabel"
                data-bs-backdrop="static"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className={`${styles.companyInvoiceModalHeader} modal-header`}>
                            <h5 className="modal-title">Update Contact person</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={hideModal}></button>
                        </div>
                        <div className="modal-body">
                            <ErrorList errors={modalErrors} />
                            <input value={updatePerson.id} type="hidden" name="id" />
                            <div className={`${styles.companyInvoiceNameWrapper} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                    <label className="">Salutation</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <select name='salutation' className={`${styles.companySalutationSelect} form-select`} value={updatePerson.salutation} onChange={handleModalInput}>
                                        <option defaultValue>Salutation</option>
                                        <option value="ms">Ms.</option>
                                        <option value="mr">Mr.</option>
                                        <option value="mrs">Mrs.</option>
                                        <option value="dr">Dr.</option>
                                    </select>
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceNameWrapper} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                    <label className="">First name</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" name='firstName' className={`${styles.companyInvoiceNewCustomerFirstName} form-control`} value={updatePerson.firstName} onChange={handleModalInput} placeholder='First Name' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceNameWrapper} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                    <label className="">Last name</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6">
                                    <input type="text" name='lastName' className={`${styles.companyInvoiceNewCustomerLastName} form-control`} value={updatePerson.lastName} onChange={handleModalInput} placeholder='Last Name' />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceCompanyEmailWrapper} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                    <label className={`${styles.companyInvoiceCompanyEmailLabel}`}>Email</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input name='email' type="email" className="form-control" id="companyInvoiceCompanyEmail" value={updatePerson.email} placeholder='Company Email' onChange={handleModalInput} />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceCompanyPhone} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                    <label className={`${styles.companyInvoiceCompanyPhoneLabel}`}> Work Phone</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input name='phone' type="tel" className={`${styles.companyInvoiceCompanyWorkPhone} form-control`} value={updatePerson.workPhone} placeholder='Work Phone' onChange={handleModalInput} />
                                </div>
                            </div>

                            <div className={`${styles.companyInvoiceCompanyPhone} mb-0 mb-md-4 row`}>
                                <div className="d-flex align-items-center col-12 col-lg-4 col-xl-3">
                                    <label className={`${styles.companyInvoiceCompanyPhoneLabel}`}>Mobile</label>
                                </div>
                                <div className="col-12 col-lg-6 col-xl-6 d-flex align-items-center">
                                    <input name='cellNumber' type="tel" className={`${styles.companyInvoiceCompanyMobile} form-control`} value={updatePerson.mobile} placeholder='Mobile' onChange={handleModalInput} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={updateContactPerson} type="button" data-bs-dismiss="modal" className={`${styles.companyInvoiceSaveSendButton} btn blue`}>
                                <span>
                                    <i><FaSave /></i>
                                    Update
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}