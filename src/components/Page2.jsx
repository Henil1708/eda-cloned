import { useMemo /* useState */ } from "react";
import PaginationButtons from "../common/PaginationButtons";
import { useDispatch, useSelector } from "react-redux";
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page2 = () => {
  const formData = useSelector(selectFormData);
  const dispatch = useDispatch();
  console.log("form data---", formData);

  const perPersonConsumption = {
    "Morgens & Abends": ["1750", "2500", "3500", "4250", "5250", "6000"],
    "Ganzer Tag": ["1925", "2750", "3850", "4675", "5775", "6600"],
  };

  const handlePeopleCountChange = (count) => {
    dispatch(
      updateFormData({
        peopleCount: count,
        householdConsumption:
          perPersonConsumption[formData.timeOfUse][count - 1],
      })
    );
    console.log(
      "per person consumption value",
      perPersonConsumption[formData.timeOfUse][count - 1]
    );
  };

  const handleConsumptionChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    dispatch(updateFormData({ householdConsumption: value, peopleCount: 0 }));
  };

  const handleTimeOfUseChange = (e) => {
    dispatch(
      updateFormData({
        timeOfUse: e.target.value,
      })
    );
  };

  const showPeopleIcons = useMemo(() => {
    let icons = [];
    for (let i = 1; i <= 6; i++) {
      icons.push(
        <img
          key={i}
          className="page-2-img"
          alt={`${i} people`}
          src={
            i <= formData.peopleCount
              ? "assets/people_filled.svg"
              : "assets/people.svg"
          }
          onClick={() => handlePeopleCountChange(i)}
          style={{ cursor: "pointer" }}
        />
      );
    }
    return icons;
  }, [formData.peopleCount]);

  return (
    <div className="container px-4 page">
      <p className="text-white text-center fs-3 fw-bold">
        Wie hoch ist der Stromverbrauch in Ihrem Haushalt?
      </p>
      <div className="mt-5">
        <h3 className="text-white fw-bold page-2-title">
          Anzahl der Personen im Haushalt angeben
        </h3>
        <div className="mt-3">{showPeopleIcons}</div>
      </div>
      <div className="mt-5">
        <h3 className="text-white fw-bold page-2-title">
          Oder Stromverbrauch manuell eingeben:
        </h3>

        <div className="power-consumption-form-section">
          <input
            type="number"
            className="power-consumption-form"
            value={formData.householdConsumption}
            onChange={handleConsumptionChange}
            min={0}
          />
          <span className="ms-2 text-white fw-bold">kWh/Jahr</span>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-white fw-bold page-2-title">
          Zu welcher Tageszeit benötigen Sie Strom im Haushalt?
        </h3>
        <div className="ellipse-form-section">
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="radio"
              id="morgens-abends"
              value="Morgens & Abends"
              checked={formData.timeOfUse === "Morgens & Abends"}
              onChange={handleTimeOfUseChange}
              name="timeOfUse"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.timeOfUse === "Morgens & Abends" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            {/* morning & evening */}
            <label htmlFor="morgens-abends" className="ellipse-form-text">
              Morgens & Abends
            </label>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="radio"
              id="ganzer-tag"
              value="Ganzer Tag"
              checked={formData.timeOfUse === "Ganzer Tag"}
              onChange={handleTimeOfUseChange}
              name="timeOfUse"
              className="ellipse-form"
            />
            <div
              className="border border-white rounded-circle d-flex align-items-center justify-content-center me-2"
              style={{ width: "22px", height: "22px", cursor: "pointer" }}
            >
              {formData.timeOfUse === "Ganzer Tag" && (
                <div
                  className="bg-white rounded-circle"
                  style={{ width: "12px", height: "12px" }}
                ></div>
              )}
            </div>
            {/* whole day */}
            <label htmlFor="ganzer-tag" className="ellipse-form-text">
              Ganzer Tag
            </label>
          </div>
        </div>
      </div>
      {console.log("@@ formData", formData)}
      <PaginationButtons
        currentPage={2}
        nextEnabled={
          formData.householdConsumption !== undefined &&
          formData.householdConsumption !== null &&
          formData.householdConsumption !== 0 &&
          formData.householdConsumption !== "0" &&
          formData.householdConsumption !== "" &&
          formData.timeOfUse !== ""
        }
      />
    </div>
  );
};

export default Page2;
