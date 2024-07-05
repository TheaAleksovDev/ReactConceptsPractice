import {  useContext, useEffect, useState } from "react";
import { BuddiesContext } from "../BuddiesContext";
import classNames from "classnames";
import "./work-buddies.css";
import { useReducer } from "react";
import { Buddy } from "./BuddyInterface";
import { memo } from "react";

const reducer = (
  index: number,
  action: { type: string; contextData?: Buddy[]; myBuddyIndex?: number }
) => {
  switch (action.type) {
    case "next":
      if (action.contextData) {
        if (index + 1 < action.contextData.length) {
          return index + 1;
        } else {
          return 0;
        }
      } else return 0;

    case "prev":
      if (action.contextData) {
        return index - 1 > -1 ? index - 1 : action.contextData.length - 1;
      } else return 0;

    case "my-buddy":
      if (action.myBuddyIndex) {
        return action.myBuddyIndex;
      } else return 0;

    default:
      return 1;
  }
};

const MyWorkBuddy = memo(({ name }: { name: string }) => {
  const { contextData } = useContext(BuddiesContext);

  //useReducer
  const [currentBuddyIndex, dispatch] = useReducer(reducer, 0);
  const [BuddysName, setBuddysName] = useState<string>();
  const [myBuddyIndex, setMyBuddyIndex] = useState<number>();

  useEffect(() => {
    if (name) {
      setBuddysName(name);
    }
  }, [name]);

  useEffect(() => {
    if (!contextData) {
      return;
    }
    contextData.forEach((element, index) => {
      if (element.isMine) {
        setMyBuddyIndex(index);
      }
    });
  }, [contextData]);

  //would make more sense if I just used .isMine to conditionally add class to name, but BuddysName is for practice
  return (
    <>
      {contextData && (
        <div>
          <h3
            className={classNames("buddy-name", {
              "mine-name": contextData[currentBuddyIndex].name === BuddysName,
            })}
          >
            {contextData[currentBuddyIndex].name}
          </h3>
          <div
            className={classNames("buddy-big", {
              mine: contextData[currentBuddyIndex].isMine,
            })}
          >
            <img src={contextData[currentBuddyIndex].url} alt="buddy-image" />
          </div>
        </div>
      )}
      {contextData && (
        <>
          <div className="actions">
            <button
              className="green"
              onClick={() => {
                dispatch({ type: "prev", contextData });
              }}
            >
              prev
            </button>
            <button
              className="green"
              onClick={() => {
                dispatch({ type: "next", contextData });
              }}
            >
              next
            </button>
          </div>
        </>
      )}
      {myBuddyIndex !== undefined && (
        <button
          className="green actions"
          onClick={() => {
            dispatch({ type: "my-buddy", myBuddyIndex });
          }}
        >
          go to my buddy
        </button>
      )}
      <p className="grey">
        just some friends for motivation while you work on your tasks
      </p>
    </>
  );
});
export default MyWorkBuddy;
