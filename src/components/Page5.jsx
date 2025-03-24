// import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import PaginationButtons from "../common/PaginationButtons";
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page5 = () => {
  // const [roofMaterial, setRoofMaterial] = useState("");

  // const handleRoofMaterialChange = (e) => {
  //   setRoofMaterial(e.target.value);
  // }

  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();

  const handleRoofMaterialChange = (e) => {
    dispatch(updateFormData({ roofMaterial: e.target.value }));
  };

  return (
    <div className="container page">
      {/* What material is your roof made of? */}
      <p className="text-white text-center fs-3 fw-bold">
        Aus welchem Material besteht dein Dach?
      </p>
      <div className="container">
        <div className="row mt-5">
          <div className="page-5-col col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-start align-items-lg-center">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <input
                type="radio"
                id="brick"
                value="Ziegel"
                checked={formData.roofMaterial === "Ziegel"}
                onChange={handleRoofMaterialChange}
                name="roofMaterial"
                className="ellipse-form"
              />
              <div
                className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: "22px", height: "22px", cursor: "pointer" }}
              >
                {formData.roofMaterial === "Ziegel" && (
                  <div
                    className="bg-white rounded-circle"
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                )}
              </div>
              {/* brick */}
              <label htmlFor="brick" className="ellipse-form-text">
                Ziegel
              </label>
            </div>
          </div>
          <div className="page-5-col col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-start align-items-lg-center">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <input
                type="radio"
                id="bitumen"
                value="Bitumen"
                checked={formData.roofMaterial === "Bitumen"}
                onChange={handleRoofMaterialChange}
                name="roofMaterial"
                className="ellipse-form"
              />
              <div
                className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: "22px", height: "22px", cursor: "pointer" }}
              >
                {formData.roofMaterial === "Bitumen" && (
                  <div
                    className="bg-white rounded-circle"
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                )}
              </div>
              {/* Bitumen */}
              <label htmlFor="bitumen" className="ellipse-form-text">
                Bitumen
              </label>
            </div>
          </div>
          <div className="page-5-col col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-start align-items-lg-center">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <input
                type="radio"
                id="trapezoidal_sheet_metal"
                value="Trapezblech"
                checked={formData.roofMaterial === "Trapezblech"}
                onChange={handleRoofMaterialChange}
                name="roofMaterial"
                className="ellipse-form"
              />
              <div
                className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: "22px", height: "22px", cursor: "pointer" }}
              >
                {formData.roofMaterial === "Trapezblech" && (
                  <div
                    className="bg-white rounded-circle"
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                )}
              </div>
              {/* Trapezoidal sheet metal */}
              <label
                htmlFor="trapezoidal_sheet_metal"
                className="ellipse-form-text"
              >
                Trapezblech
              </label>
            </div>
          </div>
          <div className="page-5-col col-12 col-md-6 col-lg-3 d-flex flex-column justify-content-center align-items-start align-items-lg-center">
            <div className="d-flex flex-row justify-content-center align-items-center">
              <input
                type="radio"
                id="miscellaneous"
                value="Sonstiges"
                checked={formData.roofMaterial === "Sonstiges"}
                onChange={handleRoofMaterialChange}
                name="roofMaterial"
                className="ellipse-form"
              />
              <div
                className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
                style={{ width: "22px", height: "22px", cursor: "pointer" }}
              >
                {formData.roofMaterial === "Sonstiges" && (
                  <div
                    className="bg-white rounded-circle"
                    style={{ width: "12px", height: "12px" }}
                  ></div>
                )}
              </div>
              {/* Miscellaneous */}
              <label htmlFor="miscellaneous" className="ellipse-form-text">
                Sonstiges
              </label>
            </div>
          </div>
        </div>
      </div>
      <PaginationButtons
        currentPage={5}
        nextEnabled={formData.roofMaterial !== ""}
      />
    </div>
  );
};

export default Page5;
