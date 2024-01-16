import CustomMap from "./Leaflet";

const WidgetAdvantgrid = ({ NandinaAdvantGrid }) => {
  const foundObject = NandinaAdvantGrid;
  /* const [obj, setObj] = useState(
    foundObject?.allData?.find((item) => item.id.id === NandinaAbeeway.id)
  ); */

  const lastLatAndLong = []

  const ver = () => {
    console.log(NandinaAdvantGrid.unArrageData.LrrLAT[0].value);
    console.log(NandinaAdvantGrid.unArrageData.LrrLON[0].value);
  };
  return (
    <div>
      <button onClick={() => ver()}>VER</button>

      <h1>WidgetAdvantgrid</h1>
       <CustomMap param1={NandinaAdvantGrid.unArrageData.LrrLAT[0].value} param2={NandinaAdvantGrid.unArrageData.LrrLON[0].value}/> 
    </div>
  );
};

export default WidgetAdvantgrid;
