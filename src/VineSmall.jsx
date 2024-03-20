import { useRive, useStateMachineInput, onLoad, Fit, Layout as RiveLayout, Alignment } from "@rive-app/react-canvas";
import { useCallback, useEffect, useState, useRef } from "react";
import "./CSS/rive.css";

export function VineSmall() {
  const { rive, RiveComponent } = useRive({
    src: "vineblue.riv",
    stateMachines: "ScrollingBehavior",
    autoplay: true,
    // layout: new RiveLayout({
    //   fit: Fit.FitHeight,
    //   alignment: Alignment.CenterRight,
    // }),
  });
  const scrollPos = useStateMachineInput(rive, "ScrollingBehavior", "scrollPos", 0);

  useEffect(() => {
    let scrollListener;
    if (scrollPos) {
      const body = document.querySelector("body");
      const bodyParent = body.parentNode;
      const pageLength = bodyParent.scrollHeight;

      const scrollCallback = () => {
        const scrollOffset = bodyParent.scrollTop;
        const scrollPosValue = (130 * scrollOffset) / (pageLength - bodyParent.clientHeight);
        scrollPos.value = scrollPosValue;
      };
      scrollListener = document.addEventListener("scroll", scrollCallback);
    }

    return () => {
      if (scrollListener) {
        document.removeEventListener("scroll", scrollListener);
      }
    };
  });

  return (
    <div>
      <div className="rivecontainer">
        <div>
          <RiveComponent className="riveBoxSmall fixed-bottom" />
        </div>
      </div>
    </div>
  );
}
