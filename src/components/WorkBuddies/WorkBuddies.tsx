import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  ChangeEvent,
} from "react";
import "./work-buddies.css";
import classNames from "classnames";
import { Buddy } from "./BuddyInterface";
import { BuddiesContext } from "../BuddiesContext";
import MyWorkBuddy from "./MyWorkBuddy";

const WorkBuddies = () => {
  const [buddies, setBuddies] = useState<Buddy[]>([]);
  const [myBuddy, setMyBuddy] = useState<Buddy>();
  const [isBuddyChosen, setIsBuddyChosen] = useState<boolean>(false);
  //useRef
  const [name, setName] = useState<string>("");
  const nameRef = useRef<HTMLInputElement>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //useContext
  const { setData } = useContext(BuddiesContext);

  //useCallback
  const fetchBuddies = useCallback(async () => {
    try {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const data = await response.json();

      const randomIndexes: number[] = [];

      while (randomIndexes.length < 9) {
        const randomNumber = Math.floor(Math.random() * 100);
        if (!randomIndexes.includes(randomNumber)) {
          randomIndexes.push(randomNumber);
        }
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

  //useMemo
  const buddiesToDisplayed = useMemo(() => {
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
  }, [buddies, myBuddy]);

  const onChooseOne = () => {
    if (name) {
      setMyBuddy((prev) => ({
        ...(prev as Buddy),
        name: name,
        isMine: true,
      }));
    }

    if (myBuddy === undefined) {
      return;
    }

    const updatedBuddies = buddies.map((buddy) => {
      if (buddy.url === myBuddy.url) {
        return {
          ...buddy,
          name: name ? name : buddy.name,
          isMine: true,
        };
      } else {
        return { ...buddy };
      }
    });
    setBuddies(updatedBuddies);

    setIsBuddyChosen(true);
  };

  useEffect(() => {
    if (isBuddyChosen) {
      setData(buddies);
    }

    if (buddies && !isBuddyChosen) {
      nameRef.current?.focus();
    }
  }, [isBuddyChosen, setData, buddies]);

  return (
    <div className="work-buddies">
      {!buddies.length && !isBuddyChosen && (
        <>
          <h3 className="info">Let's get you a work buddy for this session!</h3>
          <button className="get-options green" onClick={fetchBuddies}>
            get options
          </button>
        </>
      )}
      {buddies && !isBuddyChosen && (
        <div className="buddies-container">{buddiesToDisplayed}</div>
      )}
      {buddies.length > 1 && !isBuddyChosen && (
        <>
          <input
            type="text"
            placeholder="give him a name or we'll keep his default one"
            ref={nameRef}
            onChange={handleNameChange}
          />
          <button className="green" onClick={onChooseOne}>
            choose one!
          </button>
        </>
      )}
      {isBuddyChosen && myBuddy && <MyWorkBuddy name={myBuddy.name} />}
    </div>
  );
};

export default WorkBuddies;
