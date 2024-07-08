import { supabase } from "@/utils/supabase/supabase";
import Task from "./task";
import { Dispatch, SetStateAction, ReactElement } from "react";

// Supabaseからデータ取得する
export default async function getData(
  // setTaskList
  taskList: Dispatch<SetStateAction<Array<ReactElement>>>
) {
  const tmpTaskList = [];
  try {
    // taskテーブルを全取得
    // dataをtasks or errorに割り振ってる
    let { data: tasks, error } = await supabase
      // テーブル名
      .from("tasks")
      // 列
      .select("*");
    console.log(tasks);
    if (error) {
      console.log(error);
    }

    // これまで作った要素が消えてない（消えてない要素のidにlengthを足してるからid値が上がってく）
    if (tasks != null) {
      for (let index = 0; index < tasks.length; index++) {
        // 配列の後ろに追加してる
        tmpTaskList.push(
          <li
            className="flex items-center justify-between py-2"
            key={tasks[index]["id"]}
          >
            <Task
              taskList={taskList}
              id={tasks[index]["id"]}
              text={tasks[index]["text"] ?? ""}
              updated_at={tasks[index]["updated_at"] ?? ""}
            ></Task>
          </li>
        );
      }
      taskList(tmpTaskList);
    }
  } catch (error) {
    console.log(error);
  }
}
