// import { useState } from 'react';
import PaginationButtons from "../common/PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import { selectFormData, updateFormData } from "../slice/formSlice";
import { useNavigate } from "react-router-dom";

const Page1 = () => {
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOptionSelect = (option) => {
    dispatch(updateFormData({ selectedHouseType: option }));
    navigate("/page2");
  };

  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleOptionSelect = (option) => {
  //     setSelectedOption(option);
  // };

  const options = [
    {
      id: "single_family",
      name: "Eínfamilienhaus",
      image: "assets/Single_family_house.png",
      width: "264.45px",
      height: "196.18px",
    },
    {
      id: "semi_detached",
      name: "Doppelhaushälfte",
      image: "assets/Semi_detached_house.png",
      width: "230.68px",
      height: "201.62px",
    },
    {
      id: "solar_carport",
      name: "solarcarport",
      image: "assets/solar_carport.png",
      width: "244.30px",
      height: "126.23px",
    },
    {
      id: "terraced_house",
      name: "Reihenhaus",
      image: "assets/Terraced_house.png",
      width: "217.26px",
      height: "210.05px",
    },
    {
      id: "commercial",
      name: "Gewerbe",
      image: "assets/Commercial.png",
      width: "264.00px",
      height: "237.03px",
    },
    {
      id: "dont_know",
      name: "weiß ich nicht ?",
      image: "assets/i_dont_know.png",
      width: "176.00px",
      height: "176.00px",
    },
  ];

  return (
    <div className="container px-5 my-5">
      <div className="row g-5">
        {options.map((option) => (
          <div
            key={option.id}
            className="col-6 col-md-6 col-lg-4 d-flex flex-column justify-content-end align-items-center"
            onClick={() => handleOptionSelect(option.name)}
            style={{
              cursor: "pointer",
              border:
                formData.selectedHouseType === option.name
                  ? "2px solid #28a745"
                  : "none",
              borderRadius:
                formData.selectedHouseType === option.name ? "8px" : "0",
            }}
          >
            <div
              className="position-relative"
              style={{
                maxWidth: option.width,
                maxHeight: option.height,
              }}
            >
              <img src={option.image} alt={option.name} className="w-100" />
            </div>
            <span className="text-white text-center fw-bold mt-3 options-text">
              {option.name}
            </span>
          </div>
        ))}
      </div>
      <PaginationButtons
        currentPage={1}
        nextEnabled={formData.selectedHouseType !== null}
      />
    </div>
  );
};

export default Page1;
