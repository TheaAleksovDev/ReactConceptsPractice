import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo
} from "react";
import "./work-buddies.css";
import classNames from "classnames";
import { Buddy } from "./BuddyInterface";
import { BuddiesContext } from "../BuddiesContext";

const WorkBuddies = () => {
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [myBuddy, setMyBuddy] = useState<Buddy>();
  const [isBuddyChosen, setIsBuddyChosen] = useState<boolean>(false);
  //useRef
  const nameRef = useRef<HTMLInputElement>(null);

  //useContext
  const { contextData, setData } = useContext(BuddiesContext);

  

  //useCallback because of an expensive function
  const fetchBuddies = useCallback(async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const data = await response.json();

      const randomIndexes = [];
      for (let i = 0; i < 9; i++) {
        randomIndexes.push(Math.floor(Math.random() * 100));
      }

      const todaysBuddies: Buddy[] = randomIndexes.map((index: number) => {
        let urlSplitted = data.results[index].url.split("/");
        let newUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          urlSplitted[urlSplitted.length - 2]
        }.png`;

        return { name: data.results[index].name, url: newUrl };
      });

      setBuddies(todaysBuddies);
    } catch (error) {
      console.log(error);
    }
  }, [setBuddies]);

  useEffect(() => {
    console.log(buddies);
  }, [buddies]);

  //useMemo
  const displayBuddies = useMemo(()=>{
    return buddies.map((buddy: Buddy, index) => {
        return (
          <div
            className={classNames("buddy-small", { selected: myBuddy === buddy })}
            key={index}
            onClick={() => {
              setMyBuddy(buddy);
            }}
          >
            <img src={buddy.url} alt="buddy-image" />
          </div>
        );
      });
  },[buddies,myBuddy])

  const onChooseOne = () => {
    if (nameRef.current && nameRef.current.value) {
      setMyBuddy((prev) => ({
        ...(prev as Buddy),
        name: nameRef.current!.value,
      }));
    }

    if (myBuddy === undefined) {
      return;
    }

    const updatedBuddies = buddies;
    updatedBuddies.forEach((buddy) => {
      if (buddy.url === myBuddy.url) {
        buddy.name = nameRef.current!.value;
      }
    });
    setBuddies(updatedBuddies);

    setIsBuddyChosen(true);
  };

  useEffect(() => {
    if (isBuddyChosen) {
      setData(buddies);
    }
  }, [isBuddyChosen]);

  useEffect(() => {
    console.log(myBuddy);
  }, [myBuddy]);

  return (
    <div className="work-buddies">
      {!buddies.length && !isBuddyChosen && (
        <Fragment>
          <h3>Let's get you a work buddy for this session!</h3>
          <button className="get-options green" onClick={fetchBuddies}>
            get options
          </button>
        </Fragment>
      )}
      {buddies && !isBuddyChosen && (
        <div className="buddies-container">{displayBuddies}</div>
      )}
      {buddies.length > 1 && !isBuddyChosen && (
        <Fragment>
          <input
            type="text"
            placeholder="give him a name or we'll keep his default one"
            ref={nameRef}
          />
          <button className="green" onClick={onChooseOne}>
            choose one!
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default WorkBuddies;
