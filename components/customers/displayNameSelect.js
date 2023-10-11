import React, { useEffect, useState } from "react";
import CustomSelectComponent from "../customSelectComponent";

const DisplayNameSelect = (props) => {
  const [options, setOptions] = useState([]);

  const generateOption = () => {
    let temp_data = [];
    if (props.salutation && props.firstName && props.lastName) {
      temp_data = [
        {Id: `${props.salutation} ${props.firstName} ${props.lastName}`, name: `${props.salutation} ${props.firstName} ${props.lastName}`},
        {Id: `${props.firstName} ${props.lastName}`, name: `${props.firstName} ${props.lastName}`},
        {Id: `${props.lastName}, ${props.firstName}`, name: `${props.lastName}, ${props.firstName}` }
      ]
    } else if (!props.salutation && props.firstName && props.lastName) {
      temp_data = [
        {Id: `${props.firstName} ${props.lastName}`, name: `${props.firstName} ${props.lastName}`},
        {Id: `${props.lastName}, ${props.firstName}`, name: `${props.lastName}, ${props.firstName}` }
      ]
    } else if (props.salutation && !props.firstName && props.lastName) {
      temp_data = [
        {Id: `${props.salutation} ${props.lastName}`, name: `${props.salutation} ${props.lastName}`},
        {Id: `${props.lastName}`, name: ` ${props.lastName}`},
      ]
    } else if (props.salutation && props.firstName && !props.lastName) {
      temp_data = [
        {Id: `${props.salutation} ${props.firstName}`, name: `${props.salutation} ${props.firstName}`},
        {Id: `${props.firstName}`, name: ` ${props.firstName}`},
      ]
    }
    setOptions(temp_data)
  }

  useEffect(() => {
    generateOption()
  }, [props.salutation, props.firstName, props.lastName])

  return (
    <>
      <CustomSelectComponent
        id='companyInvoiceNewCustomerUserName'
        inputClass="form-control"
        optionValue={props.value}
        onOptionValueChange={props.onChange}
        data={options}
        name={props.name}
        isDisabled={false}
        defaultText={'Select An Option'}
        isInnerButtonRequired={false}
      />
    </>
  );
}

export default DisplayNameSelect;
