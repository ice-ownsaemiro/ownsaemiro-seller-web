// src/components/seller/EventFormStyle.ts
import styled from "styled-components";

export const EventFormContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const EventFormExplain = styled.div`
  display: flex;
  align-items: top;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const Label = styled.label`
  margin-right: 20px;
  margin-left: 80px;
`;

export const LabelFit = styled(Label)`
  white-space: nowrap;
`;

export const LabelMiddle = styled(Label)`
  margin-left: 50px;
`;

export const TextDisplay = styled.input`
  flex: 2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
`;

export const TextDisplayFit = styled(TextDisplay)`
  display: inline-block;
  padding: 8px 20px;
  white-space: nowrap;
`;

export const TextDisplayExplain = styled.textarea`
  flex: 2;
  padding: 16px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
  white-space: pre-line;
  height: 480px;
  max-height: 480px;
  resize: none;
`;

export const TextStyle = styled.span`
  margin-left: 10px;
  margin-right: 10px;
`;
