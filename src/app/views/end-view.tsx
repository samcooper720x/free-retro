import styled from "styled-components";
import { ActionColumn } from "../components";
import { ButtonContainer } from "../components/buttons";
import * as State from "../state";
import { ActionState, Stage } from "../state";

const EndViewContainer = styled.div`
  position: absolute;
  width: 40%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  align-content: space-between;
  justify-content: center;
`;
const StyledP = styled.p`
  font-size: 1em;
  text-align: center;
`;

const RefreshPageButton = styled(ButtonContainer)`
  background: #d9d9d9;
  max-width: 18em;
  width: 100%;
  height: 1.8em;
  font-size: 1.2em;
  font-weight: bold;
  margin: auto;
  margin-top: 0.5em;
  margin-bottom: 2em;
`;

const EndRetroView = (props: {
  sessionId: string;
  actions?: ActionState[];
}) => {
  const { sessionId, actions } = props;
  return (
    <EndViewContainer>
      <StyledP>
        This retro is now concluded. 🎉
        <br />
        Review the actions or start a new one. ✅ <br />
        <br />
        <strong>Note:</strong>these actions will be still available in the new
        retro
        <br />
        as long as the same retro id is used ({sessionId}) 💾
      </StyledP>
      <RefreshPageButton
        onClick={() => {
          State.initAppState(sessionId, Stage.Create, actions);
        }}>
        🚀 Start a new retro
      </RefreshPageButton>
      <ActionColumn
        style={{ width: "40em", marginBottom: "2em" }}
        actions={actions ?? []}
      />
    </EndViewContainer>
  );
};

export default EndRetroView;
