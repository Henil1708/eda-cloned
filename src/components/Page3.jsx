// import { useState } from 'react'
import PaginationButtons from "../common/PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page3 = () => {
  // const [roofType, setRoofType] = useState("");
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();

  const handleRoofTypeChange = (e) => {
    dispatch(updateFormData({ roofType: e.target.value }));
  };

  return (
    <div className="container px-2 page">
      <p className="text-white text-center fs-3 fw-bold">
        Welche Art von Dach hat Ihr Haus?
      </p>
      <div className="row g-3 g-sm-3 g-md-4 g-lg-5 g-xl-5 mt-5">
        <div className="col-6 col-md-6 col-lg-3 d-flex flex-column justify-content-center">
          <img
            className="page-3-img"
            src="assets/flatroof.svg"
            alt="flatroof"
          />
          <div className="d-flex flex-row justify-content-center align-items-center my-5">
            <input
              type="radio"
              id="flatroof"
              value="Flachdatch"
              checked={formData.roofType === "Flachdatch"}
              onChange={handleRoofTypeChange}
              name="roofType"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofType === "Flachdatch" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="flatroof" className="ellipse-form-text">
              Flachdatch
            </label>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 d-flex flex-column justify-content-center">
          <img
            className="page-3-img"
            src="assets/pentroof.svg"
            alt="pentroof"
          />
          <div className="d-flex flex-row justify-content-center align-items-center my-5">
            <input
              type="radio"
              id="pentroof"
              value="Pultdatch"
              checked={formData.roofType === "Pultdatch"}
              onChange={handleRoofTypeChange}
              name="roofType"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofType === "Pultdatch" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="pentroof" className="ellipse-form-text">
              Pultdatch
            </label>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 d-flex flex-column justify-content-center">
          <img
            className="page-3-img"
            src="assets/saddleroof.svg"
            alt="saddleroof"
          />
          <div className="d-flex flex-row justify-content-center align-items-center my-5">
            <input
              type="radio"
              id="saddleroof"
              value="Sattledach"
              checked={formData.roofType === "Sattledach"}
              onChange={handleRoofTypeChange}
              name="roofType"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofType === "Sattledach" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="saddleroof" className="ellipse-form-text">
              Sattledach
            </label>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3 d-flex flex-column justify-content-center">
          <img className="page-3-img" src="assets/hiproof.svg" alt="hiproof" />
          <div className="d-flex flex-row justify-content-center align-items-center my-5">
            <input
              type="radio"
              id="hiproof"
              value="Walmdach"
              checked={formData.roofType === "Walmdach"}
              onChange={handleRoofTypeChange}
              name="roofType"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.roofType === "Walmdach" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            <label htmlFor="hiproof" className="ellipse-form-text">
              Walmdach
            </label>
          </div>
        </div>
      </div>
      <PaginationButtons
        currentPage={3}
        nextEnabled={formData.roofType !== ""}
      />
    </div>
  );
};

export default Page3;
