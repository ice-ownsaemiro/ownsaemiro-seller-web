// src/components/seller/SellRequestWrite.tsx
import React, { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import back_logo from "../../../assets/logo_back.svg";
import {
  EventFormContainer,
  EventFormExplain,
  Label,
  LabelFit,
  LabelMiddle,
  TextDisplay,
  TextDisplayFit,
  TextDisplayExplain,
  TextStyle,
} from "./SellRequestWriteStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1400px",
  maxHeight: "880px",
  width: "80vw",
  height: "70vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

interface SellRequestWriteProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (newItem: any) => void;
}

const SellRequestWrite: React.FC<SellRequestWriteProps> = ({
  open,
  handleClose,
  handleSave,
}) => {
  const [eventName, setEventName] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventPlanner, setEventPlanner] = useState("");
  const [eventNumber, setEventNumber] = useState("");
  const [eventAge, setEventAge] = useState("");
  const [eventExplain, setEventExplain] = useState("");

  const handleSubmit = () => {
    const newItem = {
      id: Math.random(), // You might want to replace this with a proper ID generation method
      applicant: "",
      username: "",
      eventName,
      requestDate: new Date().toISOString().split("T")[0],
      eventDate: `${eventStartDate} ~ ${eventEndDate}`,
      status: "승인 대기",
      eventStartDate,
      eventEndDate,
      eventTime,
      eventPlace,
      eventPlanner,
      eventNumber,
      eventAge,
      eventExplain,
    };
    handleSave(newItem);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Button sx={{ mt: 2 }} onClick={handleClose}>
          <img
            src={back_logo}
            alt="Back Logo"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          />
        </Button>
        <EventFormContainer>
          <Label htmlFor="eventName">공연명</Label>
          <TextDisplay
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </EventFormContainer>

        <EventFormContainer>
          <Label htmlFor="eventDate">공연 날짜</Label>
          <TextDisplayFit
            type="date"
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
          />
          <TextStyle> ~ </TextStyle>
          <TextDisplayFit
            type="date"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
          />
          <LabelMiddle htmlFor="eventTime">공연 시간</LabelMiddle>
          <TextDisplayFit
            type="text"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
          />
          <TextStyle>분</TextStyle>
          <LabelMiddle htmlFor="eventPlace">공연 장소</LabelMiddle>
          <TextDisplay
            type="text"
            value={eventPlace}
            onChange={(e) => setEventPlace(e.target.value)}
          />
        </EventFormContainer>

        <EventFormContainer>
          <Label htmlFor="eventPlanner">주최/기획</Label>
          <TextDisplayFit
            type="text"
            value={eventPlanner}
            onChange={(e) => setEventPlanner(e.target.value)}
          />
          <Label htmlFor="eventNumber">대표자 전화번호</Label>
          <TextDisplayFit
            type="text"
            value={eventNumber}
            onChange={(e) => setEventNumber(e.target.value)}
          />
          <Label htmlFor="eventAge">관람등급</Label>
          <TextDisplayFit
            type="text"
            value={eventAge}
            onChange={(e) => setEventAge(e.target.value)}
          />
        </EventFormContainer>

        <EventFormExplain>
          <LabelFit htmlFor="eventExplain">공연내용 요약</LabelFit>
          <TextDisplayExplain
            value={eventExplain}
            onChange={(e) => setEventExplain(e.target.value)}
            maxLength={500}
          />
        </EventFormExplain>

        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={handleSubmit} sx={{ mr: 1 }}>
            저장
          </Button>
          <Button variant="outlined" onClick={handleClose}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SellRequestWrite;
