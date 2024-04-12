import { useState } from "react";
import { data } from "./Data";
import "./styles.css";
const Listitem = () => {
  const [leftData, setLeftData] = useState(data);
  const [rightData, setRightData] = useState([]);
  const resetChecked = (list) => {
    return list.map((ele) => {
      return {
        ...ele,
        checked: false,
      };
    });
  };
  const checkedList = (list, id, checked) => {
    return list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          checked: !checked,
        };
      }
      return item;
    });
  };
  const handleChangevnt = (id, checked, type) => {
    if (type === "Left") {
      const copyItem = [...leftData];
      const items = checkedList(copyItem, id, checked);
      setLeftData(items);
    } else {
      const copyItem = [...rightData];
      const items = checkedList(copyItem, id, checked);
      setRightData(items);
    }
  };
  const handleTransfer = (type) => {
    if (type === "toleft") {
      const copyList = [...rightData];
      const checkedItem = copyList.filter((ele) => ele.checked === true);
      const uncheckedItem = copyList.filter((ele) => ele.checked === false);
      setLeftData(resetChecked([...leftData, ...checkedItem]));
      setRightData(uncheckedItem);
    } else {
      const copyList = [...leftData];
      const checkedItem = copyList.filter((ele) => ele.checked === true);
      const uncheckedItem = copyList.filter((ele) => ele.checked === false);
      setRightData(resetChecked([...rightData, ...checkedItem]));
      setLeftData(uncheckedItem);
    }
  };
  return (
    <div className="container">
      <div className="leftside">
        {" "}
        {leftData?.map(({ id, title, checked }) => {
          return (
            <div
              key={id}
              className={`listitem ${checked ? "slectedItem" : ""}`}
              onClick={() => handleChangevnt(id, checked, "Left")}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className="action">
        <button className="btn" onClick={() => handleTransfer("toleft")}>
          Left
        </button>{" "}
        <button className="btn" onClick={() => handleTransfer("toright")}>
          Right
        </button>
      </div>
      <div className="rightside">
        {rightData?.map(({ id, title, checked }) => {
          return (
            <div
              key={id}
              className={`listitem ${checked ? "slectedItem" : ""}`}
              onClick={() => handleChangevnt(id, checked, "right")}
            >
              {title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Listitem;
