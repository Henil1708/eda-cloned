import { useSelector } from "react-redux";
import PaginationButtons from "../common/PaginationButtons";
import { selectFormData } from "../slice/formSlice";
import { Container, Row, Col, Image } from "react-bootstrap";
import DownloadIcon from "@mui/icons-material/Download";

import {
  Box,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { jsPDF } from "jspdf";
import { selectMapData } from "../slice/mapSlice";

const Page11 = () => {
  const formData = useSelector(selectFormData);
  const mapData = useSelector(selectMapData);

  const energyConsumption = 900;
  const solarPanelWidth = 3.5;
  const solarPanelHeight = 5;
  const solarPanelArea = solarPanelWidth * solarPanelHeight;
  const solarPanelEnergyOutput = 48;

  const downloadPDF = (panelIndex) => {
    const input = mapData;
    if (formData.roofPanels.length > panelIndex) {
      const panel = formData.roofPanels[panelIndex];

      const sketchCanvas = document.createElement("canvas");
      const sketchCtx = sketchCanvas.getContext("2d");

      sketchCanvas.width = input.clientWidth;
      sketchCanvas.height = input.clientHeight;

      let panelCenter = { x: 0, y: 0 };
      const mapBounds = mapData.bounds;
      const sw = mapBounds.southWest;
      const ne = mapBounds.northEast;
      const mapWidth = ne.lng - sw.lng;
      const mapHeight = ne.lat - sw.lat;

      panel.points.forEach((point) => {
        const xRatio = (point.lng - sw.lng) / mapWidth;
        const yRatio = (ne.lat - point.lat) / mapHeight;
        panelCenter.x += xRatio * sketchCanvas.width;
        panelCenter.y += yRatio * sketchCanvas.height;
      });
      panelCenter.x /= panel.points.length;
      panelCenter.y /= panel.points.length;

      sketchCtx.translate(
        sketchCanvas.width / 2 - panelCenter.x,
        sketchCanvas.height / 2 - panelCenter.y
      );
      sketchCtx.clearRect(
        -sketchCanvas.width / 2,
        -sketchCanvas.height / 2,
        sketchCanvas.width,
        sketchCanvas.height
      );

      sketchCtx.beginPath();
      panel.points.forEach((point, index) => {
        const xRatio = (point.lng - sw.lng) / mapWidth;
        const yRatio = (ne.lat - point.lat) / mapHeight;

        const canvasX = xRatio * sketchCanvas.width;
        const canvasY = yRatio * sketchCanvas.height;

        if (index === 0) {
          sketchCtx.moveTo(canvasX, canvasY);
        } else {
          sketchCtx.lineTo(canvasX, canvasY);
        }
      });
      sketchCtx.closePath();
      sketchCtx.fillStyle = "rgba(0, 0, 255, 0.4)";
      sketchCtx.strokeStyle = "rgba(0, 0, 255, 1)";
      sketchCtx.lineWidth = 2;
      sketchCtx.fill();
      sketchCtx.stroke();
      const sketchImg = sketchCanvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "pt", [
        sketchCanvas.width,
        sketchCanvas.height,
      ]);
      pdf.addImage(
        sketchImg,
        "PNG",
        0,
        0,
        sketchCanvas.width,
        sketchCanvas.height
      );
      pdf.text(20, 20, `Roof Area: ${(panel.area * 0.092903).toFixed(2)} m²`);
      const sideLengths = panel.calculateSideLengths();
      sideLengths.forEach((length, index) => {
        let sideName = `Side ${String.fromCharCode(
          65 + index
        )}${String.fromCharCode(65 + ((index + 1) % sideLengths.length))}`;
        pdf.text(20, 40 + index * 20, `${sideName}: ${Math.round(length)} m`);
      });
      sideLengths.forEach((_, index) => {
        const point = panel.points[index];
        const xRatio = (point.lng - sw.lng) / mapWidth;
        const yRatio = (ne.lat - point.lat) / mapHeight;

        let canvasX =
          xRatio * sketchCanvas.width - panelCenter.x + sketchCanvas.width / 2;
        let canvasY =
          yRatio * sketchCanvas.height -
          panelCenter.y +
          sketchCanvas.height / 2;

        const pdfX = Math.max(
          0,
          Math.min(canvasX, pdf.internal.pageSize.getWidth())
        );
        const pdfY = Math.max(
          0,
          Math.min(canvasY, pdf.internal.pageSize.getHeight())
        );

        const text = String.fromCharCode(65 + index);

        if (
          pdfX >= 0 &&
          pdfY >= 0 &&
          pdfX <= pdf.internal.pageSize.getWidth() &&
          pdfY <= pdf.internal.pageSize.getHeight()
        ) {
          pdf.setFontSize(20);
          pdf.setTextColor(255, 255, 255);
          pdf.setDrawColor(0);
          pdf.setFillColor(0, 0, 0);
          pdf.rect(pdfX - 10, pdfY - 10, 20, 20, "F");
          pdf.text(text, pdfX, pdfY, { align: "center", baseline: "middle" });
        }
      });
      pdf.save(`solar_panel_layout_panel_${panelIndex + 1}.pdf`);
    } else {
      console.error(
        "Element with ID 'map-container' not found or invalid panel index"
      );
    }
  };

  const getBase64Image = (url, callback) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // This is important for cross-origin images
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      callback(dataURL);
    };
    img.onerror = function (err) {
      console.error("Error loading image", err);
    };
    img.src = url;
  };

  const downloadTotalPDF = () => {
    // Create a new PDF instance with portrait orientation and A4 size.
    const pdf = new jsPDF("p", "pt", "a4");
    const margin = 20;
    let yLeft = margin; // Starting y for the left column
    let yRight = margin; // Starting y for the right column
    const leftX = margin;
    const rightX = 300; // Adjust as needed for your layout

    // LEFT COLUMN DETAILS
    pdf.setFontSize(12);
    pdf.text(`Standort: 53343`, leftX, yLeft);
    yLeft += 20;

    pdf.text(`Haustyp: ${formData.selectedHouseType}`, leftX, yLeft);
    yLeft += 20;

    pdf.text(
      `Energieverbrauch: ${formData.totalConsumption} kWh/Jahr`,
      leftX,
      yLeft
    );
    yLeft += 20;

    pdf.text(`Nutzungsprofil: ${formData.timeOfUse}`, leftX, yLeft);
    yLeft += 20;

    // Determine additional consumers based on chargingStation and heatPump values.
    const additionalConsumers =
      formData.chargingStation !== "Nicht Geplant" &&
      formData.heatPump !== "Nicht Geplant"
        ? "Ladestation, Wärmepumpe"
        : formData.chargingStation === "Nicht Geplant" &&
          formData.heatPump !== "Nicht Geplant"
        ? "Wärmepumpe"
        : formData.chargingStation !== "Nicht Geplant" &&
          formData.heatPump === "Nicht Geplant"
        ? "Ladestation"
        : "Kein Verbraucher";
    pdf.text(`Zusätzliche Verbraucher: ${additionalConsumers}`, leftX, yLeft);
    yLeft += 20;

    pdf.text(`Dachfläche: 180 m2`, leftX, yLeft);
    yLeft += 20;

    // RIGHT COLUMN DETAILS
    pdf.text(
      `Gesamte markierte Fläche: ${(formData.roofArea * 0.092903).toFixed(
        2
      )} m²`,
      rightX,
      yRight
    );
    yRight += 20;

    pdf.text(`Dachart: ${formData.roofType}`, rightX, yRight);
    yRight += 20;

    pdf.text(`Neigungswinkel: ${formData.roofPitchAngle}`, rightX, yRight);
    yRight += 20;

    pdf.text(`Dachmaterial: ${formData.roofMaterial}`, rightX, yRight);
    yRight += 20;

    pdf.text(`Ausrichtung: Nord`, rightX, yRight);
    yRight += 20;

    pdf.text(`Solarpanel: ${formData.solarPanelOption}`, rightX, yRight);
    yRight += 20;

    pdf.text(`Installationszeit: ${formData.installationTime}`, rightX, yRight);
    yRight += 20;

    // IMAGE ADDITION
    // Determine the image source based on roofType.
    const roofImageSrc =
      formData.roofType === "Flachdatch"
        ? "assets/flatroof.svg"
        : formData.roofType === "Pultdatch"
        ? "assets/pentroof.svg"
        : formData.roofType === "Sattledach"
        ? "assets/saddleroof.svg"
        : formData.roofType === "Walmdach"
        ? "assets/hiproof.svg"
        : "assets/house.svg";

    // Load the image and add it to the PDF
    getBase64Image(roofImageSrc, (base64Image) => {
      // Define image dimensions
      const imageWidth = 150; // desired width in points
      const imageHeight = 150; // desired height in points

      // Get page width to center the image horizontally
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imageX = (pageWidth - imageWidth) / 2;
      // Use yLeft + 20 as the y position (adjust as needed)
      const imageY = yLeft + 20;

      pdf.addImage(base64Image, "PNG", imageX, imageY, imageWidth, imageHeight);

      // Finally, save the PDF
      pdf.save("details.pdf");
    });
  };

  const tableCellStyle = { color: "#E2CAA2" };

  return (
    <div className="container mt-4">
      <div className="row mb-4 mb-sm-5 mb-md-3 mb-lg-3 mb-xl-3">
        <div className="col-12 px-3">
          {/* How a solar system pays off for you */}
          <p className="text-white text-center fw-bold fs-2">
            So zahlt sich eine Solaranlage für Sie aus
          </p>
        </div>
      </div>

      <div className="row mb-5 mb-sm-5 mb-md-3 mb-lg-3 mb-xl-3">
        <div className="col-12 px-3">
          {/* Through self-consumption and feed-in tariffs, a solar system can reduce your annual energy costs by €813. If you also integrate a battery storage system, the savings can be as much as €1,193. */}
          <p className="text-white text-center fw-bold fs-6">
            Durch Eigenverbrauch und Einspeisevergütung können Sie mit einer
            Solaranlage Ihre Energiekosten jährlich um 813 Euro senken. Wenn Sie
            zusätzlich einen Batteriespeicher integrieren, beträgt der Wert
            sogar 1.193 Euro.
          </p>
        </div>
      </div>

      <div className="page-11-section page-11-section-not-mobile">
        <div className=" d-flex justify-content-between align-items-center mt-5">
          <div className="d-flex flex-column align-items-start">
            <div className="text-start">
              <p className="text-white mb-0">53343</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              <p className="text-white fw-bold">Standort</p>
            </div>
            <div className="text-start">
              <p className="text-white mb-0">{formData.selectedHouseType}</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* House type */}
              <p className="text-white fw-bold">Haustyp</p>
            </div>
            <div className="text-start">
              <p className="text-white mb-0">
                {formData.totalConsumption} kWh/Jahr
              </p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Energy consumption */}
              <p className="text-white fw-bold">Energieverbrauch</p>
            </div>
            <div className="text-start">
              <p className="text-white mb-0">{formData.timeOfUse}</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Usage profile */}
              <p className="text-white fw-bold">Nutzungsprofil</p>
            </div>
            <div className="text-start">
              {/* Charging station OR Heat Pump */}
              <p className="text-white mb-0">
                {formData.chargingStation !== "Nicht Geplant" &&
                formData.heatPump !== "Nicht Geplant"
                  ? "Ladestation, Wärmepumpe"
                  : formData.chargingStation === "Nicht Geplant" &&
                    formData.heatPump !== "Nicht Geplant"
                  ? "Wärmepumpe"
                  : formData.chargingStation !== "Nicht Geplant" &&
                    formData.heatPump === "Nicht Geplant"
                  ? "Ladestation"
                  : "Kein Verbraucher"}
              </p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Additional consumers */}
              <p className="text-white fw-bold">Zusätzliche Verbraucher</p>
            </div>
            <div className="text-start">
              <p className="text-white mb-0">180 m2</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Roof area */}
              <p className="text-white fw-bold">Dachfläche</p>
            </div>
          </div>
          <div className="page-11-div2 d-flex justify-content-center align-items-center">
            {formData.roofType === "Flachdatch"}
            <img
              className="page-11-img"
              src={
                formData.roofType === "Flachdatch"
                  ? "assets/flatroof.svg"
                  : formData.roofType === "Pultdatch"
                  ? "assets/pentroof.svg"
                  : formData.roofType === "Sattledach"
                  ? "assets/saddleroof.svg"
                  : formData.roofType === "Walmdach"
                  ? "assets/hiproof.svg"
                  : "assets/house.svg"
              }
              alt="house"
            />
          </div>
          <div className="d-flex flex-column align-items-end">
            <div className="text-end">
              <p className="text-white mb-0">
                {(formData.roofArea * 0.092903).toFixed(2)} m²
              </p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Roof type */}
              <p className="text-white fw-bold">Gesamte markierte Fläche</p>
            </div>
            <div className="text-end">
              <p className="text-white mb-0">{formData.roofType}</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Roof type */}
              <p className="text-white fw-bold">Dachart</p>
            </div>
            <div className="text-end">
              <p className="text-white mb-0">{formData.roofPitchAngle}</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Angle of inclination */}
              <p className="text-white fw-bold">Neigungswinkal</p>
            </div>
            <div className="text-end">
              <p className="text-white mb-0">{formData.roofMaterial}</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              {/* Roof material */}
              <p className="text-white fw-bold">Dachmaterial</p>
            </div>
            <div className="text-end">
              <p className="text-white mb-0">Nord</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              <p className="text-white fw-bold">Ausrichtung</p>
            </div>
            <div className="text-end">
              <p className="text-white mb-0">{formData.solarPanelOption}</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              <p className="text-white fw-bold">Solarpanel</p>
            </div>
            <div className="text-end">
              <p className="text-white mb-0">{formData.installationTime}</p>
              {/* <hr className="my-1 text-bg-dark" /> */}
              <p className="text-white fw-bold">Installationszeit</p>
            </div>
          </div>
        </div>
      </div>

      <Container className=" page-11-section-mobile">
        <Row className="align-items-center text-white text-md-start text-center">
          {/* Center Image */}
          <Col
            xs={12}
            md={5}
            className="d-flex justify-content-center order-1 order-md-2 mb-5"
          >
            <Image
              className="page-11-img"
              src={
                formData.roofType === "Flachdatch"
                  ? "assets/flatroof.svg"
                  : formData.roofType === "Pultdatch"
                  ? "assets/pentroof.svg"
                  : formData.roofType === "Sattledach"
                  ? "assets/saddleroof.svg"
                  : formData.roofType === "Walmdach"
                  ? "assets/hiproof.svg"
                  : "assets/house.svg"
              }
              alt="house"
              fluid
            />
          </Col>
          {/* Left and Right columns combined into a single row on mobile */}
          <Col xs={12} className="order-1 order-md-0">
            <Row>
              {/* Left Column */}
              <Col xs={6} className="text-start">
                <div>
                  <p className="mb-0">53343</p>
                  <p className="fw-bold">Standort</p>
                </div>
                <div>
                  <p className="mb-0">{formData.selectedHouseType}</p>
                  <p className="fw-bold">Haustyp</p>
                </div>
                <div>
                  <p className="mb-0">{formData.totalConsumption} kWh/Jahr</p>
                  <p className="fw-bold">Energieverbrauch</p>
                </div>
                <div>
                  <p className="mb-0">{formData.timeOfUse}</p>
                  <p className="fw-bold">Nutzungsprofil</p>
                </div>
                <div>
                  <p className="mb-0">
                    {formData.chargingStation !== "Nicht Geplant" &&
                    formData.heatPump !== "Nicht Geplant"
                      ? "Ladestation, Wärmepumpe"
                      : formData.chargingStation === "Nicht Geplant" &&
                        formData.heatPump !== "Nicht Geplant"
                      ? "Wärmepumpe"
                      : formData.chargingStation !== "Nicht Geplant" &&
                        formData.heatPump === "Nicht Geplant"
                      ? "Ladestation"
                      : "Kein Verbraucher"}
                  </p>
                  <p className="fw-bold">Zusätzliche Verbraucher</p>
                </div>
                <div>
                  <p className="mb-0">180 m²</p>
                  <p className="fw-bold">Dachfläche</p>
                </div>
              </Col>

              {/* Right Column */}
              <Col xs={6} className="text-start">
                <div>
                  <p className="mb-0">
                    {(formData.roofArea * 0.092903).toFixed(2)} m²
                  </p>
                  <p className="fw-bold">Gesamte markierte Fläche</p>
                </div>
                <div>
                  <p className="mb-0">{formData.roofType}</p>
                  <p className="fw-bold">Dachart</p>
                </div>
                <div>
                  <p className="mb-0">{formData.roofPitchAngle}</p>
                  <p className="fw-bold">Neigungswinkel</p>
                </div>
                <div>
                  <p className="mb-0">{formData.roofMaterial}</p>
                  <p className="fw-bold">Dachmaterial</p>
                </div>
                <div>
                  <p className="mb-0">Nord</p>
                  <p className="fw-bold">Ausrichtung</p>
                </div>
                <div>
                  <p className="mb-0">{formData.solarPanelOption}</p>
                  <p className="fw-bold">Solarpanel</p>
                </div>
                <div>
                  <p className="mb-0">{formData.installationTime}</p>
                  <p className="fw-bold">Installationszeit</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Button
        variant="contained"
        color="primary"
        startIcon={<DownloadIcon />}
        onClick={() => downloadTotalPDF()}
        style={{
          width: "fit-content",
          margin: "auto",
          marginTop: "15px",
        }}
      >
        PDF herunterladen
      </Button>

      <PaginationButtons currentPage={11} />

      <div
        className="row mt-5"
        style={{
          maxWidth: "700px",
          marginInline: "auto",
          paddingInline: "10px",
          paddingBottom: "20px",
        }}
      >
        {formData.roofPanels.map(
          (panel, index) =>
            !panel.isDeleted && (
              <Accordion
                key={index}
                sx={{ background: "#0D5E6B", color: "#E2CAA2", mb: 1 }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "#E2CAA2" }} />}
                >
                  <Typography fontWeight="bold">Panel {index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer
                    component={Paper}
                    sx={{ background: "transparent" }}
                  >
                    <Table sx={{ minWidth: 250 }}>
                      <TableHead>
                        <TableRow sx={{ background: "#085B6B" }}>
                          <TableCell sx={tableCellStyle}>Eigenschaft</TableCell>
                          <TableCell sx={tableCellStyle}>Wert</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={tableCellStyle}>
                            Markierte Fläche
                          </TableCell>
                          <TableCell sx={tableCellStyle}>
                            {(panel.area * 0.092903).toFixed(2)} m²
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={tableCellStyle}>
                            Solar Panels
                          </TableCell>
                          <TableCell sx={tableCellStyle}>
                            {(panel.area / solarPanelArea).toFixed(0)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell sx={tableCellStyle}>
                            Stromerzeugung pro Jahr
                          </TableCell>
                          <TableCell sx={tableCellStyle}>
                            {(
                              (((panel.area / solarPanelArea) *
                                solarPanelEnergyOutput *
                                12) /
                                energyConsumption) *
                              100
                            ).toFixed(2)}{" "}
                            kWh/Jahr
                          </TableCell>
                        </TableRow>
                        {panel.solarData ? (
                          <>
                            <TableRow>
                              <TableCell sx={tableCellStyle}>
                                Sonnenstunden
                              </TableCell>
                              <TableCell sx={tableCellStyle}>
                                {panel.solarData.maxSunshineHoursPerYear.toFixed(
                                  2
                                )}{" "}
                                Stunden
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={tableCellStyle}>
                                Solarstrahlung
                              </TableCell>
                              <TableCell sx={tableCellStyle}>
                                {(
                                  panel.solarData.maxSunshineHoursPerYear / 365
                                ).toFixed(2)}{" "}
                                kWh/m²/Tag
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={tableCellStyle}>
                                Weniger Emissionen pro Jahr ggü. Strommix
                              </TableCell>
                              <TableCell sx={tableCellStyle}>
                                {panel.solarData.carbonOffsetFactorKgPerMwh.toFixed(
                                  2
                                )}{" "}
                                Kg CO₂/Jahr
                              </TableCell>
                            </TableRow>
                          </>
                        ) : (
                          <>
                            <TableRow>
                              <TableCell sx={tableCellStyle}>
                                Sonnenstunden
                              </TableCell>
                              <TableCell sx={tableCellStyle}>
                                Wird geladen...
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell sx={tableCellStyle}>
                                CO2-Einsparungen
                              </TableCell>
                              <TableCell sx={tableCellStyle}>
                                Wird geladen...
                              </TableCell>
                            </TableRow>
                          </>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadPDF(index)}
                    >
                      PDF herunterladen
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            )
        )}
      </div>
    </div>
  );
};

export default Page11;
