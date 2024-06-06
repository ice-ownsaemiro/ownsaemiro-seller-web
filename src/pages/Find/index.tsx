import FindPW from "../../components/Find";
import * as Styled from "./style";
import MiddleRectangle from "../../components/Common/Rectangle/Middle";
import LargeRectangle from "../../components/Common/Rectangle/Large";

export default function FindPage() {
  return (
    <Styled.Container>
      <Styled.Input>
        <FindPW />
        <MiddleRectangle />
        <LargeRectangle />
      </Styled.Input>
    </Styled.Container>
  );
}
