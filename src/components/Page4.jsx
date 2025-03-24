// import { useState } from 'react';
import PaginationButtons from "../common/PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page4 = () => {
  // const [roofPitchAngle, setRoofPitchAngle] = useState("");

  // const handleRoofPitchAngleChange = (e) => {
  //   setRoofPitchAngle(e.target.value);
  // }

  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();

  const handleRoofPitchAngleChange = (e) => {
    dispatch(updateFormData({ roofPitchAngle: e.target.value }));
  };

  return (
    <div className="container page">
      {/* What is the pitch angle of your roof? */}
      <p className="text-white text-center fs-3 fw-bold">
        Welchen Neigungswinkel hat Ihr Dach?
      </p>

      <div className="row row-cols-3 row-cols-md-3 row-cols-lg-5 justify-content-center align-items-end g-4 mb-5">
        <div className="col text-center">
          <img
            className="page-4-img img-fluid"
            src="assets/pitchangle0.svg"
            alt="pitchangle0"
          />
          <div className="d-flex justify-content-center align-items-center mt-4">
            {/* <img className='ellipse-form' src='assets/ellipse-form.svg' alt='ellipse-form' /> */}
            <input
              type="radio"
              id="pitchangle0"
              value="0"
              checked={formData.roofPitchAngle === "0"}
              onChange={handleRoofPitchAngleChange}
              name="roofPitchAngle"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofPitchAngle === "0" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="pitchangle0" className="ellipse-form-text">
              0
            </label>
          </div>
        </div>
        <div className="col text-center">
          <img
            className="page-4-img img-fluid"
            src="assets/pitchangle15.svg"
            alt="pitchangle15"
          />
          <div className="d-flex justify-content-center align-items-center mt-4">
            <input
              type="radio"
              id="pitchangle15"
              value="15"
              checked={formData.roofPitchAngle === "15"}
              onChange={handleRoofPitchAngleChange}
              name="roofPitchAngle"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofPitchAngle === "15" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="pitchangle15" className="ellipse-form-text">
              15
            </label>
          </div>
        </div>
        <div className="col text-center">
          <img
            className="page-4-img img-fluid"
            src="assets/pitchangle30.svg"
            alt="pitchangle30"
          />
          <div className="d-flex justify-content-center align-items-center mt-4">
            <input
              type="radio"
              id="pitchangle30"
              value="30"
              checked={formData.roofPitchAngle === "30"}
              onChange={handleRoofPitchAngleChange}
              name="roofPitchAngle"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofPitchAngle === "30" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="pitchangle30" className="ellipse-form-text">
              30
            </label>
          </div>
        </div>
        <div className="col text-center">
          <img
            className="page-4-img img-fluid"
            src="assets/pitchangle45.svg"
            alt="pitchangle45"
          />
          <div className="d-flex justify-content-center align-items-center mt-4">
            <input
              type="radio"
              id="pitchangle45"
              value="45"
              checked={formData.roofPitchAngle === "45"}
              onChange={handleRoofPitchAngleChange}
              name="roofPitchAngle"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofPitchAngle === "45" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="pitchangle45" className="ellipse-form-text">
              45
            </label>
          </div>
        </div>
        <div className="col text-center">
          <img
            className="page-4-img img-fluid"
            src="assets/pitchangle60.svg"
            alt="pitchangle60"
          />
          <div className="d-flex justify-content-center align-items-center mt-4">
            <input
              type="radio"
              id="pitchangle60"
              value="60"
              checked={formData.roofPitchAngle === "60"}
              onChange={handleRoofPitchAngleChange}
              name="roofPitchAngle"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofPitchAngle === "60" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="pitchangle60" className="ellipse-form-text">
              60
            </label>
          </div>
        </div>
      </div>

      <PaginationButtons
        currentPage={4}
        nextEnabled={formData.roofPitchAngle !== ""}
      />
    </div>
  );
};

export default Page4;
