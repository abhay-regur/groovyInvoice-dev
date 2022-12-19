import { useState } from "react";
const Checkbox = ({ label }) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="checkbox-wrapper">
            <label>{label}
                <input type="checkbox" checked={isChecked} onChange={() => setIsChecked((prev) => !prev)} />
                <span></span>
            </label>
        </div>
    );
};
export default Checkbox;