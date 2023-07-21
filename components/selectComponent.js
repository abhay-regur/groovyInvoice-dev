const SelectOptionComponent = ({ data, setSeletedId, seletedId, name, isDisabled }) => {
    if (data != undefined) {
        return (
            <select className="form-select" name={name} value={seletedId} onChange={setSeletedId} disabled={isDisabled}>
                <option key="-1" value="">Select value</option>
                {
                    data.map(function (data, id) {
                        return (<option key={id} value={data.Id}>{data.name}</option>);
                    })}
            </select>
        )
    } else {
        return (
            <select className="form-select" name={name} onChange={setSeletedId} disabled={isDisabled}>
                <option defaultValue>Select value</option>
            </select>
        )
    }
}

export default SelectOptionComponent;