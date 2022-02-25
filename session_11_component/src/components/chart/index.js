import "./index.css";

const getPercent = (value, maxValue) => {
    if (maxValue === 0){
        return 0
    }
    return (value / maxValue * 100)
}

const Chart = (props) => {
  const dataPoint = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];
  let maxValue = 0;

  props.data.forEach((item) => {
    //   console.log(item)
      const month = item.date.getMonth(); // Jan -> 0, Dec -> 11
      dataPoint[month].value += item.amount
      if(dataPoint[month].value > maxValue){
          maxValue = dataPoint[month].value
      }
  }, []);

  return (
    <div className="chart">
      {dataPoint.map((point) => {
        return <div key={point.label} className="chart-bar">
            <div className="chart-bar__inner">
                <div style={{height: getPercent(point.value, maxValue) + '%'}} className="chart-bar__fill"></div>
            </div>
            <div className="chart-bar__label">{point.label}</div>
        </div>;
      })}
    </div>
  );
};

export default Chart;
