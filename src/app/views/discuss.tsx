import React from "react";
import styled from "styled-components";
import {
  CloseButton,
  LeftArrowButton,
  RightArrowButton,
} from "../components/buttons";
import { CardGroup } from "../components/card";
import { VotesLine } from "../components/vote-line";
import { CardGroupState, CardState } from "../state";
import * as State from "../state";

const CloseRetro = styled(CloseButton)`
  position: fixed;
  right: 1em;
  top: 1em;
  height: 5em;
  width: 5em;
`;

const ButtonsContainer = styled.div`
  position: absolute;
  width: 20rem;
  left: 50%;
  top: 15%;
  transform: translateX(-50%);
`;

const Prev = styled(LeftArrowButton)`
  margin-bottom: 2em;
  height: 3em;
  width: 3em;
`;

const Next = styled(RightArrowButton)`
  position: absolute;
  right: 1em;
  margin-bottom: 2em;
  height: 3em;
  width: 3em;
`;

export const DiscussView = (props: {
  cards: (CardState | CardGroupState)[];
  index: number;
}) => {
  const { cards, index } = props;

  const closeRetro = async () => {
    const res = confirm(`This action will close the retro session.
Click ok to go ahead.`);
    if (res) {
      await State.changeStage("next");
    }
  };

  if (cards.length == 0) {
    console.log("No cards -> nothing to discuss");
    return (
      <>
        <CloseRetro onClick={async () => await closeRetro()} />
      </>
    );
  }

  const totalVotes = (c: CardState | CardGroupState) =>
    Object.values(c.votes)
      .map((v) => v.value)
      .reduce((a, b) => a + b, 0);

  const sortedCards = cards
    .map((c) => ({ votes: totalVotes(c), card: c }))
    .sort((a, b) => b.votes - a.votes);

  const { card, votes } = (
    index >= sortedCards.length
      ? sortedCards[sortedCards.length - 1]
      : sortedCards.at(index)
  )!!;

  return (
    <>
      <CloseRetro onClick={async () => await closeRetro()} />
      <ButtonsContainer>
        <Prev
          onClick={() => State.changeDiscussCard("decrement")}
          disabled={index <= 0}></Prev>
        <Next
          onClick={() => State.changeDiscussCard("increment")}
          disabled={index > sortedCards.length}></Next>
        <CardGroup
          cards={("cards" in card ? card.cards : [card]).map((c) => ({
            text: c.text,
            cardType: c.originColumn,
            color: c.color,
          }))}
          readOnly={true}>
          <VotesLine readonly={true} votes={votes}></VotesLine>
        </CardGroup>
      </ButtonsContainer>
    </>
  );
};
