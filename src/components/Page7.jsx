// import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import PaginationButtons from "../common/PaginationButtons";
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page7 = () => {
  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleOptionSelect = (option) => {
  //     setSelectedOption(option);
  // }
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();

  const handleOptionSelect = (option) => {
    dispatch(updateFormData({ isInterestInWallbox: option }));
  };

  return (
    <div className="container page">
      <div className="row mb-3">
        <div className="col-12 page-7-text">
          {/* Are you interested in a wallbox? */}
          <p className="text-white fw-bold fs-2">
            Haben Sie Interesse an einer Wallbox?
          </p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-12 page-7-text">
          <h6 className="text-white fw-bold">
            {/* In order to calculate the appropriate size of your solar system, it is important that we take all potential consumers, such as an electric car, into account in the calculation. */}
            Um die geeignete Größe Ihrer Solaranlage kalkulieren zu können, ist
            es wichtig, dass wir alle potentiellen Verbraucher, wie z. B. ein
            E-Auto, bei der Berechnung berücksichtigen.
          </h6>
        </div>
      </div>

      <div className="container px-0 pt-4 pt-md-0 pt-lg-0 pt-xl-0 d-flex justify-content-center justify-content-md-start justify-content-lg-start justify-content-xl-start">
        <div className="row">
          <div
            className="col-6 col-md-4 col-lg-2 d-flex flex-column justify-content-center px-0"
            onClick={() => handleOptionSelect("Ja")}
            style={{}}
          >
            <div className="position-relative">
              <img
                style={{
                  maxWidth: "150px",
                  cursor: "pointer",
                  border:
                    formData.isInterestInWallbox === "Ja"
                      ? "2px solid #28a745"
                      : "2px solid transparent",
                  borderRadius:
                    formData.isInterestInWallbox === "Ja" ? "8px" : "0",
                }}
                src="assets/frame1.svg"
                alt="frame1"
              />
            </div>
          </div>

          <div
            className="col-6 col-md-4 col-lg-2 d-flex flex-column justify-content-center px-0"
            onClick={() => handleOptionSelect("Nein")}
            style={{}}
          >
            <div className="position-relative">
              <img
                style={{
                  maxWidth: "150px",
                  cursor: "pointer",
                  border:
                    formData.isInterestInWallbox === "Nein"
                      ? "2px solid #28a745"
                      : "2px solid transparent",
                  borderRadius:
                    formData.isInterestInWallbox === "Nein" ? "8px" : "0",
                }}
                src="assets/frame2.svg"
                alt="frame2"
              />
            </div>
          </div>
        </div>
      </div>

      <PaginationButtons
        currentPage={7}
        nextEnabled={formData.isInterestInWallbox !== ""}
      />
    </div>
  );
};

export default Page7;
