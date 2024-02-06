import Widget1 from "./widget1/Sensative-01C769";
import AbeewayWidget from "./widget2/AbeewayWidget";
import PresenceWidget from "./widget3/PresenceWidget";
import WidgetAdvantgrid from "./widget4/widget4";

const Component = () => {
  return (
    <div className="text-black flex flex-col">
      <div className="text-black flex flex-row justify-around">
        <PresenceWidget />
        <Widget1 />
      </div>
      <WidgetAdvantgrid />
      <AbeewayWidget />
    </div>
  );
};

export default Component;
