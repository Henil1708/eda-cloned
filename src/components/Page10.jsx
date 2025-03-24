// import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationButtons from "../common/PaginationButtons"
import { selectFormData, updateFormData } from "../slice/formSlice";

const Page10 = () => {

    // const [selectedTime, setSelectedTime] = useState(null);
    
    // const handleOptionSelect = (option) => {
    //     setSelectedTime(option);
    // };
    const formData = useSelector(selectFormData);
    const dispatch = useDispatch();

    const handleSelectInstallationTime = (option) => {
        dispatch(updateFormData({installationTime: option}));
    }

    const options = [
        { id: 'majesticons_calendar1', name: 'In 1-3 Monaten', image: 'assets/majesticons_calendar1.svg' },
        { id: 'majesticons_calendar2', name: 'In 4-6 Monaten', image: 'assets/majesticons_calendar2.svg' },
        { id: 'majesticons_calendar3', name: 'später als 6 Monate', image: 'assets/majesticons_calendar3.svg' },
        { id: 'majesticons_calendar4', name: 'Ich weiß es noch nicht', image: 'assets/majesticons_calendar4.svg' }
    ];

    return (
        <div className="container page">
            <div className="row mb-3">
                <div className="col-12 px-3">
                    {/* When should the new solar system be installed? */}
                    <p className="text-white text-center fw-bold fs-2">Wann soll die neue Solaranlage eingebaut werden?</p>
                </div>
            </div>

            <div className="row row-cols-2 row-cols-lg-4 px-3">
                {options.map((option) => {
                    return (
                        <div 
                            className="col px-0" 
                            key={option.id}
                            onClick={() => handleSelectInstallationTime(option.name)}
                            style={{ 
                                cursor: 'pointer',
                                border: formData.installationTime === option.name ? '2px solid #28a745' : 'none',
                                borderRadius: formData.installationTime === option.name ? '8px' : '0'
                            }}
                        >
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <img className="page-10-img img-fluid" src={option.image} alt={option.id}/>
                                <p className="text-white fw-bold">{option.name}</p>
                            </div>
                        </div>
                    )
                })}
            </div>

            <PaginationButtons currentPage={10} nextEnabled={formData.installationTime !== null} />
        </div>
    )
}

export default Page10
