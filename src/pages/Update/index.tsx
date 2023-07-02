import updateLogArray from "../../updateLog";

function Update() {
  return (
    <div className="h-screen w-screen text-text p-20 flex items-center flex-col">
      <h1 className="font-bold text-xl mb-5">網站更新紀錄</h1>
      <ul className="list-disc pl-5">
        {updateLogArray.map((item) => (
          <li key={item.date}>
            {item.date}：{item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Update;
