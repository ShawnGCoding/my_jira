import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useState, useEffect } from "react";
import qs from "qs";
import { cleanObject, useDebounce, useMount } from "screens/utils";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListenScreen = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  // name:项目名 personId:负责人id
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedValue = useDebounce(param, 2000);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedValue))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debouncedValue]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });
  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
