import React, { useState } from "react"
import styled from "styled-components"
import { Picker, List, WhiteSpace } from "antd-mobile"
import arrayTreeFilter from "array-tree-filter"

const Wrapper = styled.div`
  text-align: center;
  .am-list-item .am-list-line {
    justify-content:center;
    .am-list-content {
      flex:0;
      min-width: 2em;
      text-align: center;
    }
    .am-list-extra {
      flex-basis:10px;
    }
  }
`
const colorStyle = {
  display: "inline-block",
  verticalAlign: "middle",
  width: "16px",
  height: "16px",
  marginRight: "10px",
}
const texts = [
  {
    label: "收入",
    value: "收入",
  },
  {
    label: "支出",
    value: "支出",
  },
]
interface Props {}
const Pick = (props: Props) => {
  const [value, setValue] = useState("收入")
  return (
    <Wrapper className="wrapper">
      <Picker cols={1} data={texts} title="选择图表种类" cascade={true} extra=" " value={["111"]} onChange={(v: any) => setValue(v)}>
        <List.Item align="middle" arrow="down">
          {value}
        </List.Item>
      </Picker>
    </Wrapper>
  )
}

export default Pick

// 如果不是使用 List.Item 作为 children
// const CustomChildren = props => (
//   <div
//     onClick={props.onClick}
//     style={{ backgroundColor: '#fff', paddingLeft: 15 }}
//   >
//     <div className="test" style={{ display: 'flex', height: '45px', lineHeight: '45px' }}>
//       <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
//       <div style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>{props.extra}</div>
//     </div>
//   </div>
// );

// class Test extends React.Component {
//   state = {
//     data: [],
//     cols: 1,
//     pickerValue: [],
//     asyncValue: [],
//     sValue: ['2013', '春'],
//     visible: false,
//     colorValue: ['#00FF00'],
//   };
//   onClick = () => {
//     setTimeout(() => {
//       this.setState({
//         data: provinceLite,
//       });
//     }, 120);
//   };
//   onPickerChange = (val) => {
//     console.log(val);
//     let colNum = 1;
//     const d = [...this.state.data];
//     const asyncValue = [...val];
//     if (val[0] === 'zj') {
//       d.forEach((i) => {
//         if (i.value === 'zj') {
//           colNum = 2;
//           if (!i.children) {
//             i.children = [{
//               value: 'zj-nb',
//               label: '宁波',
//             }, {
//               value: 'zj-hz',
//               label: '杭州',
//             }];
//             asyncValue.push('zj-nb');
//           } else if (val[1] === 'zj-hz') {
//             i.children.forEach((j) => {
//               if (j.value === 'zj-hz') {
//                 j.children = [{
//                   value: 'zj-hz-xh',
//                   label: '西湖区',
//                 }];
//                 asyncValue.push('zj-hz-xh');
//               }
//             });
//             colNum = 3;
//           }
//         }
//       });
//     } else {
//       colNum = 1;
//     }
//     this.setState({
//       data: d,
//       cols: colNum,
//       asyncValue,
//     });
//   };
//   getSel() {
//     const value = this.state.pickerValue;
//     if (!value) {
//       return '';
//     }
//     const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
//     return treeChildren.map(v => v.label).join(',');
//   }
//   // setVal() {
//   //   this.props.form.setFieldsValue({
//   //     district: ['340000', '340800', '340822'],
//   //   });
//   // },

//   onChangeColor = (color) => {
//     this.setState({
//       colorValue: color,
//     });
//   };

//   render() {
//     const { getFieldProps } = this.props.form;
//     return (<div>
//       <WhiteSpace size="lg" />
//       <List style={{ backgroundColor: 'white' }} className="picker-list">
//         <Picker extra="请选择(可选)"
//           data={district}
//           title="Areas"
//           {...getFieldProps('district', {
//             initialValue: ['340000', '341500', '341502'],
//           })}
//           onOk={e => console.log('ok', e)}
//           onDismiss={e => console.log('dismiss', e)}
//         >
//           <List.Item arrow="horizontal">Multiple & cascader</List.Item>
//         </Picker>
//         <Picker
//           data={seasons}
//           title="选择季节"
//           cascade={false}
//           extra="请选择(可选)"
//           value={this.state.sValue}
//           onChange={v => this.setState({ sValue: v })}
//           onOk={v => this.setState({ sValue: v })}
//         >
//           <List.Item arrow="horizontal">Multiple</List.Item>
//         </Picker>
//         <Picker data={district} cols={1} {...getFieldProps('district3')} className="forss">
//           <List.Item arrow="horizontal">Single</List.Item>
//         </Picker>
//         <Picker
//           data={this.state.data}
//           cols={this.state.cols}
//           value={this.state.asyncValue}
//           onPickerChange={this.onPickerChange}
//           onOk={v => console.log(v)}
//         >
//           <List.Item arrow="horizontal" onClick={this.onClick}>Multiple & async</List.Item>
//         </Picker>
//         <Picker
//           title="选择地区"
//           extra="请选择(可选)"
//           data={district}
//           value={this.state.pickerValue}
//           onChange={v => this.setState({ pickerValue: v })}
//           onOk={v => this.setState({ pickerValue: v })}
//         >
//           <CustomChildren>Customized children</CustomChildren>
//         </Picker>
//         <Picker
//           visible={this.state.visible}
//           data={district}
//           value={this.state.pickerValue}
//           onChange={v => this.setState({ pickerValue: v })}
//           onOk={() => this.setState({ visible: false })}
//           onDismiss={() => this.setState({ visible: false })}
//         >
//           <List.Item extra={this.getSel()} onClick={() => this.setState({ visible: true })}>
//             Visible state
//           </List.Item>
//         </Picker>
//         <Picker
//           data={colors}
//           value={this.state.colorValue}
//           cols={1}
//           onChange={this.onChangeColor}
//         >
//           <List.Item arrow="horizontal">Complex Labels</List.Item>
//         </Picker>
//       </List>
//     </div>);
//   }
// }

// const TestWrapper = createForm()(Test);
