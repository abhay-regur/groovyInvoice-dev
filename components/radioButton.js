const RadioButton = ({ group, label, value, onChange }) => {
    return (
        <label className=" d-flex align-content-center">
            <input data-group={group} name={label} type="radio" checked={value} onChange={onChange} />
            <span>{label}</span>
        </label>
    );
};

export default RadioButton;