import renderer from "react-test-renderer";
import EndRetroView from "./end-view";

describe("Test end retro view", () => {
  it("should render", () => {
    const component = renderer.create(<EndRetroView />);
    expect(component).toBeDefined();
  });
});
