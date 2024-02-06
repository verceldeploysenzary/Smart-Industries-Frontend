import Widget1 from "./widget1/Sensative-01C769";
import AbeewayWidget from "./widget2/AbeewayWidget";
import PresenceWidget from "./widget3/PresenceWidget";

const Component = () => {
  return (
    <div className="text-black flex flex-col">
      <div className="text-black flex flex-row justify-around">
        <PresenceWidget />
        <Widget1 />
      </div>
      <AbeewayWidget />
    </div>
  );
};

export default Component;
