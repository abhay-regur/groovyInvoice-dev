import styles from '@/styles/login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Footer(props) {
    return (
        <div className={`${styles.mainModelWrapper}`}>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn-close" data-bs-dismiss="modal" onClick={props.closeModal}></button>
            </div>
            <h2>Forgot Password</h2>
            <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label">Email address</label>
                <div className={`input-group position-relative ${styles.innerInputIconWrapper}`}>
                    <i className={`${styles.iconTag}`}><FontAwesomeIcon icon={props.faEnvelope} /></i>
                    <input type="email" className="form-control" placeholder='Email' value={props.comment} onChange={(e) => props.setComment(e.target.value)} aria-describedby="emailHelp" />
                    <button className="btn btn-primary" type="button" onClick={props.submitComment}>Submit</button>
                </div>
            </div>
        </div>
    )
}