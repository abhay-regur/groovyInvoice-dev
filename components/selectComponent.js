const SelectOptionComponent = ({ data, setSeletedId, seletedId }) => {
    if (data != undefined) {
        return (
            <select className="form-select" value={seletedId} onChange={(e) => { setSeletedId(e.target.value) }}>
                <option key="-1" value="">Select value</option>
                {
                    data.map(function (data, id) {
                        return (<option key={id} value={data.Id}>{data.name}</option>);
                    })}
            </select>
        )
    } else {
        return (
            <select className="form-select" onChange={(e) => { setSeletedId(e.target.value) }}>
                <option defaultValue>Select value</option>
            </select>
        )
    }
}

export default SelectOptionComponent;