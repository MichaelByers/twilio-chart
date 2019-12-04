import React from "react";
import {
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  Legend,
  YAxis,
  ResponsiveContainer,
  Surface,
  Symbols
} from "recharts";
import _ from "lodash";
 
class SampleChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: [],
      chartColors: {
        others: "#40ee86",
        phone: "#67d6c0",
        chat: "#127197",
        email: "#e96d8d"
      },
      chartData: [
        {
          hour: 0,
          others: 0,
          phone: 0,
          chat: 0,
          email: 0
        },
        {
          hour: 6,
          others: 4,
          phone: 0,
          chat: 0,
          email: 10
        },
        {
          hour: 7,
          others: 8,
          phone: 0,
          chat: 4,
          email: 20
        },
        {
          hour: 8,
          others: 10,
          phone: 4,
          chat: 10,
          email: 20
        },
        {
          hour: 9,
          others: 10,
          phone: 20,
          chat: 10,
          email: 10
        },
        {
          hour: 10,
          others: 5,
          phone: 30,
          chat: 10,
          email: 5
        },
        {
          hour: 11,
          others: 15,
          phone: 15,
          chat: 15,
          email: 10
        },
        {
          hour: 12,
          others: 15,
          phone: 15,
          chat: 20,
          email: 5
        },
        {
          hour: 13,
          others: 10,
          phone: 5,
          chat: 20,
          email: 8
        },
        {
          hour: 14,
          others: 5,
          phone: 12,
          chat: 16,
          email: 20
        },
        {
          hour: 15,
          others: 2,
          phone: 15,
          chat: 15,
          email: 20
        },
        {
          hour: 16,
          others: 5,
          phone: 5,
          chat: 11,
          email: 18
        },
        {
          hour: 17,
          others: 3,
          phone: 5,
          chat: 12,
          email: 20
        },
        {
          hour: 18,
          others: 4,
          phone: 5,
          chat: 15,
          email: 13
        },
        {
          hour: 19,
          others: 2,
          phone: 2,
          chat: 10,
          email: 9
        },
        {
          hour: 20,
          others: 2,
          phone: 2,
          chat: 5,
          email: 10
        },
        {
          hour: 21,
          others: 1,
          phone: 0,
          chat: 0,
          email: 5
        },
        {
          hour: 22,
          others: 0,
          phone: 0,
          chat: 0,
          email: 0
        },
        {
          hour: 23,
          others: 0,
          phone: 0,
          chat: 0,
          email: 0
        }
      ]
    };
  }

  handleClick = dataKey => {
    if (_.includes(this.state.disabled, dataKey)) {
      this.setState({
        disabled: this.state.disabled.filter(obj => obj !== dataKey)
      });
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) });
    }
  };

  renderCusomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend">
        {payload.map(entry => {
          const { dataKey, color } = entry;
          const active = _.includes(this.state.disabled, dataKey);
          const style = {
            marginRight: 10,
            color: active ? "#AAA" : "#000"
          };

          return (
            <span
              className="legend-item"
              onClick={() => this.handleClick(dataKey)}
              style={style}
            >
              <Surface width={10} height={10} viewBox="0 0 10 10">
                <Symbols cx={5} cy={5} type="circle" size={50} fill={color} />
                {active && (
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={25}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{dataKey}</span>
            </span>
          );
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <ResponsiveContainer height={300}>
          <BarChart layout="vertical" data={this.state.chartData} label="Utilization">
            {_.toPairs(this.state.chartColors)
              .filter(pair => !_.includes(this.state.disabled, pair[0]))
              .map(pair => (
                <Bar
                  stackId="a"
                  key={pair[0]}
                  dataKey={pair[0]}
                  fill={pair[1]}
                />
              ))}
            <YAxis
              label={{ value: 'Time of Day', angle: -90, position: 'insideLeft' }}
              domain={[0, 23]}
              dataKey="hour"
              interval="preserveStartEnd"
              padding={{ top: 20, bottom: 20 }}
              tickCount={10}
            />
            <XAxis 
              label={{ value: 'Avg Minutes', position: 'bottom' }}
              type="number" />
            <Legend
              verticalAlign="bottom"
              height={36}
              align="left"
              payload={_.toPairs(this.state.chartColors).map(pair => ({
                dataKey: pair[0],
                color: pair[1]
              }))}
              content={this.renderCusomizedLegend}
            />
            <Tooltip label="Avg Utilization"/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default SampleChart;
