// import { useState } from "react";
import PaginationButtons from "../common/PaginationButtons"
import { useDispatch, useSelector } from "react-redux";
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page9 = () => {

    // const [selectedSolarPanelOption, setSelectedPanelOption] = useState("");
    
    // const handleSolarPanelOption = (e) => {
    //     setSelectedPanelOption(e.target.value);
    // }

    const formData = useSelector(selectFormData);
    const dispatch = useDispatch();

    const handleSolarPanelOption = (e) => {
        dispatch(updateFormData({solarPanelOption2: e.target.value}));
    }

    return (
        <div className="container page">
            <div className="row mb-5 mb-sm-5 mb-md-3 mb-lg-3 mb-xl-3">
                <div className="col-12 px-3">
                    <p className="text-white text-center fw-bold fs-2">Mit oder ohne Stromspeicher fortfahren</p>
                </div>
            </div>

            <div className="row">
                <div className="col-12 px-0 mb-4 mb-md-0 d-flex justify-content-center align-items-center">
                    <div className="dropdown w-75">
                        <select 
                            className="form-select" 
                            style={{fontSize: "14px"}} 
                            // defaultValue=""
                            value={formData.solarPanelOption2}
                            onChange={handleSolarPanelOption}
                        >
                            {/* Please select */}
                            <option value="">Bitte auswählen</option>
                            {/* Without solar power storage */}
                            <option value="Ohne Solarstromspeicher">Ohne Solarstromspeicher</option>
                            {/* Power storage from Growatt */}
                            <option value="Stromspeicher von Growatt">Stromspeicher von Growatt</option>
                        </select>
                    </div>
                </div>
            </div>

            <PaginationButtons currentPage={9} nextEnabled={formData.solarPanelOption2 !== ""} />
        </div>
    )
}

export default Page9