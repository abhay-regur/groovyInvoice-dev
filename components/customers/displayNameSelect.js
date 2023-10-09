import React, { useEffect, useState } from "react";
import Select from "react-select";

const DisplayNameSelect = (props) => {
  const style = {
    control: () => ({
      fontWeight: 400,
      fontSize: '14px',
      color: '#8790B0',
      background: '#F5FAFE',
      border: '1px solid #E3EBF2',
      borderRadius: '8px',
      display: 'flex',
    }),
    valueContainer: (style) => ({ ...style, padding: '0 8px' }),
    input: (style) => ({ ...style, padding: '0', margin: '0' }),
    singleValue: (styles) => ({ ...styles, color: '#8790B0' })
  }
  const [options, setOptions] = useState([]);

  const generateOption = () => {
    let temp_data = [];
    if (props.salutation && props.firstName && props.lastName) {
      temp_data = [
        {label: `${props.salutation} ${props.firstName} ${props.lastName}`, value: `${props.salutation} ${props.firstName} ${props.lastName}`},
        {label: `${props.firstName} ${props.lastName}`, value: `${props.firstName} ${props.lastName}`},
        {label: `${props.lastName}, ${props.firstName}`, value: `${props.lastName}, ${props.firstName}` }
      ]
    } else if (!props.salutation && props.firstName && props.lastName) {
      temp_data = [
        {label: `${props.firstName} ${props.lastName}`, value: `${props.firstName} ${props.lastName}`},
        {label: `${props.lastName}, ${props.firstName}`, value: `${props.lastName}, ${props.firstName}` }
      ]
    } else if (props.salutation && !props.firstName && props.lastName) {
      temp_data = [
        {label: `${props.salutation} ${props.lastName}`, value: `${props.salutation} ${props.lastName}`},
        {label: `${props.lastName}`, value: ` ${props.lastName}`},
      ]
    } else if (props.salutation && props.firstName && !props.lastName) {
      temp_data = [
        {label: `${props.salutation} ${props.firstName}`, value: `${props.salutation} ${props.firstName}`},
        {label: `${props.firstName}`, value: ` ${props.firstName}`},
      ]
    }
    setOptions(temp_data)
  }

  useEffect(() => {
    generateOption()
  }, [props.salutation, props.firstName, props.lastName])

  const onChange = ({value}) => {
    props.onChange({target: { name: props.name, value: value }})
  }
  return (
    <>
      <Select
        id='companyInvoiceNewCustomerUserName'
        defaultValue={props.value}
        onChange={onChange}
        options={options}
        name={props.name}
        styles={style}
      />
    </>
  );
}

export default DisplayNameSelect;
