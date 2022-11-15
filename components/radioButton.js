const RadioButton = ({ label, value, onChange }) => {
    return (
        <label className=" d-flex align-content-center">
            <input type="radio" checked={value} onChange={onChange} />
            <span>{label}</span>
        </label>
    );
};

export default RadioButton;