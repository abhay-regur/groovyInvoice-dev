import styles from "@/styles/popup.module.scss";
import ErrorList from './errorList.js';
import { useEffect, useState, useRef } from 'react';
import FaSave from '@/assets/icons/faSave.svg';
import FaCircleXmark from '@/assets/icons/faCircleXmark.svg';
import { genrateErrorMessage } from '@/utils/errorMessageHandler.utils';
import { addIndustry } from '@/services/industry.service.js';

export default function IndustryModal({ getIndustryData, setToastList, Loading }) {
    const closeModalBtn = useRef();
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newIndustry, setNewIndustry] = useState({
        name: ""
    });

    useEffect(() => {
        setErrors([]);
    }, [])

    const handleInput = ({ target }) => {
        if (target.name == 'name') {
            var temp_data = newIndustry;
            temp_data['name'] = target.value;
            let temp = Object.assign({}, temp_data)
            setNewIndustry(temp);
        }
    }

    const submitNewIndustry = async () => {
        setErrors([]);
        setIsLoading(true);
        try {
            const result = await addIndustry(newIndustry);
            if (result.status == 200 || result.status == 201) {
                setToastList([{
                    id: Math.floor((Math.random() * 101) + 1),
                    title: 'Industry Name Added',
                    description: 'You can select the name now.',
                }]);
                getIndustryData();
                setIsLoading(false);
            }
        } catch (error) {
            setErrors(genrateErrorMessage(error, '', setToastList));
            setIsLoading(false);
        }
    }

    return (<>
        <div
            className={`${styles.modalWrapper} modal`}
            tabIndex="-1"
            id="add-industry-modal"
            aria-labelledby="addIndustryModal"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className={`${styles.modalHeader} modal-header`}>
                        <h5 className="modal-title">Add Industry</h5>
                        <button type="button" ref={closeModalBtn} className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
                    </div>
                    {isLoading ?
                        <Loading />
                        :
                        <>
                            <div className="container mt-2 mb-2">
                                <div className="row">
                                    <div className="col-12">
                                        <ErrorList errors={errors} />
                                    </div>
                                    <div className="d-flex align-items-center col-12 col-md-4">
                                        <span className={`${styles.companyndustryModalInputLabel}`}>
                                            Industry&apos;s Name
                                        </span>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <input name='name' type="text" className={`${styles.companyndustryModalInput} form-control`} id="companyInvoiceIndustryName" value={newIndustry.name} placeholder='Enter a Name' onChange={handleInput} />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <div className="row">
                                    <div className="col-6">
                                        <button name="btn-submit" className={`${styles.saveButton} btn blue`} type='submit' onClick={submitNewIndustry} data-bs-dismiss="modal" aria-label="Close">
                                            <span>
                                                <i><FaSave /></i>
                                                Save
                                            </span>
                                        </button>
                                    </div>
                                    <div className="col-6">
                                        <button className={`${styles.cancelButton} btn blueOutline`} type="button" data-bs-dismiss="modal" aria-label="Close">
                                            <span>
                                                <i><FaCircleXmark /></i>
                                                Cancel
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>

                    }

                </div>
            </div>
        </div>
    </>);
}