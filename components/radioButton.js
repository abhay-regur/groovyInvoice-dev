const RadioButton = ({ name, group, label, checked, onChange, value = '' }) => {
    return (
        <label className=" d-flex align-content-center">
            <input data-group={group} name={name} type="radio" checked={checked} onChange={onChange} value={value}/>
            <span>{label}</span>
        </label>
    );
};

export default RadioButton;