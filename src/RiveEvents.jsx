import { useRive, EventType, RiveEventType } from "@rive-app/react-canvas";
import { useCallback, useEffect, useState, useRef } from "react";

export function RiveEvents() {
  const [showExtendedDiv, setShowExtendedDiv] = useState(true);

  const { rive, RiveComponent } = useRive({
    src: "ecrebocpr.riv",
    stateMachines: "State Machine 1",
    autoPlay: "false",
  });
  const myRef = useRef(null);
  const scrollRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView({ behavior: "smooth" });

  const backToTopScroll = () => scrollRef.current.scrollIntoView({ behavior: "smooth" });

  const handleShowDiv = () => {
    setShowExtendedDiv(false);
  };

  const handleHideDiv = () => {
    setShowExtendedDiv(true);
  };

  const onRiveEventReceived = (riveEvent) => {
    const eventData = riveEvent.data;
    const eventProperties = eventData.properties;

    if (eventData.type === RiveEventType.General) {
      console.log("Event name", eventData.name);
      if (eventData.name == "PlaySound") {
        play();
        handleShowDiv();
      } else if (eventData.name == "EndAnimation") {
        console.log("end animation");
        executeScroll();
      } else if (eventData.name == "Scroller") {
        console.log("receipt hit");
        backToTopScroll();
      }

      // Added relevant metadata from the event
      // console.log("Rating", eventProperties);
      // console.log("Message", eventProperties);
    } else if (eventData.type === RiveEventType.OpenUrl) {
      console.log("Event name", eventData.name);
      // Handle OpenUrl event manually
      if (eventData.name == "GoToAcquire") {
        window.open("/acquire", "_self");
      } else if (eventData.name == "GoToRx") {
        window.open("/rx_link", "_self");
      } else if (eventData.name == "GoToEngage") {
        window.open("/engage", "_self");
      } else if (eventData.name == "GoToConversion") {
        window.open("/digital_conversion", "_self");
      }
    }
  };

  // Wait until the rive object is instantiated before adding the Rive
  // event listener
  useEffect(() => {
    if (rive) {
      rive.on(EventType.RiveEvent, onRiveEventReceived);
    }
  }, [rive]);

  return (
    <div>
      <RiveComponent className="riveBox" onMouseEnter={() => rive && rive.play()} />
    </div>
  );
}
