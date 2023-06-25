export function Step({ phase }: { phase: number }) {
  return (
    <div className="w-full flex justify-center mx-auto mb-10 text-text">
      <ul className="steps">
        <li data-content={`${phase >= 1 ? "1" : ""}`} className="step">
          加油
        </li>
        <li data-content={`${phase >= 2 ? "2" : ""}`} className="step">
          努力
        </li>
        <li data-content={`${phase >= 3 ? "3" : ""}`} className="step">
          還行
        </li>
        <li data-content={`${phase >= 4 ? "4" : ""}`} className="step">
          不錯
        </li>
        <li data-content={`${phase >= 5 ? "5" : ""}`} className="step">
          超好
        </li>
      </ul>
    </div>
  );
}
