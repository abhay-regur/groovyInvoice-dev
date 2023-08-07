const SelectWithInputComponent = ({ data, setSeletedId, seletedId, name, isDisabled, defaultText }) => {
    if (data != undefined) {
        return (
            <select className="form-select" name={name} value={seletedId} onChange={setSeletedId} disabled={isDisabled}>
                <option key="-1" value="">{defaultText}</option>
                {
                    data.map(function (data, id) {
                        return (<option key={id} value={data.Id}>{data.name}</option>);
                    })
                }
                <option key="" value="custome"><input name={name} className="form-select" value={seletedId} onChange={setSeletedId} /></option>
            </select>
        )
    } else {
        return (
            <select className="form-select" name={name} onChange={setSeletedId} disabled={isDisabled}>
                <option defaultValue>{defaultText}</option>
            </select>
        )
    }
}

export default SelectWithInputComponent;