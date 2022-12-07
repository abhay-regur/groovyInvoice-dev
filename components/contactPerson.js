import styles from "../styles/newCustomer.module.scss";
import ContactPersonTable from "../components/contactPersonTable.js";
import FaCirclePlus from "../assets/icons/faCirclePlus.svg";

export default function ContactPerson() {
    const ItemsData = [
        {
            salutation: "Ms",
            firstName: "Ada",
            lastName: "Walker",
            emailAddress: "adawalker@armyspy.com",
            workPhone: "410-966-7617",
            mobile: "410-966-7617"
        },
        {
            salutation: "Mr",
            firstName: "Derek",
            lastName: "Nance",
            emailAddress: "dereknance@jourrae.com",
            workPhone: "408-545-4861",
            mobile: "408-545-4861"
        },

    ];

    return (<div className={`${styles.companyInvoiceContactPersonListTableWrapper}`}>
        <table className={`${styles.companyInvoiceContactPersonTable} table`}>
            <thead>
                <tr>
                    <th scope="col" className="text-left">Salutation</th>
                    <th scope="col" className={`text-left`}>First Name</th>
                    <th scope="col" className="text-left">Last Name</th>
                    <th scope="col" className="text-left">Email Address</th>
                    <th scope="col" className="text-left">Work Phone</th>
                    <th scope="col" className="text-left">Mobile</th>
                    <th scope="col" className={`${styles.companyInvoiceTableEditButtonsHeader}`}></th>
                </tr>
            </thead>
            <ContactPersonTable ItemsData={ItemsData} />
        </table>
        <div className={`${styles.companyInvoiceAddContectperson} d-flex align-contect-center mb-2`}>
            <FaCirclePlus />
            <span>Add Contact Person</span>
        </div>
    </div>)
}