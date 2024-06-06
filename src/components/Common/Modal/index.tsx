import React, { useState } from "react";
import back_logo from "../../../assets/logo_back.svg";
import * as Styled from "./style";

interface SellRequestWriteProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (newItem: any) => void;
}

export const SellRequestWrite: React.FC<SellRequestWriteProps> = ({
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

  if (!open) return null;

  return (
    <Styled.ModalOverlay>
      <Styled.ModalContent>
        <Styled.CloseButton onClick={handleClose}>
          <img src={back_logo} alt="Back Logo" />
        </Styled.CloseButton>
        <Styled.FormContainer>
          <Styled.Label htmlFor="eventName">공연명</Styled.Label>
          <Styled.Input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />

          <Styled.DateTimeContainer>
            <Styled.Label htmlFor="eventDate">공연 날짜</Styled.Label>
            <Styled.Input
              type="date"
              value={eventStartDate}
              onChange={(e) => setEventStartDate(e.target.value)}
            />
            <span> ~ </span>
            <Styled.Input
              type="date"
              value={eventEndDate}
              onChange={(e) => setEventEndDate(e.target.value)}
            />
            <Styled.Label htmlFor="eventTime">공연 시간</Styled.Label>
            <Styled.Input
              type="text"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
            <span>분</span>
            <Styled.Label htmlFor="eventPlace">공연 장소</Styled.Label>
            <Styled.Input
              type="text"
              value={eventPlace}
              onChange={(e) => setEventPlace(e.target.value)}
            />
          </Styled.DateTimeContainer>

          <Styled.AdditionalInfoContainer>
            <Styled.Label htmlFor="eventPlanner">주최/기획</Styled.Label>
            <Styled.Input
              type="text"
              value={eventPlanner}
              onChange={(e) => setEventPlanner(e.target.value)}
            />
            <Styled.Label htmlFor="eventNumber">대표자 전화번호</Styled.Label>
            <Styled.Input
              type="text"
              value={eventNumber}
              onChange={(e) => setEventNumber(e.target.value)}
            />
            <Styled.Label htmlFor="eventAge">관람등급</Styled.Label>
            <Styled.Input
              type="text"
              value={eventAge}
              onChange={(e) => setEventAge(e.target.value)}
            />
          </Styled.AdditionalInfoContainer>

          <Styled.ExplainContainer>
            <Styled.Label htmlFor="eventExplain">공연내용 요약</Styled.Label>
            <Styled.Textarea
              value={eventExplain}
              onChange={(e) => setEventExplain(e.target.value)}
              maxLength={500}
            />
          </Styled.ExplainContainer>

          <Styled.ButtonContainer>
            <Styled.Button onClick={handleSubmit}>저장</Styled.Button>
            <Styled.Button onClick={handleClose}>취소</Styled.Button>
          </Styled.ButtonContainer>
        </Styled.FormContainer>
      </Styled.ModalContent>
    </Styled.ModalOverlay>
  );
};
