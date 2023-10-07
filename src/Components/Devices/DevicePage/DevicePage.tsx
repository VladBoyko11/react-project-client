import React, { useState } from "react";
import { Field, FormSubmitHandler, InjectedFormProps, reduxForm } from "redux-form";
import RatingStars from "../../common/RatingStars/RatingStars";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux/store";
import { setNotification } from "../../../redux/notificationSlice";
import { addYourDeviceRatingThunk, getBrandThunk, getDeviceThunk } from "../../../redux/deviceSlice";

const DevicePage: React.FC<DevicePagePropsType> = (props) => {
  const [rateDeviceBoolean, setRateDeviceBoolean] = useState(false);

  const submitForm: FormSubmitHandler = (formData: { rating?: number }) => {
    if (props.userId) {
      if (formData.rating && props.device.id) {
        props.addYourDeviceRatingThunk({ rating: formData.rating, userId: props.userId, deviceId: props.device.id });
        setRateDeviceBoolean(false);
      }
    }
  };
  return (
    <div className={"d-flex justify-content-around w-75"} key={props.device.id}>
      <div>
        <div>
          NAME: {props.brand.name} {props.device.name}
        </div>
        <div>
          <img src={`http://localhost:5000/${props.device.img}`} alt="device" />
          <div>PRICE: {props.device.price}</div>
        </div>
      </div>
      <div>
        <span>RATING: </span>
        {props.device.rating ? <RatingStars rating={props.device.rating} /> : null}
        {rateDeviceBoolean ? (
          <AddRateDeviceReduxForm onSubmit={submitForm} />
        ) : (
          <button
            className={"mt-1"}
            onClick={() => {
              if (props.userId) {
                setRateDeviceBoolean(true);
              } else {
                props.redirectToSomePage("/auth");
                props.setNotification(
                  "Вы не вошли в свой аккаунт, ввойдите перед тем как поставить оценку товару",
                  true
                );
                setTimeout(() => {
                  props.setNotification("", false);
                }, 2000);
              }
            }}
          >
            Add your rating to the device
          </button>
        )}
      </div>
      <div>
        <span>DESCRIPTION</span>
        return (
        <div>
          <span>{props.device.title}: </span>
          <span>{props.device.description}</span>
        </div>
        );
      </div>
    </div>
  );
};

const AddRateDeviceForm: React.FC<InjectedFormProps> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <>
        <label>Add your rating</label>
        <Field
          className={"form-select"}
          name="rating"
          form="addRateDeviceForm"
          component="select"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </Field>
      </>
      <button className={"btn-warning mt-2"} type="submit">
        Add your rating
      </button>
    </form>
  );
};

const AddRateDeviceReduxForm = reduxForm({
  form: "addRateDeviceForm",
})(AddRateDeviceForm);

type OwnPropsType = {
  redirectToSomePage(redirectPath: string): void
}

const mapStateToProps = (state: RootState) => ({
  device: state.devicesPage.device,
  brand: state.devicesPage.brand,
  userId: state.auth.id
})

const connector = connect(mapStateToProps, { getBrandThunk, addYourDeviceRatingThunk, setNotification, getDeviceThunk })

type PropsFromRedux = ConnectedProps<typeof connector>
type DevicePagePropsType = PropsFromRedux & OwnPropsType

export default connector(DevicePage)
