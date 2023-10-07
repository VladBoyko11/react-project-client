import React from "react";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import { renderField } from "../common/FormControl";
import { connect, ConnectedProps } from "react-redux";
import { addDevice, addPhoto } from "../../redux/adminPageSlice";
import redirectToSomePage from "../common/RedirectToSomePage"
import { Device } from "../../redux/types";

const AddNewDevice: React.FC<AddNewDevicePropsType> = (props) => {
  const submitForm: FormSubmitHandler = (formData: {
    deviceName?: string;
    devicePrice?: number;
    deviceBrand?: number;
    deviceType?: number;
  }) => {
      props.addDevice({
        name: formData.deviceName,
        price: formData.devicePrice,
        brandId: formData.deviceBrand,
        typeId: formData.deviceType,
      })
    redirectToSomePage("/admin-page", { replace: true });
  };
  return <AddNewDeviceReduxForm onSubmit={submitForm} {...props} />;
};

const AddNewDeviceForm: React.FC<InjectedFormProps<Device>> = ({handleSubmit}) => {
  const selectPhoto = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement 
    if (target.files) {
      addPhoto(target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Device name</label>
        <Field id="name" placeholder="name" name="deviceName" component={renderField} />
      </div>
      <div>
        <label htmlFor="price">Device price</label>
        <Field id="price" placeholder="price" name="devicePrice" component={renderField} />
      </div>
      <div>
        <label htmlFor="brand">Brand</label>
        <Field id="brand" placeholder="brand" name="deviceBrand" component={renderField} />
      </div>
      <div >
        <label htmlFor="type">Type</label>
        <Field id="type" placeholder="type" name="deviceType" component={renderField} />
      </div>
      <div >
        <label className={"me-3 form-label"} htmlFor={"customFile"}>
          Img
        </label>
        <input
          type="file"
          className="'mt-1 mb-2 form-control"
          id="customFile"
          onChange={selectPhoto}
        />
      </div>
      <button className={"btn-warning"} type="submit">
        Create
      </button>
    </form>
  );
};

const AddNewDeviceReduxForm = reduxForm({
  form: "addNewBrand",
})(AddNewDeviceForm);

const connector = connect(() => ({}), {addDevice, addPhoto})
type ReduxPropsType = ConnectedProps<typeof connector>
type AddNewDevicePropsType = ReduxPropsType

export default connector(AddNewDevice);
