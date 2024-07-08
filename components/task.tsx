"use client"
import { useState, Dispatch, SetStateAction, ReactElement } from 'react';
import EditDialog from './editDialog';
import RemoveDialog from './removeDialog';


export default function Task(props: { id: number, text: string, updated_at: string, taskList: Dispatch<SetStateAction<Array<ReactElement>>> }) {
  // NOTE: 編集ボタン
  const [showEditModal, setShowEditModal] = useState(false);
  // NOTE: 削除ボタン
  const [showRemoveModal, setShowRemoveModal] = useState(false);

//  NOTE: propsで渡ってきたid等を理解しやすい変数名に入れ直す
  const id = props.id
  const text = props.text
  const updated_at = props.updated_at
  let last_update = new Date(updated_at)

  return (
    <>
      <div>
        <p className="text-gray-600 break-all">
          {text}
        </p>
        <p className="text-xs text-gray-400">最終更新日時：{last_update.toLocaleString("ja-JP")}</p>
      </div>

      <div className="flex">
        <button type="button" className="w-9 text-blue-500 hover:text-blue-600" onClick={() => setShowEditModal(true)}>編集</button>
        <button type="button" className="ml-2 w-9 text-red-500 hover:text-red-600" onClick={() => setShowRemoveModal(true)}>削除</button>
      </div>
      {showEditModal ? (
        <EditDialog id={id} taskList={props.taskList} showModal={setShowEditModal}></EditDialog>
      ) : null}
      {showRemoveModal ? (
        <RemoveDialog id={id} taskList={props.taskList} showModal={setShowRemoveModal}></RemoveDialog>
      ) : null}
    </>
  )
}
