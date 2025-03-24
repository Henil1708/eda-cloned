// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationButtons from "../common/PaginationButtons";
import { selectFormData, updateFormData } from "../slice/formSlice";
import { useEffect } from "react";
const Ladestation = process.env.REACT_APP_LADESTATION;
const Wärmepumpe = process.env.REACT_APP_WARMEPUMPE;

const Page6 = () => {
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();

  const handleHeatPumpValue = (e) => {
    dispatch(updateFormData({ heatPump: e.target.value }));

    if (e.target.value !== "Nicht Geplant") {
      if (formData.heatPump === "Ja" || formData.heatPump === "Geplant") {
        dispatch(
          updateFormData({
            totalConsumption: parseInt(formData.totalConsumption).toString(),
          })
        );
      } else {
        dispatch(
          updateFormData({
            totalConsumption: (
              parseInt(formData.totalConsumption) + parseInt(Wärmepumpe)
            ).toString(),
          })
        );
      }
    } else {
      if (formData.chargingStation !== "Nicht Geplant") {
        dispatch(
          updateFormData({
            totalConsumption: (
              parseInt(formData.householdConsumption) + parseInt(Ladestation)
            ).toString(),
          })
        );
      } else {
        dispatch(
          updateFormData({ totalConsumption: formData.householdConsumption })
        );
      }
    }
  };

  const handleCharginStationValue = (e) => {
    dispatch(updateFormData({ chargingStation: e.target.value }));

    if (e.target.value !== "Nicht Geplant") {
      if (
        formData.chargingStation === "Ja" ||
        formData.chargingStation === "Geplant"
      ) {
        dispatch(
          updateFormData({
            totalConsumption: parseInt(formData.totalConsumption).toString(),
          })
        );
      } else {
        dispatch(
          updateFormData({
            totalConsumption: (
              parseInt(formData.totalConsumption) + parseInt(Ladestation)
            ).toString(),
          })
        );
      }
    } else {
      if (formData.heatPump !== "Nicht Geplant") {
        dispatch(
          updateFormData({
            totalConsumption: (
              parseInt(formData.householdConsumption) + parseInt(Wärmepumpe)
            ).toString(),
          })
        );
      } else {
        dispatch(
          updateFormData({ totalConsumption: formData.householdConsumption })
        );
      }
    }
  };

  useEffect(() => {
    let newTotal;
    if (
      formData.chargingStation !== "Nicht Geplant" &&
      formData.heatPump !== "Nicht Geplant"
    ) {
      newTotal =
        parseInt(formData.householdConsumption) +
        parseInt(Ladestation) +
        parseInt(Wärmepumpe);
    } else if (
      formData.chargingStation === "Nicht Geplant" &&
      formData.heatPump !== "Nicht Geplant"
    ) {
      newTotal = parseInt(formData.householdConsumption) + parseInt(Wärmepumpe);
    } else if (
      formData.chargingStation !== "Nicht Geplant" &&
      formData.heatPump === "Nicht Geplant"
    ) {
      newTotal =
        parseInt(formData.householdConsumption) + parseInt(Ladestation);
    } else {
      newTotal = parseInt(formData.householdConsumption);
    }
    dispatch(updateFormData({ totalConsumption: newTotal.toString() }));
  }, [
    dispatch,
    formData.householdConsumption,
    formData.chargingStation,
    formData.heatPump,
    Ladestation,
    Wärmepumpe,
  ]);

  return (
    <div className="container px-4 px-md-5 page">
      <div className="row mb-5">
        <div className="col-12 text-center">
          {/* What additional electrical consumers do you have? */}
          <p className="text-white fw-bold fs-4">
            Welche zusätzlichen elektrischen Verbraucher haben Sie?
          </p>
        </div>
      </div>

      <div className="row page-6">
        <div className="col-6 col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center">
          {/* Charging station/wallbox for electric vehicles */}
          <p className="text-white fw-bold mb-3 page-6-text">
            Ladestation/Wallbox für Elektrofahrzeug
          </p>

          <div className="mb-4 text-center">
            <img
              src="assets/electrical_consumer1.svg"
              alt="electrical_consumer1"
              className="page-6-img1"
              style={{ maxWidth: "250px" }}
            />
          </div>

          <div className="dropdown w-75">
            <select
              className="form-select"
              style={{ fontSize: "14px" }}
              // defaultValue="Nicht Geplant"
              value={formData.chargingStation}
              onChange={handleCharginStationValue}
            >
              {/* Not planned */}
              <option value="Nicht Geplant">Nicht Geplant</option>
              {/* Yes */}
              <option value="Ja">Ja</option>
              {/* Planned */}
              <option value="Geplant">Geplant</option>
            </select>
          </div>
        </div>

        <div className="col-6 col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-center">
          {/* Heat pump or heating element */}
          <p className="text-white fw-bold mb-3 page-6-text">
            Wärmepumpe oder Heizstab
          </p>

          <div className="mb-4 text-center">
            <img
              src="assets/electrical_consumer2.svg"
              alt="electrical_consumer2"
              className="page-6-img1"
              style={{ maxWidth: "250px" }}
            />
          </div>

          <div className="dropdown w-75">
            <select
              className="form-select"
              style={{ fontSize: "14px" }}
              // defaultValue="Nicht Geplant"
              value={formData.heatPump}
              onChange={handleHeatPumpValue}
            >
              {/* Not planned */}
              <option value="Nicht Geplant">Nicht Geplant</option>
              {/* Yes */}
              <option value="Ja">Ja</option>
              {/* Planned */}
              <option value="Geplant">Geplant</option>
            </select>
          </div>
        </div>

        <div className="col-12 col-md-4 d-flex flex-column justify-content-center">
          <div
            className="w-100 mx-auto mx-md-0 mt-5"
            style={{ maxWidth: "300px" }}
          >
            <div className="d-flex justify-content-between mb-2">
              {/* consumption */}
              <p className="text-white mb-0">Verbrauch</p>
              <p className="text-white mb-0">
                {formData.householdConsumption} kWh
              </p>
            </div>

            <div className="d-flex justify-content-between mb-2">
              {/* Charging station */}
              <p
                className={`${
                  formData.chargingStation === "Nicht Geplant"
                    ? "text-danger"
                    : "text-white"
                } mb-0`}
              >
                + Ladestation
              </p>
              {/* <p className="text-white mb-0">4675 kWh</p> */}
              <p
                className={`${
                  formData.chargingStation === "Nicht Geplant"
                    ? "text-danger"
                    : "text-white"
                } mb-0`}
              >
                {Ladestation} kWh
              </p>
            </div>

            <div className="d-flex justify-content-between mb-2">
              {/* Heat pump */}
              <p
                className={`${
                  formData.heatPump === "Nicht Geplant"
                    ? "text-danger"
                    : "text-white"
                } mb-0`}
              >
                + Wärmepumpe
              </p>
              <p
                className={`${
                  formData.heatPump === "Nicht Geplant"
                    ? "text-danger"
                    : "text-white"
                } mb-0`}
              >
                {Wärmepumpe} kWh
              </p>
            </div>
            <hr className="text-white" />
            <div className="d-flex justify-content-between">
              {/* In total */}
              <p className="text-white mb-0">Gesamt</p>
              <p className="text-white mb-0">{formData.totalConsumption} kWh</p>
            </div>
          </div>
        </div>
      </div>

      <PaginationButtons currentPage={6} />
    </div>
  );
};

export default Page6;
