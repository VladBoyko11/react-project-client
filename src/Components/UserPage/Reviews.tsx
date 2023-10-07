import React, { useEffect } from "react";
import BasketDevice from "../BasketPage/BasketDevice";
import { connect, ConnectedProps } from "react-redux";
import { getDevicesWithRatings, getYourRatings } from "../../redux/authSlice";
import { RootState } from "../../redux/store";
import { Device } from "../../redux/types";
import Preloader from "../Preloader/Preloader";

const Reviews: React.FC<ReviewsPropsType> = (props) => {
  useEffect((): (() => void) => {
    if (props.userId) props.getYourRatings({ userId: props.userId });
    return (): void => {
        props.getYourRatings({})
    }
  }, [props.userId]);

  useEffect(() => {
    if (props.yourRatings.length !== 0)
      props.getDevicesWithRatings(props.yourRatings);
  }, [props.yourRatings]);

  return (
    <div className={"d-flex flex-wrap"}>
      {props.devices.length !== 0
        ? props.devices.map((device: Device) => {
            return <BasketDevice device={device} key={device.id} />;
          })
        : <Preloader />}
    </div>
  );
};
const mapStateToProps = (state: RootState) => ({
  userId: state.auth.id,
  devices: state.auth.devices,
  yourRatings: state.auth.yourRatings,
});

const connector = connect(mapStateToProps, {
  getDevicesWithRatings,
  getYourRatings,
});

type ReduxPropsType = ConnectedProps<typeof connector>;
type ReviewsPropsType = ReduxPropsType;

export default connector(Reviews);
