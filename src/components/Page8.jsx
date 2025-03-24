// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import PaginationButtons from "../common/PaginationButtons";
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page8 = () => {
  // const [selectedSolarPanelOption, setSelectedPanelOption] = useState("");

  // const handleSolarPanelOption = (e) => {
  //     setSelectedPanelOption(e.target.value);
  // }
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();

  const handleSolarPanelOption = (e) => {
    dispatch(updateFormData({ solarPanelOption: e.target.value }));
  };

  return (
    <div className="container page">
      <div className="row mb-3">
        <div className="col-12 px-3">
          {/* Continue with or without solar panels */}
          <p className="text-white text-center fw-bold fs-2">
            Mit oder ohne Solarmodule fortfahren
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-12 px-0 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
          <div className="dropdown w-75">
            <select
              className="form-select"
              style={{ fontSize: "14px" }}
              // defaultValue=""
              value={formData.solarPanelOption}
              onChange={handleSolarPanelOption}
            >
              {/* Please select */}
              <option value="">Bitte auswählen</option>
              {/* With solar modules */}
              <option value="Mit Solarmodulen">Mit Solarmodulen</option>
              {/* Without solar power storage */}
              <option value="Ohne Solarmodulen">Ohne Solarmodulen</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container d-flex flex-row justify-content-center mt-4 w-75">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="page-8-img"
            src="assets/solarpanel1.svg"
            alt="solarpanel1"
          />
          {/* Black frame / black background */}
          <p className="page-8-text">Schwarzer Rahmen / schwarzer Untergrund</p>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="page-8-img"
            src="assets/solarpanel2.svg"
            alt="solarpanel2"
          />
          {/* Black frame / white background */}
          <p className="page-8-text">Schwarzer Rahmen / weißer Untergrund</p>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            className="page-8-img"
            src="assets/solarpanel3.svg"
            alt="solarpanel3"
          />
          {/* Silver frame / white background */}
          <p className="page-8-text">Silberner Rahmen / weißer Untergrund</p>
        </div>
      </div>

      <PaginationButtons
        currentPage={8}
        nextEnabled={formData.solarPanelOption !== ""}
      />
    </div>
  );
};

export default Page8;
