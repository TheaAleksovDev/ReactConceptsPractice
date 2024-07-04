import { Fragment, useContext, useEffect, useState } from "react";
import { BuddiesContext } from "../BuddiesContext";
import classNames from "classnames";
import "./work-buddies.css";
import { useReducer } from "react";
import { Buddy } from "./BuddyInterface";
import { memo } from "react";

interface propsInterface {
  myBuddy: Buddy;
}

const reducer = (
  index: number,
  action: { type: string; contextData?: Buddy[]; myBuddyIndex?: number }
) => {
  switch (action.type) {
    case "next":
      if (action.contextData) {
        if (index + 1 < action.contextData.length) return index + 1;
        else return 0;
      } else return 0;

    case "prev":
      if (action.contextData) {
        if (index - 1 > -1) return index - 1;
        else return action.contextData.length - 1;
      } else return 0;

    case "my-buddy":
      if (action.myBuddyIndex) {
        return action.myBuddyIndex;
      } else return 0;

    default:
      return 1;
  }
};

const MyWorkBuddy = memo(({ myBuddy }: propsInterface) => {
  const { contextData } = useContext(BuddiesContext);

  //useReducer
  const [currentBuddyIndex, dispatch] = useReducer(reducer, 0);
  const [buddy, setBuddy] = useState<Buddy>();
  const [myBuddyIndex, setMyBuddyIndex] = useState<number>();

  //I am aware that I can get "buddy" from contextData and that I'm not actually using it,
  //but I included both concepts just for practice (memo and useContext)

  useEffect(() => {
    if (myBuddy) {
      setBuddy(myBuddy);
    }
  }, [myBuddy]);

  useEffect(() => {
    if (!contextData) return;
    contextData.forEach((element, index) => {
      if (element.isMine) {
        setMyBuddyIndex(index);
      }
    });
  }, [contextData]);

  return (
    <Fragment>
      {contextData && (
        <div>
          <h3 className="buddy-name">{contextData[currentBuddyIndex].name}</h3>
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
        <Fragment>
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
        </Fragment>
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
    </Fragment>
  );
});
export default MyWorkBuddy;
