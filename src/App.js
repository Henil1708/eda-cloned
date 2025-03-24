import { useEffect, useRef } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFormData } from "./slice/formSlice";
import { useLoadScript } from "@react-google-maps/api";
import Map from "./components/Map";
import { MY_GOOGLE_API_KEY } from "./components/GoogleAPIKey";
import "./App.css";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import Page5 from "./components/Page5";
import Page6 from "./components/Page6";
import Page7 from "./components/Page7";
import Page8 from "./components/Page8";
import Page9 from "./components/Page9";
import Page10 from "./components/Page10";
import Page11 from "./components/Page11";

function App() {
  let location = useLocation();
  let navigate = useNavigate();
  let formData = useSelector(selectFormData);

  const stepwiseValidation = {
    "/page1": ["roofArea"],
    "/page2": ["selectedHouseType"],
    "/page3": ["selectedHouseType", "householdConsumption", "timeOfUse"],
    "/page4": ["roofType"],
    "/page5": ["roofPitchAngle"],
    "/page6": ["roofMaterial"],
    "/page7": ["heatPump", "chargingStation", "totalConsumption"],
    "/page8": ["isInterestInWallbox"],
    "/page9": ["solarPanelOption"],
    "/page10": ["solarPanelOption2"],
    "/page11": ["installationTime"],
  };

  useEffect(() => {
    const requiredFields = stepwiseValidation[location.pathname];

    if (requiredFields) {
      const isAnyFieldEmpty = requiredFields.some(
        (field) =>
          formData[field] === null ||
          formData[field] === "" ||
          formData[field] === 0
      );

      if (isAnyFieldEmpty) {
        navigate("/");
      }
    }
  }, [formData, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MY_GOOGLE_API_KEY,
    libraries: ["places", "geometry"],
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
        <Route path="/page6" element={<Page6 />} />
        <Route path="/page7" element={<Page7 />} />
        <Route path="/page8" element={<Page8 />} />
        <Route path="/page9" element={<Page9 />} />
        <Route path="/page10" element={<Page10 />} />
        <Route path="/page11" element={<Page11 />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
