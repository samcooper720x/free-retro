import React from "react";
import renderer from "react-test-renderer";
import Card from "./card";

describe("Test card component", () => {
  test("Card should render", () => {
    const component = renderer.create(
      <Card
        text="some text"
        onCloseClicked={() => {}}
        onTextChange={() => {}}></Card>
    );
    expect(component).toBeDefined();
  });
});