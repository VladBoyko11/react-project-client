import React from "react";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { renderField } from "../common/FormControl";
import { connect, ConnectedProps } from "react-redux";
import { addDevice, addPhoto } from "../../redux/adminPageSlice";
import redirectToSomePage from "../common/RedirectToSomePage"
import { Device } from "../../redux/types";
import { Button, FormGroup, FormLabel, Input } from "@mui/material";
import * as style from './AdminPage.scss'
import { useNavigate } from "react-router-dom";

const AddNewDevice: React.FC<AddNewDevicePropsType> = (props) => {
  const navigate = useNavigate();
  const submitForm: FormSubmitHandler = (formData: {
    deviceName?: string;
    devicePrice?: number;
    deviceBrand?: number;
    deviceType?: number;
    deviceTitle?: string;
    deviceDescription?: string
  }) => {
    props.addDevice({
      name: formData.deviceName,
      price: formData.devicePrice,
      brandId: formData.deviceBrand,
      typeId: formData.deviceType,
      title: formData.deviceTitle,
      description: formData.deviceDescription
    })
    // redirectToSomePage("/admin-page", { replace: true });
    navigate('/admin-page', { replace: true })
  };
  return <AddNewDeviceReduxForm onSubmit={submitForm} {...props} />;
};

interface IPropsDeviceForm {
  addPhoto?: (file: File) => void 
}

const AddNewDeviceForm: React.FC<InjectedFormProps<Device, IPropsDeviceForm> & IPropsDeviceForm> = ({ handleSubmit, addPhoto }) => {
  const selectPhoto = (e: React.BaseSyntheticEvent) => {
    if (e.target.files && addPhoto) {
      addPhoto(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.formDevice}>
      <FormGroup>
        <FormLabel htmlFor="name">Device name</FormLabel>
        <Field id="name" placeholder="name" name="deviceName" component={renderField}></Field>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="price">Device price</FormLabel>
        <Field id="price" placeholder="price" name="devicePrice" component={renderField}></Field>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="brand">Brand</FormLabel>
        <Field id="brand" placeholder="brand" name="deviceBrand" component={renderField}></Field>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="type">Type</FormLabel>
        <Field id="type" placeholder="type" name="deviceType" component={renderField}></Field>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="title">Title</FormLabel>
        <Field id="title" placeholder="title" name="deviceTitle" component={renderField}></Field>
      </FormGroup>
      <FormGroup>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Field id="description" placeholder="description" name="deviceDescription" component={renderField}></Field>
      </FormGroup>
      <FormGroup >
        <FormLabel className={"me-3 form-label"} htmlFor={"customFile"}>
          Img
        </FormLabel>
        {/* <Field type="file"
          className="'mt-1 mb-2 form-control"
          id="customFile"
          onChange={selectPhoto} component={renderField}></Field> */}
          <Input type="file"
          className="'mt-1 mb-2 form-control"
          id="customFile"
          onChange={selectPhoto} ></Input>
      </FormGroup>
      <Button variant="contained" className={"btn-warning"} type="submit">
        Create
      </Button>
    </form>
  );
};

const AddNewDeviceReduxForm = reduxForm<Device, IPropsDeviceForm>({
  form: "addNewBrand",
})(AddNewDeviceForm);

const connector = connect(() => ({}), { addDevice, addPhoto })
type ReduxPropsType = ConnectedProps<typeof connector>
type AddNewDevicePropsType = ReduxPropsType

export default connector(AddNewDevice);
